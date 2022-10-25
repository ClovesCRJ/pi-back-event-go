import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Put, HttpCode, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CheckItemService } from '../check_item/check_item.service';
import { EventService } from '../event/event.service';
import { CheckListService } from './check_list.service';
import { CreateCheckListDto } from './dto/create-check_list.dto';
import { UpdateCheckListDto } from './dto/update-check_list.dto';

@Controller('/api/v1/events/:event_id/check-lists')
@ApiTags('Check List')
export class CheckListController {
  constructor(
    private readonly checkListService: CheckListService,
    @Inject(forwardRef(() => CheckItemService))
    private readonly checkItemService: CheckItemService,
    private readonly eventService: EventService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createCheckListDto: CreateCheckListDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.checkListService.create(event.id, createCheckListDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(
    @Param('event_id') event_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.checkListService.findAll(event.id);
  }

  @Get(':check_list_id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @Param('event_id') event_id: string,
    @Param('check_list_id') check_list_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.checkListService.findOne({
      relations: ["check_items"],
      where: { id: check_list_id, event_id: event.id },
    });
  }

  @Put(':check_list_id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('event_id') event_id: string,
    @Param('check_list_id') check_list_id: string,
    @Req() req: any,
    @Body() updateCheckListDto: UpdateCheckListDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.checkListService.update(
      event.id,
      check_list_id,
      updateCheckListDto,
    );
  }

  @Delete(':check_list_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('event_id') event_id: string,
    @Param('check_list_id') check_list_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    const check_list = await this.checkListService.findOne({
      relations: ["check_items"],
      where: { id: check_list_id, event_id: event.id },
    });
    for (const check_item in check_list.check_items) {
      if (Object.prototype.hasOwnProperty.call(check_list.check_items, check_item)) {
        const item = check_list.check_items[check_item];
        await this.checkItemService.remove(item.id, check_list.id);
      }
    }
    return await this.checkListService.remove(check_list_id);
  }
}
