import { IsNotEmpty } from "class-validator";

export class UpdateCostListDto {
  @IsNotEmpty()
  name: string;
}