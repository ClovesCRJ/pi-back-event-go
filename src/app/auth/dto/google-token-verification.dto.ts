import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GoogleTokenVerificationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;
}