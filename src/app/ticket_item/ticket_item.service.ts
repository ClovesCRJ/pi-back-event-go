import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTicketItemDto } from './dto/create-ticket_item.dto';
import { UpdateTicketItemDto } from './dto/update-ticket_item.dto';
import { TicketItem } from './entities/ticket_item.entity';

@Injectable()
export class TicketItemService {
  constructor(
    @InjectRepository(TicketItem)
    private readonly ticketItemRepository: Repository<TicketItem>,
  ) {}

  async create(ticket_list_id: string, createTicketItemDto: CreateTicketItemDto) {
    const ticketItem = await this.ticketItemRepository.create({
      ...createTicketItemDto,
      ticket_list_id,
    });
    return await this.ticketItemRepository.save(ticketItem);
  }

  async findAll(ticket_list_id: string) {
    return await this.ticketItemRepository.find({
      where: { ticket_list_id }
    });
  }

  async findOne(options: FindOneOptions<TicketItem>) {
    try {
      return await this.ticketItemRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(MessagesUtils.TICKET_ITEM_NOT_FOUND);
    }
  }

  async update(id: string, ticket_list_id: string, updateTicketItemDto: UpdateTicketItemDto) {
    const ticketItem = await this.findOne({
      where: { id, ticket_list_id },
    });
    this.ticketItemRepository.merge(ticketItem, updateTicketItemDto);
    return await this.ticketItemRepository.save(ticketItem);
  }

  async remove(id: string, ticket_list_id: string) {
    const ticketItem = await this.findOne({
      where: { id, ticket_list_id },
    });
    return await this.ticketItemRepository.delete({ id: ticketItem.id });
  }
}
