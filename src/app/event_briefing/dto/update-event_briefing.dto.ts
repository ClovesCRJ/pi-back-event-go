import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateEventBriefingDto {
  @IsNotEmpty()
  name: string;
	@IsOptional()
	event_type: string;
	@IsOptional()
	brand_history: string;
	@IsOptional()
	purpose: string;
	@IsOptional()
  event_date: Date;
	@IsOptional()
	locale: string;
	@IsOptional()
  attendes: number;
	@IsOptional()
	theme: string;
	@IsOptional()
	time_duration: string;
	@IsOptional()
	music_attractions: string;
	@IsOptional()
	other_attractions: string;
	@IsOptional()
	sectors: string;
	@IsOptional()
	special_sectors: string;
	@IsOptional()
	obs: string;
}
