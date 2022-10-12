import { Controller } from '@nestjs/common';
import { TicketRevenueListService } from './ticket_revenue_list.service';

@Controller('ticket-revenue-list')
export class TicketRevenueListController {
  constructor(private readonly ticketRevenueListService: TicketRevenueListService) {}
}
