import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BriefingService } from './briefing.service';

@Controller('briefing')
@ApiTags('Briefing')
export class BriefingController {
  constructor(private readonly briefingService: BriefingService) {}
}
