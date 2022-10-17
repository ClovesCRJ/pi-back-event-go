import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateTicketItemDto } from "src/app/ticket_item/dto/create-ticket_item.dto";

export class CreateTicketListDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTicketItemDto)
  ticket_items: CreateTicketItemDto[];
}