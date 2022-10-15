import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateCostItemDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsOptional()
  spent: number;

  @IsOptional()
  responsible: string;
}