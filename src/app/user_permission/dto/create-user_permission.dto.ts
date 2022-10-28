import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsUUID } from "class-validator";

export class CreateUserPermissionDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsUUID()
  event_id: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  user_email: string;
  
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