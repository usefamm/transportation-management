import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { DriverModule } from './driver/driver.module'; // Ensure this is imported

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or your chosen database type
      host: 'localhost',
      port: 5432,
      username: 'yourusername',
      password: 'yourpassword',
      database: 'order_management',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Remember to set this to false in production
    }),
    OrderModule,
    DriverModule, // Ensure DriverModule is included here
  ],
})
export class AppModule {}
