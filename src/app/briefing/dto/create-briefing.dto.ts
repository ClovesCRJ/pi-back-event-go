import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateBriefingDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsUUID()
  event_briefing_id: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsUUID()
  public_briefing_id: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsUUID()
  marketing_briefing_id: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsUUID()
  strategy_briefing_id: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsUUID()
  promotion_briefing_id: string;
}