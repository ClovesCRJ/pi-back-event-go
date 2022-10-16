import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from '../event/event.service';
import { CreateEventRevenueDto } from './dto/create-event_revenue.dto';
import { UpdateEventRevenueDto } from './dto/update-event_revenue.dto';
import { EventRevenueService } from './event_revenue.service';

@Controller('/api/v1/events/:event_id/event-revenues')
export class EventRevenueController {
  constructor(
    private readonly eventRevenueService: EventRevenueService,
    private readonly eventService: EventService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createEventRevenueDto: CreateEventRevenueDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.eventRevenueService.create(event.id, createEventRevenueDto);
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
    return await this.eventRevenueService.findAll(event.id);
  }

  @Get(':event_revenue_id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @Param('event_id') event_id: string,
    @Param('event_revenue_id') event_revenue_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.eventRevenueService.findOne({
      where: { id: event_revenue_id, event_id: event.id },
    });
  }

  @Put(':event_revenue_id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('event_id') event_id: string,
    @Param('event_revenue_id') event_revenue_id: string,
    @Req() req: any,
    @Body() updateEventRevenueDto: UpdateEventRevenueDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.eventRevenueService.update(
      event.id,
      event_revenue_id,
      updateEventRevenueDto,
    );
  }

  @Delete(':event_revenue_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('event_id') event_id: string,
    @Param('event_revenue_id') event_revenue_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.eventRevenueService.remove(event.id, event_revenue_id);
  }
}
