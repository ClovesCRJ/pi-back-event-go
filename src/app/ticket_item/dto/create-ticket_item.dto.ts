import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateTicketItemDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  sale_value: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsInt()
  quantity_sold: number;
}