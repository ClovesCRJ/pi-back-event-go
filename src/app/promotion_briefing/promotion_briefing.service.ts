import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePromotionBriefingDto } from './dto/create-promotion_briefing.dto';
import { UpdatePromotionBriefingDto } from './dto/update-promotion_briefing.dto';
import { PromotionBriefing } from './entities/promotion_briefing.entity';

@Injectable()
export class PromotionBriefingService {
  constructor(
    @InjectRepository(PromotionBriefing)
    private readonly promotionBriefingRepository: Repository<PromotionBriefing>,
  ) {}
  
  async create(createPromotionBriefingDto: CreatePromotionBriefingDto) {
    const promotionBriefing = await this.promotionBriefingRepository.create(createPromotionBriefingDto);
    return await this.promotionBriefingRepository.save(promotionBriefing);
  }

  async delete(id: string) {
    return await this.promotionBriefingRepository.delete({ id });
  }

  async update(id: string, updatePromotionBriefingDto: UpdatePromotionBriefingDto) {
    const promotionBriefing = await this.promotionBriefingRepository.findOneOrFail({
      where: { id },
    });
    this.promotionBriefingRepository.merge(promotionBriefing, updatePromotionBriefingDto);
    return await this.promotionBriefingRepository.save(promotionBriefing);
  }
}
