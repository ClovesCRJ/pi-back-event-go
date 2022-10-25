import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateEventBriefingDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

	@IsOptional()
  @ApiPropertyOptional()
	event_type: string;

	@IsOptional()
  @ApiPropertyOptional()
	brand_history: string;

	@IsOptional()
  @ApiPropertyOptional()
	purpose: string;

	@IsOptional()
  @ApiPropertyOptional()
  event_date: Date;

	@IsOptional()
  @ApiPropertyOptional()
	locale: string;

	@IsOptional()
  @ApiPropertyOptional()
  attendes: number;

	@IsOptional()
  @ApiPropertyOptional()
	theme: string;

	@IsOptional()
  @ApiPropertyOptional()
	time_duration: string;

	@IsOptional()
  @ApiPropertyOptional()
	music_attractions: string;

	@IsOptional()
  @ApiPropertyOptional()
	other_attractions: string;

	@IsOptional()
  @ApiPropertyOptional()
	sectors: string;

	@IsOptional()
  @ApiPropertyOptional()
	special_sectors: string;
	
	@IsOptional()
  @ApiPropertyOptional()
	obs: string;
}
