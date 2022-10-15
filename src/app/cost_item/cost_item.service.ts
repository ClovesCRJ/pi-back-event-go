import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCostItemDto } from './dto/create-cost_item.dto';
import { CostItem } from './entities/cost_item.entity';

@Injectable()
export class CostItemService {
  constructor(
    @InjectRepository(CostItem)
    private readonly costItemRepository: Repository<CostItem>,
  ) {}

  async create(cost_list_id: string, createCostItemDto: CreateCostItemDto) {
    const costItem = await this.costItemRepository.create({
      ...createCostItemDto,
      cost_list_id,
    });
    return await this.costItemRepository.save(costItem);
  }

  async findAll(cost_list_id: string) {
    return await this.costItemRepository.find({
      where: { cost_list_id }
    });
  }

  async findOne(options: FindOneOptions<CostItem>) {
    try {
      return await this.costItemRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(MessagesUtils.COST_ITEM_NOT_FOUND);
    }
  }

  async update(id: string, cost_list_id: string, updateCostItemDto: CreateCostItemDto) {
    const costItem = await this.findOne({
      where: { id, cost_list_id },
    });
    this.costItemRepository.merge(costItem, updateCostItemDto);
    return await this.costItemRepository.save(costItem);
  }

  async remove(id: string, cost_list_id: string) {
    const costItem = await this.findOne({
      where: { id, cost_list_id },
    });
    return await this.costItemRepository.delete({ id: costItem.id });
  }
}
