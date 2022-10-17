import { Body, Controller, Delete, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from '../event/event.service';
import { TicketItemService } from '../ticket_item/ticket_item.service';
import { CreateTicketListDto } from './dto/create-ticket_list.dto';
import { UpdateTicketListDto } from './dto/update-ticket_list.dto';
import { TicketListService } from './ticket_list.service';

@Controller('/api/v1/events/:event_id/ticket-lists')
export class TicketListController {
  constructor(
    private readonly ticketListService: TicketListService,
    @Inject(forwardRef(() => TicketItemService))
    private readonly ticketItemService: TicketItemService,
    private readonly eventService: EventService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createTicketListDto: CreateTicketListDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.ticketListService.create(event.id, createTicketListDto);
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
    return await this.ticketListService.findAll(event.id);
  }

  @Get(':ticket_list_id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @Param('event_id') event_id: string,
    @Param('ticket_list_id') ticket_list_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.ticketListService.findOne({
      relations: ["ticket_items"],
      where: { id: ticket_list_id, event_id: event.id },
    });
  }

  @Put(':ticket_list_id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('event_id') event_id: string,
    @Param('ticket_list_id') ticket_list_id: string,
    @Req() req: any,
    @Body() updateTicketListDto: UpdateTicketListDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.ticketListService.update(
      event.id,
      ticket_list_id,
      updateTicketListDto,
    );
  }

  @Delete(':ticket_list_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('event_id') event_id: string,
    @Param('ticket_list_id') ticket_list_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const ticketList = await this.ticketListService.findOne({
      relations: ["ticket_items"],
      where: { id: ticket_list_id, event_id: event.id },
    });
    for (const ticket_item in ticketList.ticket_items) {
      if (Object.prototype.hasOwnProperty.call(ticketList.ticket_items, ticket_item)) {
        const item = ticketList.ticket_items[ticket_item];
        await this.ticketItemService.remove(item.id, ticketList.id);
      }
    }
    return await this.ticketListService.remove(ticket_list_id);
  }
}
