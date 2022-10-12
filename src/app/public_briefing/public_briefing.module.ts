import { Module } from '@nestjs/common';
import { PublicBriefingService } from './public_briefing.service';
import { PublicBriefingController } from './public_briefing.controller';

@Module({
  controllers: [PublicBriefingController],
  providers: [PublicBriefingService]
})
export class PublicBriefingModule {}
