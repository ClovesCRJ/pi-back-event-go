import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMarketingBriefingDto } from './dto/create-marketing_briefing.dto';
import { UpdateMarketingBriefingDto } from './dto/update-marketing_briefing.dto';
import { MarketingBriefing } from './entities/marketing_briefing.entity';

@Injectable()
export class MarketingBriefingService {
  constructor(
    @InjectRepository(MarketingBriefing)
    private readonly marketingBriefingRepository: Repository<MarketingBriefing>,
  ) {}

  async create(createMarketingBriefingDto: CreateMarketingBriefingDto) {
    const marketingBriefing = await this.marketingBriefingRepository.create(createMarketingBriefingDto);
    return await this.marketingBriefingRepository.save(marketingBriefing);
  }

  // findAll() {
  //   return `This action returns all marketingBriefing`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} marketingBriefing`;
  // }

  // update(id: number, updateMarketingBriefingDto: UpdateMarketingBriefingDto) {
  //   return `This action updates a #${id} marketingBriefing`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} marketingBriefing`;
  // }
}
