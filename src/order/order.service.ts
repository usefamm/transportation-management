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

  // Create a new order
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    // Create a new Order entity instance based on the DTO
    const order = this.orderRepository.create(createOrderDto);

    // Save the new order to the database
    return this.orderRepository.save(order);
  }

  // Find all orders and sort them based on priority and delivery time
  async findAndSortOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.find();

    // Sorting by priority (high to low) and delivery time (earliest first)
    return orders.sort((a, b) => {
      if (a.priority === b.priority) {
        return a.deliveryTime.getTime() - b.deliveryTime.getTime(); // Earliest delivery time first
      }
      return b.priority - a.priority; // Higher priority first
    });
  }

  // Get all orders (for general purpose, can be used without sorting)
  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }
}
