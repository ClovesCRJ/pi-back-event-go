import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateBookingItemDto {
  @IsNotEmpty()
  code: number;

  @IsOptional()
  name: string;

  @IsOptional()
  contact: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsOptional()
  @IsNumber()
  payed: number;

  @IsOptional()
  payment_method: string;

  @IsOptional()
  status: string;
}