import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = await this.eventRepository.create(createEventDto);
    return await this.eventRepository.save(event);
  }

  async findAllBelong(owner_id: string) {
    try {
      return await this.eventRepository.find({
        relations: ["briefing", "briefing.event_briefing"],
        where: { owner_id },
      });
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  async findOneBelong(options: FindOneOptions<Event>) {
    try {
      return await this.eventRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(MessagesUtils.EVENT_NOT_FOUND);
    }
  }

  async delete(id: string) {
    return await this.eventRepository.delete({ id });
  }
}
