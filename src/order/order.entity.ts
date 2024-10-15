import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Driver } from '../driver/driver.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column()
  priority: number; // Ensure this is defined correctly

  @Column()
  deliveryTime: Date;

  @Column('json') // Store location as latitude and longitude
  location: { lat: number; lng: number };

  @Column()
  weight: number;

  @Column('decimal')
  cost: number;

  @ManyToOne(() => Driver, (driver) => driver.orders, { nullable: true })
  driver: Driver; // Relation to Driver
}
