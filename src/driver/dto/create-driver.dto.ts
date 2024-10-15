import { IsNotEmpty, IsString, IsNumber, IsObject } from 'class-validator';

export class CreateDriverDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  totalOrders: number;

  @IsNotEmpty()
  @IsNumber()
  totalDistance: number;

  @IsNotEmpty()
  @IsObject()
  location: {
    lat: number; // Latitude
    lng: number; // Longitude
  };
}
