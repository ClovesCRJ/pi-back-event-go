import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateTicketItemDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  sale_value: number;

  @IsNotEmpty()
  @IsInt()
  quantity_sold: number;
}