import { Injectable } from '@nestjs/common';
import { CreateEventBriefingDto } from './dto/create-event_briefing.dto';
import { UpdateEventBriefingDto } from './dto/update-event_briefing.dto';

@Injectable()
export class EventBriefingService {
  create(createEventBriefingDto: CreateEventBriefingDto) {
    return 'This action adds a new eventBriefing';
  }

  findAll() {
    return `This action returns all eventBriefing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventBriefing`;
  }

  update(id: number, updateEventBriefingDto: UpdateEventBriefingDto) {
    return `This action updates a #${id} eventBriefing`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventBriefing`;
  }
}
