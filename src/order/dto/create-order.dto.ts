export class CreateOrderDto {
  readonly priority: number;
  readonly deliveryTime: Date;
  readonly location: string;
  readonly weight: number;
  readonly cost: number;
}
