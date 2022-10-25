import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateTicketListDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}