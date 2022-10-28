import { forwardRef, Module } from '@nestjs/common';
import { BriefingService } from './briefing.service';
import { BriefingController } from './briefing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Briefing } from './entities/briefing.entity';
import { EventModule } from '../event/event.module';
import { UserPermissionModule } from '../user_permission/user_permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Briefing]),
    forwardRef(() => EventModule),
    UserPermissionModule,
  ],
  exports: [BriefingService],
  controllers: [BriefingController],
  providers: [BriefingService]
})
export class BriefingModule {}
