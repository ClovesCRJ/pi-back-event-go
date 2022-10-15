import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTicketRevenueDto } from './dto/create-ticket_revenue.dto';
import { UpdateTicketRevenueDto } from './dto/update-ticket_revenue.dto';
import { TicketRevenue } from './entities/ticket_revenue.entity';

@Injectable()
export class TicketRevenueService {
  constructor(
    @InjectRepository(TicketRevenue)
    private readonly ticketRevenueRepository: Repository<TicketRevenue>,
  ) {}

  async create(ticket_revenue_list_id: string, createTicketRevenueDto: CreateTicketRevenueDto) {
    const ticketRevenue = await this.ticketRevenueRepository.create({
      ...createTicketRevenueDto,
      ticket_revenue_list_id,
    });
    return await this.ticketRevenueRepository.save(ticketRevenue);
  }

  async findAll(ticket_revenue_list_id: string) {
    return await this.ticketRevenueRepository.find({
      where: { ticket_revenue_list_id }
    });
  }

  async findOne(options: FindOneOptions<TicketRevenue>) {
    try {
      return await this.ticketRevenueRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(MessagesUtils.TICKET_REVENUE_NOT_FOUND);
    }
  }

  async update(id: string, ticket_revenue_list_id: string, updateTicketRevenueDto: UpdateTicketRevenueDto) {
    const ticketRevenue = await this.findOne({
      where: { id, ticket_revenue_list_id },
    });
    this.ticketRevenueRepository.merge(ticketRevenue, updateTicketRevenueDto);
    return await this.ticketRevenueRepository.save(ticketRevenue);
  }

  async remove(id: string, ticket_revenue_list_id: string) {
    const ticketRevenue = await this.findOne({
      where: { id, ticket_revenue_list_id },
    });
    return await this.ticketRevenueRepository.delete({ id: ticketRevenue.id });
  }
}
