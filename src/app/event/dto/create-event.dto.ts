import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateEventDto {
  @IsNotEmpty()
  @IsUUID()
  briefing_id: string;

  @IsNotEmpty()
  @IsUUID()
  owner_id: string;
}
