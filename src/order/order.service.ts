import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findAndSortOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.find();

    return orders.sort((a, b) => {
      if (a.priority === b.priority) {
        return a.deliveryTime.getTime() - b.deliveryTime.getTime();
      }
      return b.priority - a.priority;
    });
  }
}
