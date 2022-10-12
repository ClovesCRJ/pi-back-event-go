import { Injectable } from '@nestjs/common';
import { CreateMarketingBriefingDto } from './dto/create-marketing_briefing.dto';
import { UpdateMarketingBriefingDto } from './dto/update-marketing_briefing.dto';

@Injectable()
export class MarketingBriefingService {
  create(createMarketingBriefingDto: CreateMarketingBriefingDto) {
    return 'This action adds a new marketingBriefing';
  }

  findAll() {
    return `This action returns all marketingBriefing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marketingBriefing`;
  }

  update(id: number, updateMarketingBriefingDto: UpdateMarketingBriefingDto) {
    return `This action updates a #${id} marketingBriefing`;
  }

  remove(id: number) {
    return `This action removes a #${id} marketingBriefing`;
  }
}
