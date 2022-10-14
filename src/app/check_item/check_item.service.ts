import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findOne(id: number) {
    return `This action returns a #${id} checkItem`;
  }

  update(id: number, updateCheckItemDto: UpdateCheckItemDto) {
    return `This action updates a #${id} checkItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkItem`;
  }
}
