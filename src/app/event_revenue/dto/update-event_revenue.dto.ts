import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateEventRevenueDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  value_unit: number;
  
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}