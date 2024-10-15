import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Driver } from '../driver/driver.entity'; // Import the Driver entity

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column()
  priority: number;

  @Column()
  deliveryTime: Date;

  @Column()
  location: string;

  @Column()
  weight: number;

  @Column('decimal')
  cost: number;

  @ManyToOne(() => Driver, (driver) => driver.orders, { nullable: true })
  driver: Driver; // Add the relationship to Driver (nullable if the driver is assigned later)
}
