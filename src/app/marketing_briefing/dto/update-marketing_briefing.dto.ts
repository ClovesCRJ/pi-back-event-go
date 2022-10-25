import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateMarketingBriefingDto {
  @ApiPropertyOptional()
  @IsOptional()
  strengths: string;

  @ApiPropertyOptional()
  @IsOptional()
	weaknesses: string;
  
  @ApiPropertyOptional()
  @IsOptional()
	what_change: string;
}
