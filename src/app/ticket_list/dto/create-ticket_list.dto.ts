import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateTicketItemDto } from "src/app/ticket_item/dto/create-ticket_item.dto";

export class CreateTicketListDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiPropertyOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTicketItemDto)
  ticket_items: CreateTicketItemDto[];
}