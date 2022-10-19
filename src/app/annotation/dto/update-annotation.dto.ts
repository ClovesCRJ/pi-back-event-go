import { IsNotEmpty } from "class-validator";

export class UpdateAnnotationDto {
  @IsNotEmpty()
  text: string;
}