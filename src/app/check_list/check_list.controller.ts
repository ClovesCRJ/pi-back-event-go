import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from '../event/event.service';
import { CheckListService } from './check_list.service';
import { CreateCheckListDto } from './dto/create-check_list.dto';
import { UpdateCheckListDto } from './dto/update-check_list.dto';

@Controller('/api/v1/events/:event_id/check-lists')
export class CheckListController {
  constructor(
    private readonly checkListService: CheckListService,
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
    return await this.checkListService.findAll(event_id);
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
    return await this.checkListService.remove(
      event.id,
      check_list_id,
    );
  }
}
