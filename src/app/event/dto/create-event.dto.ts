import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateEventDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsUUID()
  briefing_id: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsUUID()
  owner_id: string;
}
