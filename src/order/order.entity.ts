import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
