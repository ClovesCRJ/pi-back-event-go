import { PartialType } from '@nestjs/mapped-types';
import { CreateMarketingBriefingDto } from './create-marketing_briefing.dto';

export class UpdateMarketingBriefingDto extends PartialType(CreateMarketingBriefingDto) {}
