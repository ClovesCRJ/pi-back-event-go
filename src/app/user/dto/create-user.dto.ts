import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { MessagesUtils } from "src/utils/messages.utils";
import { RegExpUtils } from "../../../utils/regexp.utils";

export class CreateUserDto {
  @IsNotEmpty()
  first_name: string;
  
  @IsNotEmpty()
  last_name: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @Matches(RegExpUtils.password, { message: MessagesUtils.PASSWORD_VALID  })
  password: string;
}
