import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateEventRevenueDto } from './dto/create-event_revenue.dto';
import { UpdateEventRevenueDto } from './dto/update-event_revenue.dto';
import { EventRevenue } from './entities/event_revenue.entity';

@Injectable()
export class EventRevenueService {
  constructor(
    @InjectRepository(EventRevenue)
    private readonly eventRevenueRepository: Repository<EventRevenue>,
  ) {}
  
  async create(event_id: string, createEventRevenueDto: CreateEventRevenueDto) {
    const eventRevenue = await this.eventRevenueRepository.create({
      ...createEventRevenueDto,
      event_id,
    });
    return await this.eventRevenueRepository.save(eventRevenue);
  }

  async findAll(event_id: string) {
    return await this.eventRevenueRepository.find({
      where: { event_id }
    });
  }

  async findOne(options: FindOneOptions<EventRevenue>) {
    try {
      return await this.eventRevenueRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(MessagesUtils.EVENT_REVENUE_NOT_FOUND);
    }
  }

  async update(event_id: string, id: string, updateEventRevenueDto: UpdateEventRevenueDto) {
    const eventRevenue = await this.findOne({
      where: { id, event_id },
    });
    this.eventRevenueRepository.merge(eventRevenue, updateEventRevenueDto);
    return await this.eventRevenueRepository.save(eventRevenue);
  }

  async remove(event_id: string, id: string) {
    const eventRevenue = await this.findOne({
      where: { id, event_id },
    });
    return await this.eventRevenueRepository.delete({ id: eventRevenue.id });
  }
}
