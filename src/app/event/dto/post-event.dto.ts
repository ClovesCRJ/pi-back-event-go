import { IsNotEmpty } from "class-validator";

export class PostEventDto {
  @IsNotEmpty()
  event_name: string;
}
