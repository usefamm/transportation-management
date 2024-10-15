import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order/order.entity';
import { Driver } from './driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async assignDriver(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ orderId });

    // Fetch drivers and assign based on logic (priority + shortest delivery time)
    const drivers = await this.driverRepository.find();
    const assignedDriver = drivers[0]; // Placeholder for logic

    order['driver'] = assignedDriver;
    return this.orderRepository.save(order);
  }

  generateReport() {
    // Return a mock report for now
    return {
      totalOrders: 50,
      totalDistance: 1200,
      avgDeliveryTime: '2h 30m',
    };
  }
}
