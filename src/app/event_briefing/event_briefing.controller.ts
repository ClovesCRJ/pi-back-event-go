import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventBriefingService } from './event_briefing.service';
import { CreateEventBriefingDto } from './dto/create-event_briefing.dto';
import { UpdateEventBriefingDto } from './dto/update-event_briefing.dto';

@Controller('event-briefing')
export class EventBriefingController {
  constructor(private readonly eventBriefingService: EventBriefingService) {}

  // @Post()
  // create(@Body() createEventBriefingDto: CreateEventBriefingDto) {
  //   return this.eventBriefingService.create(createEventBriefingDto);
  // }

  // @Get()
  // findAll() {
  //   return this.eventBriefingService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.eventBriefingService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEventBriefingDto: UpdateEventBriefingDto) {
  //   return this.eventBriefingService.update(+id, updateEventBriefingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.eventBriefingService.remove(+id);
  // }
}
