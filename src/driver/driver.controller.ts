import { Controller, Get, Post, Param } from '@nestjs/common';
import { DriverService } from './driver.service';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  // Assign a driver to an order
  @Post('assign/:orderId')
  assignDriver(@Param('orderId') orderId: number) {
    return this.driverService.assignDriver(orderId);
  }

  // Generate driver performance report
  @Get('report')
  async generateReport() {
    return this.driverService.generateReport();
  }
}
