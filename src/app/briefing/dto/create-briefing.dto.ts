import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateBriefingDto {
  @IsNotEmpty()
  @IsUUID()
  event_briefing_id: string;

  @IsNotEmpty()
  @IsUUID()
  public_briefing_id: string;

  @IsNotEmpty()
  @IsUUID()
  marketing_briefing_id: string;

  @IsNotEmpty()
  @IsUUID()
  strategy_briefing_id: string;

  @IsNotEmpty()
  @IsUUID()
  promotion_briefing_id: string;
}