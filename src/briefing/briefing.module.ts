import { Module } from '@nestjs/common';
import { BriefingService } from './briefing.service';
import { BriefingController } from './briefing.controller';

@Module({
  controllers: [BriefingController],
  providers: [BriefingService]
})
export class BriefingModule {}
