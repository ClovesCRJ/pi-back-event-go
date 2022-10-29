import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserWithGoogleDto {
  @IsNotEmpty()
  @ApiProperty()
  first_name: string;
  
  @IsNotEmpty()
  @ApiProperty()
  last_name: string;
  
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
