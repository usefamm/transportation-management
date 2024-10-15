import { IsNotEmpty, IsNumber, IsDateString, IsObject } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  priority: number;

  @IsNotEmpty()
  @IsDateString()
  deliveryTime: Date;

  @IsNotEmpty()
  @IsObject() // Ensure it's an object
  location: {
    lat: number; // Latitude
    lng: number; // Longitude
  };

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  cost: number;
}
