import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdatePromotionBriefingDto {
  @IsOptional()
  @ApiPropertyOptional()
  promotion_means: string;

	@IsOptional()
  @ApiPropertyOptional()
  alternative_media: string;

	@IsOptional()
  @ApiPropertyOptional()
  fisical_actions: string;

	@IsOptional()
  @ApiPropertyOptional()
  start: Date;

	@IsOptional()
  @ApiPropertyOptional()
  end: Date;

	@IsOptional()
  @ApiPropertyOptional()
  designer: string;
  
	@IsOptional()
  @ApiPropertyOptional()
  video_maker: string;
}
