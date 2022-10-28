import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsUUID } from "class-validator";

export class UpdateUserPermissionDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsUUID()
  event_id: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsUUID()
  user_id: string;
  
  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  briefing_read: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  briefing_write: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  check_list_read: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  check_list_write: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  costs_read: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  costs_write: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  ticket_revenue_read: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  ticket_revenue_write: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  event_revenue_read: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  event_revenue_write: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  finance_read: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  finance_write: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  booking_read: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  booking_write: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  tickets_list_read: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  tickets_list_write: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  annotation_read: boolean;

  @IsNotEmpty()
  @ApiProperty()
  @IsBoolean()
  annotation_write: boolean;
}