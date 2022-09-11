import { PartialType } from '@nestjs/mapped-types';
import { CreatePromotionBriefingDto } from './create-promotion_briefing.dto';

export class UpdatePromotionBriefingDto extends PartialType(CreatePromotionBriefingDto) {}
