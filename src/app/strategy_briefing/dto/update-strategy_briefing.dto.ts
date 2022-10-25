import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateStrategyBriefingDto {
  @IsOptional()
  @ApiPropertyOptional()
  opportunities: string;

	@IsOptional()
  @ApiPropertyOptional()
  threats: string;

	@IsOptional()
  @ApiPropertyOptional()
  extra_attractions: string;

	@IsOptional()
  @ApiPropertyOptional()
  extra_services: string;

	@IsOptional()
  @ApiPropertyOptional()
  promotion_strategies: string;

	@IsOptional()
  @ApiPropertyOptional()
  sales_strategies: string;
}
