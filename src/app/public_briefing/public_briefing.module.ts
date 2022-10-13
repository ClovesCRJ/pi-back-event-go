import { forwardRef, Module } from '@nestjs/common';
import { PublicBriefingService } from './public_briefing.service';
import { PublicBriefingController } from './public_briefing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicBriefing } from './entities/public_briefing.entity';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublicBriefing]),
    forwardRef(() => EventModule),
  ],
  exports: [PublicBriefingService],
  controllers: [PublicBriefingController],
  providers: [PublicBriefingService]
})
export class PublicBriefingModule {}
