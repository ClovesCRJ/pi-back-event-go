import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateAnnotationDto {
  @IsNotEmpty()
  @ApiProperty()
  text: string;
}