import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateEventRevenueDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  value_unit: number;
  
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}