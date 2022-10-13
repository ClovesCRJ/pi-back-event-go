import { IsOptional } from "class-validator";

export class UpdatePublicBriefingDto {
  @IsOptional()
  target_public: string;
	@IsOptional()
  gender: string;
	@IsOptional()
  age_group: string;
	@IsOptional()
  socioeconomic: string;
	@IsOptional()
  origin_city: string;
	@IsOptional()
  obs: string;
}
