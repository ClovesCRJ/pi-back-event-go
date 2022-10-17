import { IsNotEmpty } from "class-validator";

export class UpdateTicketListDto {
  @IsNotEmpty()
  name: string;
}