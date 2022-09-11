import { Injectable } from '@nestjs/common';
import { CreatePromotionBriefingDto } from './dto/create-promotion_briefing.dto';
import { UpdatePromotionBriefingDto } from './dto/update-promotion_briefing.dto';

@Injectable()
export class PromotionBriefingService {
  create(createPromotionBriefingDto: CreatePromotionBriefingDto) {
    return 'This action adds a new promotionBriefing';
  }

  findAll() {
    return `This action returns all promotionBriefing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promotionBriefing`;
  }

  update(id: number, updatePromotionBriefingDto: UpdatePromotionBriefingDto) {
    return `This action updates a #${id} promotionBriefing`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotionBriefing`;
  }
}
