import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateTicketRevenueDto } from "src/app/ticket_revenue/dto/create-ticket_revenue.dto";

export class CreateTicketRevenueListDto {
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTicketRevenueDto)
  ticket_revenues: CreateTicketRevenueDto[];
}