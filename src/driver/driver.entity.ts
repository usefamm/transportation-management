import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../order/order.entity';

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

  @Column('json')
  location: { lat: number; lng: number }; // Latitude and Longitude

  @OneToMany(() => Order, (order) => order.driver)
  orders: Order[]; // Define a one-to-many relationship with Order
}
