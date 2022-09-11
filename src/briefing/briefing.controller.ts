import { Controller } from '@nestjs/common';
import { BriefingService } from './briefing.service';

@Controller('briefing')
export class BriefingController {
  constructor(private readonly briefingService: BriefingService) {}
}
