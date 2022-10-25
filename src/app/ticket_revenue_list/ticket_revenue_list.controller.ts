import { Body, Controller, Delete, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { EventService } from '../event/event.service';
import { TicketRevenueService } from '../ticket_revenue/ticket_revenue.service';
import { CreateTicketRevenueListDto } from './dto/create-ticket_revenue_list.dto';
import { UpdateTicketRevenueListDto } from './dto/update-ticket_revenue_list.dto';
import { TicketRevenueListService } from './ticket_revenue_list.service';

@Controller('/api/v1/events/:event_id/ticket-revenue-lists')
@ApiTags('Ticket Revenue List')
export class TicketRevenueListController {
  constructor(
    private readonly ticketRevenueListService: TicketRevenueListService,
    @Inject(forwardRef(() => TicketRevenueService))
    private readonly ticketRevenueService: TicketRevenueService,
    private readonly eventService: EventService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createTicketRevenueListDto: CreateTicketRevenueListDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.ticketRevenueListService.create(
      event.id,
      createTicketRevenueListDto,
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(
    @Param('event_id') event_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.ticketRevenueListService.findAll(event.id);
  }

  @Get(':ticket_revenue_list_id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @Param('event_id') event_id: string,
    @Param('ticket_revenue_list_id') ticket_revenue_list_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.ticketRevenueListService.findOne({
      relations: ["ticket_revenues"],
      where: { id: ticket_revenue_list_id, event_id: event.id },
    });
  }

  @Put(':ticket_revenue_list_id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('event_id') event_id: string,
    @Param('ticket_revenue_list_id') ticket_revenue_list_id: string,
    @Req() req: any,
    @Body() updateTicketRevenueListDto: UpdateTicketRevenueListDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.ticketRevenueListService.update(
      event.id,
      ticket_revenue_list_id,
      updateTicketRevenueListDto,
    );
  }

  @Delete(':ticket_revenue_list_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('event_id') event_id: string,
    @Param('ticket_revenue_list_id') ticket_revenue_list_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const ticket_revenue_list = await this.ticketRevenueListService.findOne({
      relations: ["ticket_revenues"],
      where: { id: ticket_revenue_list_id, event_id: event.id },
    });
    for (const ticket_revenue in ticket_revenue_list.ticket_revenues) {
      if (Object.prototype.hasOwnProperty.call(ticket_revenue_list.ticket_revenues, ticket_revenue)) {
        const item = ticket_revenue_list.ticket_revenues[ticket_revenue];
        await this.ticketRevenueService.remove(item.id, ticket_revenue_list.id);
      }
    }
    return await this.ticketRevenueListService.remove(ticket_revenue_list_id);
  }
}
