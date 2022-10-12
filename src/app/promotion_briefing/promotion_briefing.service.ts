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

  // findAll() {
  //   return `This action returns all promotionBriefing`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} promotionBriefing`;
  // }

  // update(id: number, updatePromotionBriefingDto: UpdatePromotionBriefingDto) {
  //   return `This action updates a #${id} promotionBriefing`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} promotionBriefing`;
  // }
}
