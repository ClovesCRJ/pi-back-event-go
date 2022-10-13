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

  async delete(id: string) {
    return await this.marketingBriefingRepository.delete({ id });
  }

  async update(id: string, updateMarketingBriefingDto: UpdateMarketingBriefingDto) {
    const marketingBriefing = await this.marketingBriefingRepository.findOneOrFail({
      where: { id },
    });
    this.marketingBriefingRepository.merge(marketingBriefing, updateMarketingBriefingDto);
    return await this.marketingBriefingRepository.save(marketingBriefing);
  }
}
