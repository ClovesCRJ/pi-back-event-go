import { IsISO8601, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateCashOutFlowDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsISO8601()
  date: Date;
}