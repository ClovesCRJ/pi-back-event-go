import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTicketListDto } from './dto/create-ticket_list.dto';
import { UpdateTicketListDto } from './dto/update-ticket_list.dto';
import { TicketList } from './entities/ticket_list.entity';

@Injectable()
export class TicketListService {
  constructor(
    @InjectRepository(TicketList)
    private readonly ticketListRepository: Repository<TicketList>,
  ) {}
  
  async create(event_id: string, createTicketListDto: CreateTicketListDto) {
    const ticketList = await this.ticketListRepository.create({
      ...createTicketListDto,
      event_id,
    });
    return await this.ticketListRepository.save(ticketList);
  }

  async findAll(event_id: string) {
    return await this.ticketListRepository.find({
      relations: ["ticket_items"],
      where: { event_id }
    });
  }

  async findOne(options: FindOneOptions<TicketList>) {
    try {
      return await this.ticketListRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(MessagesUtils.TICKET_LIST_NOT_FOUND);
    }
  }

  async update(event_id: string, id: string, updateTicketListDto: UpdateTicketListDto) {
    const ticketList = await this.findOne({
      where: { id, event_id },
    });
    this.ticketListRepository.merge(ticketList, updateTicketListDto);
    return await this.ticketListRepository.save(ticketList);
  }

  async remove(id: string) {
    return await this.ticketListRepository.delete({ id });
  }
}
