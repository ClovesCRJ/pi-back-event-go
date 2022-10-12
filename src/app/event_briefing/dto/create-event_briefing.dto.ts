import { IsNotEmpty } from "class-validator";

export class CreateEventBriefingDto {
  @IsNotEmpty()
  name: string;
}
