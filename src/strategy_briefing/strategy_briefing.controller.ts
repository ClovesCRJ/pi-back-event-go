import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StrategyBriefingService } from './strategy_briefing.service';
import { CreateStrategyBriefingDto } from './dto/create-strategy_briefing.dto';
import { UpdateStrategyBriefingDto } from './dto/update-strategy_briefing.dto';

@Controller('strategy-briefing')
export class StrategyBriefingController {
  constructor(private readonly strategyBriefingService: StrategyBriefingService) {}

  @Post()
  create(@Body() createStrategyBriefingDto: CreateStrategyBriefingDto) {
    return this.strategyBriefingService.create(createStrategyBriefingDto);
  }

  @Get()
  findAll() {
    return this.strategyBriefingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.strategyBriefingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStrategyBriefingDto: UpdateStrategyBriefingDto) {
    return this.strategyBriefingService.update(+id, updateStrategyBriefingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.strategyBriefingService.remove(+id);
  }
}
