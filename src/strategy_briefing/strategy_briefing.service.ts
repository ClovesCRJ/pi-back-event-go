import { Injectable } from '@nestjs/common';
import { CreateStrategyBriefingDto } from './dto/create-strategy_briefing.dto';
import { UpdateStrategyBriefingDto } from './dto/update-strategy_briefing.dto';

@Injectable()
export class StrategyBriefingService {
  create(createStrategyBriefingDto: CreateStrategyBriefingDto) {
    return 'This action adds a new strategyBriefing';
  }

  findAll() {
    return `This action returns all strategyBriefing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} strategyBriefing`;
  }

  update(id: number, updateStrategyBriefingDto: UpdateStrategyBriefingDto) {
    return `This action updates a #${id} strategyBriefing`;
  }

  remove(id: number) {
    return `This action removes a #${id} strategyBriefing`;
  }
}
