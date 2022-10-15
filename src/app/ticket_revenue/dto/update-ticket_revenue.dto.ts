import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateTicketRevenueDto {
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