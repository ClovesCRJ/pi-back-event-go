import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Inject, forwardRef, UseGuards, Put } from '@nestjs/common';
import { EventBriefingService } from './event_briefing.service';
import { CreateEventBriefingDto } from './dto/create-event_briefing.dto';
import { UpdateEventBriefingDto } from './dto/update-event_briefing.dto';
import { EventService } from '../event/event.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1/events/:event_id/event-briefing')
export class EventBriefingController {
  constructor(
    private readonly eventBriefingService: EventBriefingService,
    @Inject(forwardRef(() => EventService))
    private readonly eventService: EventService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('event_id') event_id: string, @Req() req: any) {
    const event = await this.eventService.findOneBelong({
      relations: ["briefing.event_briefing"],
      where: { id: event_id, owner_id: req.user.id },
    });
    return event.briefing.event_briefing;
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('event_id') event_id: string,
    @Body() updateEventBriefingDto: UpdateEventBriefingDto,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      relations: ["briefing.event_briefing"],
      where: { id: event_id, owner_id: req.user.id },
    });
    return this.eventBriefingService.update(
      event.briefing.event_briefing_id,
      updateEventBriefingDto,
    );
  }
}
