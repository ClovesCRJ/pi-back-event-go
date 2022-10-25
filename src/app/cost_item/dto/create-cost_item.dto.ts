import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateCostItemDto {
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
  value: number;

  @IsOptional()
  @ApiPropertyOptional()
  spent: number;

  @IsOptional()
  @ApiPropertyOptional()
  responsible: string;
}