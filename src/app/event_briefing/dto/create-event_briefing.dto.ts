import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateEventBriefingDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
