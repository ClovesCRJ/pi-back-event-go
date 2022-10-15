import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTicketRevenueDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  value_unit: number;

  @IsNotEmpty()
  @IsNumber()
  taxes: number;
}