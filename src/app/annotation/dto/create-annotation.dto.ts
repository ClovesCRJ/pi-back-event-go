import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAnnotationDto {
  @IsNotEmpty()
  @ApiProperty()
  text: string;
}