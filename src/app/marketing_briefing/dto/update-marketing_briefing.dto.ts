import { IsOptional } from "class-validator";

export class UpdateMarketingBriefingDto {
  @IsOptional()
  strengths: string;
  @IsOptional()
	weaknesses: string;
  @IsOptional()
	what_change: string;
}
