import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckItemDto: UpdateCheckItemDto) {
    return this.checkItemService.update(+id, updateCheckItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkItemService.remove(+id);
  }
}
