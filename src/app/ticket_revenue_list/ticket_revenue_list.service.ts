import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTicketRevenueListDto } from './dto/create-ticket_revenue_list.dto';
import { UpdateTicketRevenueListDto } from './dto/update-ticket_revenue_list.dto';
import { TicketRevenueList } from './entities/ticket_revenue_list.entity';

@Injectable()
export class TicketRevenueListService {
  constructor(
    @InjectRepository(TicketRevenueList)
    private readonly ticketRevenueListRepository: Repository<TicketRevenueList>,
  ) {}
  
  async create(event_id: string, createTicketRevenueListDto: CreateTicketRevenueListDto) {
    const ticketRevenueList = await this.ticketRevenueListRepository.create({
      ...createTicketRevenueListDto,
      event_id,
    });
    return await this.ticketRevenueListRepository.save(ticketRevenueList);
  }

  async findAll(event_id: string) {
    return await this.ticketRevenueListRepository.find({
      relations: ["ticket_revenues"],
      where: { event_id }
    });
  }

  async findOne(options: FindOneOptions<TicketRevenueList>) {
    try {
      return await this.ticketRevenueListRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(MessagesUtils.TICKET_REVENUE_LIST_NOT_FOUND);
    }
  }

  async update(event_id: string, id: string, updateTicketRevenueListDto: UpdateTicketRevenueListDto) {
    const ticketRevenueList = await this.findOne({
      where: { id, event_id },
    });
    this.ticketRevenueListRepository.merge(ticketRevenueList, updateTicketRevenueListDto);
    return await this.ticketRevenueListRepository.save(ticketRevenueList);
  }

  async remove(id: string) {
    return await this.ticketRevenueListRepository.delete({ id });
  }
}
