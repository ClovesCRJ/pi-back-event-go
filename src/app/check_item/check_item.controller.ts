import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Put, HttpCode, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CheckListService } from '../check_list/check_list.service';
import { EventService } from '../event/event.service';
import { CheckItemService } from './check_item.service';
import { CreateCheckItemDto } from './dto/create-check_item.dto';
import { UpdateCheckItemDto } from './dto/update-check_item.dto';

@Controller('/api/v1/events/:event_id/check-lists/:check_list_id/check-items')
export class CheckItemController {
  constructor(
    private readonly checkItemService: CheckItemService,
    private readonly eventService: EventService,
    @Inject(forwardRef(() => CheckListService))
    private readonly checkListService: CheckListService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(
    @Param('event_id') event_id: string,
    @Param('check_list_id') check_list_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const check_list = await this.checkListService.findOne({
      where: { id: check_list_id, event_id: event.id },
    });
    return await this.checkItemService.findAll(check_list.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Param('event_id') event_id: string,
    @Param('check_list_id') check_list_id: string,
    @Req() req: any,
    @Body() createCheckItemDto: CreateCheckItemDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const check_list = await this.checkListService.findOne({
      where: { id: check_list_id, event_id: event.id },
    });
    return this.checkItemService.create(check_list.id, createCheckItemDto);
  }

  @Get(':check_item_id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @Param('event_id') event_id: string,
    @Param('check_list_id') check_list_id: string,
    @Param('check_item_id') check_item_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const check_list = await this.checkListService.findOne({
      where: { id: check_list_id, event_id: event.id },
    });
    return await this.checkItemService.findOne({
      where: { id: check_item_id, check_list_id: check_list.id },
    });
  }

  @Put(':check_item_id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('event_id') event_id: string,
    @Param('check_list_id') check_list_id: string,
    @Param('check_item_id') check_item_id: string,
    @Req() req: any,
    @Body() updateCheckItemDto: UpdateCheckItemDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const check_list = await this.checkListService.findOne({
      where: { id: check_list_id, event_id: event.id },
    });
    return await this.checkItemService.update(
      check_item_id,
      check_list.id,
      updateCheckItemDto,
    );
  }

  @Delete(':check_item_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('event_id') event_id: string,
    @Param('check_list_id') check_list_id: string,
    @Param('check_item_id') check_item_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const check_list = await this.checkListService.findOne({
      where: { id: check_list_id, event_id: event.id },
    });
    return await this.checkItemService.remove(check_item_id, check_list.id);
  }
}
