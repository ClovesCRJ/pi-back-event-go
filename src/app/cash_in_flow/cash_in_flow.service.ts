import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCashInFlowDto } from './dto/create-cash_in_flow.entity';
import { UpdateCashInFlowDto } from './dto/update-cash_in_flow.entity';
import { CashInFlow } from './entities/cash_in_flow.entity';

@Injectable()
export class CashInFlowService {
  constructor(
    @InjectRepository(CashInFlow)
    private readonly cashInFlowRepository: Repository<CashInFlow>,
  ) {}
  
  async create(event_id: string, createCashInFlowDto: CreateCashInFlowDto) {
    const cashInFlow = await this.cashInFlowRepository.create({
      ...createCashInFlowDto,
      event_id,
    });
    return await this.cashInFlowRepository.save(cashInFlow);
  }

  async findAll(event_id: string) {
    return await this.cashInFlowRepository.find({
      where: { event_id }
    });
  }

  async findOne(options: FindOneOptions<CashInFlow>) {
    try {
      return await this.cashInFlowRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(MessagesUtils.CASH_IN_FLOW_NOT_FOUND);
    }
  }

  async update(event_id: string, id: string, updateCashInFlowDto: UpdateCashInFlowDto) {
    const cashInFlow = await this.findOne({
      where: { id, event_id },
    });
    this.cashInFlowRepository.merge(cashInFlow, updateCashInFlowDto);
    return await this.cashInFlowRepository.save(cashInFlow);
  }

  async remove(event_id: string, id: string) {
    const cashInFlow = await this.findOne({
      where: { id, event_id },
    });
    return await this.cashInFlowRepository.delete({ id: cashInFlow.id });
  }
}
