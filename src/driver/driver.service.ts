import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
import { Order } from '../order/order.entity';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  // Assign a driver to an order based on availability and criteria
  async assignDriver(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { orderId },
      relations: ['driver'],
    });

    if (!order) {
      throw new Error('Order not found');
    }

    const drivers = await this.driverRepository.find();
    if (!drivers.length) {
      throw new Error('No available drivers');
    }

    const isDriverAvailable = (driver: Driver): boolean => {
      return driver.totalOrders < 3;
    };

    const availableDrivers = drivers.filter(isDriverAvailable);
    if (!availableDrivers.length) {
      throw new Error('No available drivers that can take new orders');
    }

    const selectedDriver = availableDrivers.reduce((prev, curr) => {
      const prevDistance = this.calculateDistance(
        prev.location,
        order.location,
      );
      const currDistance = this.calculateDistance(
        curr.location,
        order.location,
      );
      return prevDistance < currDistance ? prev : curr;
    });

    order.driver = selectedDriver;
    selectedDriver.totalOrders += 1; // Increment the count of active orders for the driver
    await this.driverRepository.save(selectedDriver);
    return this.orderRepository.save(order);
  }

  // Method to create a new driver
  async createDriver(createDriverDto: CreateDriverDto): Promise<Driver> {
    const driver = this.driverRepository.create(createDriverDto); // Create a new driver instance
    return this.driverRepository.save(driver); // Save the driver to the database
  }

  // Method to calculate distance between two locations
  private calculateDistance(
    driverLocation: { lat: number; lng: number },
    orderLocation: { lat: number; lng: number },
  ): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.degreesToRadians(orderLocation.lat - driverLocation.lat);
    const dLon = this.degreesToRadians(orderLocation.lng - driverLocation.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(driverLocation.lat)) *
        Math.cos(this.degreesToRadians(orderLocation.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  // Helper method to convert degrees to radians
  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Generate a report of driver performance
  async generateReport(): Promise<any[]> {
    const drivers = await this.driverRepository.find();

    const reports = await Promise.all(
      drivers.map(async (driver) => {
        const orders = await this.orderRepository.find({
          where: { driver },
        });

        const totalOrders = orders.length;
        const totalDistance = orders.reduce(
          (acc, order) => acc + order.weight * 0.5,
          0,
        ); // Example distance calculation
        const deliveryTimes = orders.map((order) =>
          order.deliveryTime.getTime(),
        );
        const avgDeliveryTime = this.getAverage(deliveryTimes);
        const minDeliveryTime = Math.min(...deliveryTimes);
        const maxDeliveryTime = Math.max(...deliveryTimes);

        return {
          driverId: driver.driverId,
          totalOrders,
          totalDistance,
          avgDeliveryTime: new Date(avgDeliveryTime).toISOString(),
          minDeliveryTime: new Date(minDeliveryTime).toISOString(),
          maxDeliveryTime: new Date(maxDeliveryTime).toISOString(),
        };
      }),
    );

    return reports;
  }

  // Utility function to calculate average time
  private getAverage(times: number[]): number {
    const sum = times.reduce((a, b) => a + b, 0);
    return sum / times.length || 0; // Return 0 if no orders exist
  }
}
