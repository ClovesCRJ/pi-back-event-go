import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketingBriefingService } from './marketing_briefing.service';
import { CreateMarketingBriefingDto } from './dto/create-marketing_briefing.dto';
import { UpdateMarketingBriefingDto } from './dto/update-marketing_briefing.dto';

@Controller('marketing-briefing')
export class MarketingBriefingController {
  constructor(private readonly marketingBriefingService: MarketingBriefingService) {}

  // @Post()
  // create(@Body() createMarketingBriefingDto: CreateMarketingBriefingDto) {
  //   return this.marketingBriefingService.create(createMarketingBriefingDto);
  // }

  // @Get()
  // findAll() {
  //   return this.marketingBriefingService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.marketingBriefingService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMarketingBriefingDto: UpdateMarketingBriefingDto) {
  //   return this.marketingBriefingService.update(+id, updateMarketingBriefingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.marketingBriefingService.remove(+id);
  // }
}
