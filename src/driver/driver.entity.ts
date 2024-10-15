import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../order/order.entity'; // Adjust path if necessary

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  driverId: number;

  @Column()
  name: string;

  @Column('decimal', { default: 0 })
  totalOrders: number;

  @Column('decimal', { default: 0 })
  totalDistance: number;

  @OneToMany(() => Order, (order) => order.driver)
  orders: Order[];
}
