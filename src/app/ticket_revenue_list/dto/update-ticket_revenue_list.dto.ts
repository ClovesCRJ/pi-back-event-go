import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateTicketRevenueListDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}