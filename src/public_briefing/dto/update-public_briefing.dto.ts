import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicBriefingDto } from './create-public_briefing.dto';

export class UpdatePublicBriefingDto extends PartialType(CreatePublicBriefingDto) {}
