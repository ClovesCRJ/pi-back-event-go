import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateBookingListDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}