import { Module } from '@nestjs/common';
import { EventRevenueService } from './event_revenue.service';
import { EventRevenueController } from './event_revenue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRevenue } from './entities/event_revenue.entity';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventRevenue]),
    EventModule,
  ],
  controllers: [EventRevenueController],
  providers: [EventRevenueService],
  exports: [EventRevenueService],
})
export class EventRevenueModule {}
