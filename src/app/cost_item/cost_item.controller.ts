import { Body, Controller, Delete, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CostListService } from '../cost_list/cost_list.service';
import { EventService } from '../event/event.service';
import { CostItemService } from './cost_item.service';
import { CreateCostItemDto } from './dto/create-cost_item.dto';
import { UpdateCostItemDto } from './dto/update-cost_item.dto';

@Controller('/api/v1/events/:event_id/cost-lists/:cost_list_id/cost-items')
export class CostItemController {
  constructor(
    private readonly costItemService: CostItemService,
    private readonly eventService: EventService,
    @Inject(forwardRef(() => CostListService))
    private readonly costListService: CostListService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(
    @Param('event_id') event_id: string,
    @Param('cost_list_id') cost_list_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const cost_list = await this.costListService.findOne({
      where: { id: cost_list_id, event_id: event.id },
    });
    return await this.costItemService.findAll(cost_list.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Param('event_id') event_id: string,
    @Param('cost_list_id') cost_list_id: string,
    @Req() req: any,
    @Body() createCostItemDto: CreateCostItemDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const cost_list = await this.costListService.findOne({
      where: { id: cost_list_id, event_id: event.id },
    });
    return this.costItemService.create(cost_list.id, createCostItemDto);
  }

  @Get(':cost_item_id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @Param('event_id') event_id: string,
    @Param('cost_list_id') cost_list_id: string,
    @Param('cost_item_id') cost_item_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const cost_list = await this.costListService.findOne({
      where: { id: cost_list_id, event_id: event.id },
    });
    return await this.costItemService.findOne({
      where: { id: cost_item_id, cost_list_id: cost_list.id },
    });
  }

  @Put(':cost_item_id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('event_id') event_id: string,
    @Param('cost_list_id') cost_list_id: string,
    @Param('cost_item_id') cost_item_id: string,
    @Req() req: any,
    @Body() updateCostItemDto: UpdateCostItemDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const cost_list = await this.costListService.findOne({
      where: { id: cost_list_id, event_id: event.id },
    });
    return await this.costItemService.update(
      cost_item_id,
      cost_list.id,
      updateCostItemDto,
    );
  }

  @Delete(':cost_item_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('event_id') event_id: string,
    @Param('cost_list_id') cost_list_id: string,
    @Param('cost_item_id') cost_item_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const cost_list = await this.costListService.findOne({
      where: { id: cost_list_id, event_id: event.id },
    });
    return await this.costItemService.remove(cost_item_id, cost_list.id);
  }
}
