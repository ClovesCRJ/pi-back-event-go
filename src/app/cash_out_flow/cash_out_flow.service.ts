import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCashOutFlowDto } from './dto/create-cash_out_flow.entity';
import { UpdateCashOutFlowDto } from './dto/update-cash_out_flow.entity';
import { CashOutFlow } from './entities/cash_out_flow.entity';

@Injectable()
export class CashOutFlowService {
  constructor(
    @InjectRepository(CashOutFlow)
    private readonly cashOutFlowRepository: Repository<CashOutFlow>,
  ) {}
  
  async create(event_id: string, createCashOutFlowDto: CreateCashOutFlowDto) {
    const cashOutFlow = await this.cashOutFlowRepository.create({
      ...createCashOutFlowDto,
      event_id,
    });
    return await this.cashOutFlowRepository.save(cashOutFlow);
  }

  async findAll(event_id: string) {
    return await this.cashOutFlowRepository.find({
      where: { event_id }
    });
  }

  async findOne(options: FindOneOptions<CashOutFlow>) {
    try {
      return await this.cashOutFlowRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(MessagesUtils.CASH_OUT_FLOW_NOT_FOUND);
    }
  }

  async update(event_id: string, id: string, updateCashOutFlowDto: UpdateCashOutFlowDto) {
    const cashOutFlow = await this.findOne({
      where: { id, event_id },
    });
    this.cashOutFlowRepository.merge(cashOutFlow, updateCashOutFlowDto);
    return await this.cashOutFlowRepository.save(cashOutFlow);
  }

  async remove(event_id: string, id: string) {
    const cashOutFlow = await this.findOne({
      where: { id, event_id },
    });
    return await this.cashOutFlowRepository.delete({ id: cashOutFlow.id });
  }
}
