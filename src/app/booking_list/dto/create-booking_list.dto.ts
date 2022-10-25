import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateBookingItemDto } from "src/app/booking_item/dto/create-booking_item.dto";

export class CreateBookingListDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiPropertyOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateBookingItemDto)
  booking_items: CreateBookingItemDto[];
}