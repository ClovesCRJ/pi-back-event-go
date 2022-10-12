import { PartialType } from '@nestjs/mapped-types';
import { CreateEventBriefingDto } from './create-event_briefing.dto';

export class UpdateEventBriefingDto extends PartialType(CreateEventBriefingDto) {}
