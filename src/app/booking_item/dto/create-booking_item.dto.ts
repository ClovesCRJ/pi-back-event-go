import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateBookingItemDto {
  @IsNotEmpty()
  @ApiProperty()
  code: number;

  @IsOptional()
  @ApiPropertyOptional()
  name: string;

  @IsOptional()
  @ApiPropertyOptional()
  contact: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  value: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  payed: number;

  @IsOptional()
  @ApiPropertyOptional()
  payment_method: string;

  @IsOptional()
  @ApiPropertyOptional()
  status: string;
}