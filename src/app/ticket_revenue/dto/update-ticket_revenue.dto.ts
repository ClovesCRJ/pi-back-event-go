import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateTicketRevenueDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  value_unit: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  taxes: number;
}