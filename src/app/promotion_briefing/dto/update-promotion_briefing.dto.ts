import { IsOptional } from "class-validator";

export class UpdatePromotionBriefingDto {
  @IsOptional()
  promotion_means: string;
	@IsOptional()
  alternative_media: string;
	@IsOptional()
  fisical_actions: string;
	@IsOptional()
  start: Date;
	@IsOptional()
  end: Date;
	@IsOptional()
  designer: string;
	@IsOptional()
  video_maker: string;
}
