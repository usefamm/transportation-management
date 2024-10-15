import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { Order } from '../order/order.entity'; // Import Order entity
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver, Order]), // Import Driver and Order repositories
    OrderModule, // Import OrderModule to make OrderService available
  ],
  providers: [DriverService],
  controllers: [DriverController],
  exports: [DriverService], // Export DriverService if needed in other modules
})
export class DriverModule {}
