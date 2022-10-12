import { Controller } from '@nestjs/common';
import { EventRevenueService } from './event_revenue.service';

@Controller('event-revenue')
export class EventRevenueController {
  constructor(private readonly eventRevenueService: EventRevenueService) {}
}
