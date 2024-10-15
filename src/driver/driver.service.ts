import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
import { Order } from '../order/order.entity';
import { OrderService } from '../order/order.service';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>, // Correctly inject DriverRepository
    @InjectRepository(Order)
    private orderRepository: Repository<Order>, // Correctly inject OrderRepository
    private readonly orderService: OrderService,
  ) {}

  // Assign a driver to an order based on sorted orders
  async assignDriver(orderId: number): Promise<Order> {
    const sortedOrders = await this.orderService.findAndSortOrders();

    const order = sortedOrders.find((o) => o.orderId === orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    const drivers = await this.driverRepository.find();
    if (!drivers.length) {
      throw new Error('No drivers available');
    }

    const assignedDriver = drivers[0]; // Replace with actual driver assignment logic

    order.driver = assignedDriver; // Assign driver to the order
    return this.orderRepository.save(order);
  }

  // Generate a report on driver performance
  async generateReport() {
    const drivers = await this.driverRepository.find();

    const reports = await Promise.all(
      drivers.map(async (driver) => {
        // Fetch all orders assigned to this driver
        const orders = await this.orderRepository.find({
          where: { driver: driver }, // Filter orders by driver
        });

        const totalOrders = orders.length;
        const totalDistance = orders.reduce(
          (acc, order) => acc + order.weight * 0.5,
          0,
        );

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

  // Utility function to calculate average
  private getAverage(times: number[]): number {
    const sum = times.reduce((a, b) => a + b, 0);
    return sum / times.length;
  }
}
