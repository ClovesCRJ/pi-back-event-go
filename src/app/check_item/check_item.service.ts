import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCheckItemDto } from './dto/create-check_item.dto';
import { UpdateCheckItemDto } from './dto/update-check_item.dto';
import { CheckItem } from './entities/check_item.entity';

@Injectable()
export class CheckItemService {
  constructor(
    @InjectRepository(CheckItem)
    private readonly checkItemRepository: Repository<CheckItem>,
  ) {}

  async create(check_list_id: string, createCheckItemDto: CreateCheckItemDto) {
    const checkItem = await this.checkItemRepository.create({
      ...createCheckItemDto,
      check_list_id,
    });
    return await this.checkItemRepository.save(checkItem);
  }

  async findAll(check_list_id: string) {
    return await this.checkItemRepository.find({
      where: { check_list_id }
    });
  }

  async findOne(options: FindOneOptions<CheckItem>) {
    try {
      return await this.checkItemRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(MessagesUtils.CHECK_ITEM_NOT_FOUND);
    }
  }

  async update(id: string, check_list_id: string, updateCheckItemDto: UpdateCheckItemDto) {
    const checkItem = await this.findOne({
      where: { id, check_list_id },
    });
    this.checkItemRepository.merge(checkItem, updateCheckItemDto);
    return await this.checkItemRepository.save(checkItem);
  }

  async remove(id: string, check_list_id: string) {
    const checkItem = await this.findOne({
      where: { id, check_list_id },
    });
    return await this.checkItemRepository.delete({ id: checkItem.id });
  }
}
