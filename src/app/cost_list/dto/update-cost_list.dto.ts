import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateCostListDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}