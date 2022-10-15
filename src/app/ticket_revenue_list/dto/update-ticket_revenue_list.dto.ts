import { IsNotEmpty } from "class-validator";

export class UpdateTicketRevenueListDto {
  @IsNotEmpty()
  name: string;
}