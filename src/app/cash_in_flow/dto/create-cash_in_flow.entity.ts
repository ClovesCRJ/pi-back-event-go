import { ApiProperty } from "@nestjs/swagger";
import { IsISO8601, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCashInFlowDto {
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsISO8601()
  date: Date;
}