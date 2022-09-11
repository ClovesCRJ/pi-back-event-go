import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PromotionBriefingService } from './promotion_briefing.service';
import { CreatePromotionBriefingDto } from './dto/create-promotion_briefing.dto';
import { UpdatePromotionBriefingDto } from './dto/update-promotion_briefing.dto';

@Controller('promotion-briefing')
export class PromotionBriefingController {
  constructor(private readonly promotionBriefingService: PromotionBriefingService) {}

  @Post()
  create(@Body() createPromotionBriefingDto: CreatePromotionBriefingDto) {
    return this.promotionBriefingService.create(createPromotionBriefingDto);
  }

  @Get()
  findAll() {
    return this.promotionBriefingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotionBriefingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromotionBriefingDto: UpdatePromotionBriefingDto) {
    return this.promotionBriefingService.update(+id, updatePromotionBriefingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionBriefingService.remove(+id);
  }
}
