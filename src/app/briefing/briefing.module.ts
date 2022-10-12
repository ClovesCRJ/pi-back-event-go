import { Module } from '@nestjs/common';
import { BriefingService } from './briefing.service';
import { BriefingController } from './briefing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Briefing } from './entities/briefing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Briefing])],
  exports: [BriefingService],
  controllers: [BriefingController],
  providers: [BriefingService]
})
export class BriefingModule {}
