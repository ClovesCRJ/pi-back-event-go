import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from '../event/event.service';
import { CashInFlowService } from './cash_in_flow.service';
import { CreateCashInFlowDto } from './dto/create-cash_in_flow.entity';
import { UpdateCashInFlowDto } from './dto/update-cash_in_flow.entity';

@Controller('/api/v1/events/:event_id/cash-in-flows')
export class CashInFlowController {
  constructor(
    private readonly cashInFlowService: CashInFlowService,
    private readonly eventService: EventService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createCashInFlowDto: CreateCashInFlowDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.cashInFlowService.create(event.id, createCashInFlowDto);
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
    return await this.cashInFlowService.findAll(event.id);
  }

  @Get(':cash_in_flow_id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @Param('event_id') event_id: string,
    @Param('cash_in_flow_id') cash_in_flow_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.cashInFlowService.findOne({
      where: { id: cash_in_flow_id, event_id: event.id },
    });
  }

  @Put(':cash_in_flow_id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('event_id') event_id: string,
    @Param('cash_in_flow_id') cash_in_flow_id: string,
    @Req() req: any,
    @Body() updateCashInFlowDto: UpdateCashInFlowDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.cashInFlowService.update(
      event.id,
      cash_in_flow_id,
      updateCashInFlowDto,
    );
  }

  @Delete(':cash_in_flow_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('event_id') event_id: string,
    @Param('cash_in_flow_id') cash_in_flow_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.cashInFlowService.remove(event.id, cash_in_flow_id);
  }
}
