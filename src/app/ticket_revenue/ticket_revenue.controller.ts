import { Controller } from '@nestjs/common';
import { TicketRevenueService } from './ticket_revenue.service';

@Controller('ticket-revenue')
export class TicketRevenueController {
  constructor(private readonly ticketRevenueService: TicketRevenueService) {}
}
