import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'yourusername',
      password: 'yourpassword',
      database: 'order_management',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // In production, it's better to handle migrations manually
    }),
    OrderModule,
    DriverModule,
  ],
})
export class AppModule {}
