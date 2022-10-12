import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStrategyBriefingDto } from './dto/create-strategy_briefing.dto';
import { UpdateStrategyBriefingDto } from './dto/update-strategy_briefing.dto';
import { StrategyBriefing } from './entities/strategy_briefing.entity';

@Injectable()
export class StrategyBriefingService {
  constructor(
    @InjectRepository(StrategyBriefing)
    private readonly strategyBriefingRepository: Repository<StrategyBriefing>,
  ) {}

  async create(createStrategyBriefingDto: CreateStrategyBriefingDto) {
    const strategyBriefing = await this.strategyBriefingRepository.create(createStrategyBriefingDto);
    return await this.strategyBriefingRepository.save(strategyBriefing);
  }

  async delete(id: string) {
    return await this.strategyBriefingRepository.delete({ id });
  }

  // findAll() {
  //   return `This action returns all strategyBriefing`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} strategyBriefing`;
  // }

  // update(id: number, updateStrategyBriefingDto: UpdateStrategyBriefingDto) {
  //   return `This action updates a #${id} strategyBriefing`;
  // }
}
