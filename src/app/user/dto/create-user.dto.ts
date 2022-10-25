import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { MessagesUtils } from "src/utils/messages.utils";
import { RegExpUtils } from "../../../utils/regexp.utils";

export class CreateUserDto {
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
  
  @IsNotEmpty()
  @Matches(RegExpUtils.password, { message: MessagesUtils.PASSWORD_VALID  })
  @ApiProperty()
  password: string;
}
