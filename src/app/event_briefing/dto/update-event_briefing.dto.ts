import { PartialType } from '@nestjs/mapped-types';
import { CreateEventBriefingDto } from './create-event_briefing.dto';
import { IsDate, IsNotEmpty } from 'class-validator';
import { IsNumber } from 'class-validator';

export class UpdateEventBriefingDto {
  @IsNotEmpty()
  name: string;
    
  event_type: string;
	brand_history: string;
	purpose: string;
	
  @IsDate()
  event_date: Date;

	locale: string;

  @IsNumber()
	attendes: number;
  
	theme: string;
	time_duration: string;
	music_attractions: string;
	other_attractions: string;
	sectors: string;
	special_sectors: string;
	obs: string;
}
