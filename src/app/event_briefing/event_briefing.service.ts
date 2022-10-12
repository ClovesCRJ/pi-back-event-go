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

  // findAll() {
  //   return `This action returns all eventBriefing`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} eventBriefing`;
  // }

  // update(id: number, updateEventBriefingDto: UpdateEventBriefingDto) {
  //   return `This action updates a #${id} eventBriefing`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} eventBriefing`;
  // }
}
