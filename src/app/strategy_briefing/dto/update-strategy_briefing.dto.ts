import { IsOptional } from "class-validator";

export class UpdateStrategyBriefingDto {
  @IsOptional()
  opportunities: string;
	@IsOptional()
  threats: string;
	@IsOptional()
  extra_attractions: string;
	@IsOptional()
  extra_services: string;
	@IsOptional()
  promotion_strategies: string;
	@IsOptional()
  sales_strategies: string;
}
