import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PostEventDto {
  @IsNotEmpty()
  @ApiProperty()
  event_name: string;
}
