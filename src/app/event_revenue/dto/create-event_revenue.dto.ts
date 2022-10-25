import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateEventRevenueDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  value_unit: number;
  
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  quantity: number;
}