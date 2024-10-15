import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
