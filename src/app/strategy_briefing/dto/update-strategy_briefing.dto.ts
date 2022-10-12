import { PartialType } from '@nestjs/mapped-types';
import { CreateStrategyBriefingDto } from './create-strategy_briefing.dto';

export class UpdateStrategyBriefingDto extends PartialType(CreateStrategyBriefingDto) {}
