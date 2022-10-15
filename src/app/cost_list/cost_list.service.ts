import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCostListDto } from './dto/create-cost_list.dto';
import { UpdateCostListDto } from './dto/update-cost_list.dto';
import { CostList } from './entities/cost_list.entity';

@Injectable()
export class CostListService {
  constructor(
    @InjectRepository(CostList)
    private readonly costListRepository: Repository<CostList>,
  ) {}

  async create(event_id: string, createCostListDto: CreateCostListDto) {
    const costList = await this.costListRepository.create({
      ...createCostListDto,
      event_id,
    });
    return await this.costListRepository.save(costList);
  }

  async findAll(event_id: string) {
    return await this.costListRepository.find({
      relations: ["cost_items"],
      where: { event_id }
    });
  }

  async findOne(options: FindOneOptions<CostList>) {
    try {
      return await this.costListRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(MessagesUtils.COST_LIST_NOT_FOUND);
    }
  }

  async update(event_id: string, id: string, updateCostListDto: UpdateCostListDto) {
    const costList = await this.findOne({
      where: { id, event_id },
    });
    this.costListRepository.merge(costList, updateCostListDto);
    return await this.costListRepository.save(costList);
  }

  async remove(id: string) {
    return await this.costListRepository.delete({ id });
  }
}
