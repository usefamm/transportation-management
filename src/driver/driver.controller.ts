import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  // Assign a driver to an order
  @Post('assign/:orderId')
  assignDriver(@Param('orderId') orderId: number) {
    return this.driverService.assignDriver(orderId);
  }

  @Post()
  async create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.createDriver(createDriverDto);
  }

  // Generate driver performance report
  @Get('report')
  async generateReport() {
    return this.driverService.generateReport();
  }
}
