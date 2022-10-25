import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdatePublicBriefingDto {
  @IsOptional()
  @ApiPropertyOptional()
  target_public: string;

	@IsOptional()
  @ApiPropertyOptional()
  gender: string;

	@IsOptional()
  @ApiPropertyOptional()
  age_group: string;

	@IsOptional()
  @ApiPropertyOptional()
  socioeconomic: string;

	@IsOptional()
  @ApiPropertyOptional()
  origin_city: string;

	@IsOptional()
  @ApiPropertyOptional()
  obs: string;
}
