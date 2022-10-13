import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventBriefingDto } from './dto/create-event_briefing.dto';
import { UpdateEventBriefingDto } from './dto/update-event_briefing.dto';
import { EventBriefing } from './entities/event_briefing.entity';

@Injectable()
export class EventBriefingService {
  constructor(
    @InjectRepository(EventBriefing)
    private readonly eventBriefingRepository: Repository<EventBriefing>,
  ) {}

  async create(createEventBriefingDto: CreateEventBriefingDto) {
    const eventBriefing = await this.eventBriefingRepository.create(createEventBriefingDto);
    return await this.eventBriefingRepository.save(eventBriefing);
  }

  async delete(id: string) {
    return await this.eventBriefingRepository.delete({ id });
  }

  async update(id: string, updateEventBriefingDto: UpdateEventBriefingDto) {
    const eventBriefing = await this.eventBriefingRepository.findOneOrFail({
      where: { id },
    });
    this.eventBriefingRepository.merge(eventBriefing, updateEventBriefingDto);
    return await this.eventBriefingRepository.save(eventBriefing);
  }
}
