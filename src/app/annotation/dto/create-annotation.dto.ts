import { IsNotEmpty } from "class-validator";

export class CreateAnnotationDto {
  @IsNotEmpty()
  text: string;
}