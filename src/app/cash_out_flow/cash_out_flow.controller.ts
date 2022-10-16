import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from '../event/event.service';
import { CashOutFlowService } from './cash_out_flow.service';
import { CreateCashOutFlowDto } from './dto/create-cash_out_flow.entity';
import { UpdateCashOutFlowDto } from './dto/update-cash_out_flow.entity';

@Controller('/api/v1/events/:event_id/cash-out-flows')
export class CashOutFlowController {
  constructor(
    private readonly cashOutFlowService: CashOutFlowService,
    private readonly eventService: EventService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createCashOutFlowDto: CreateCashOutFlowDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.cashOutFlowService.create(event.id, createCashOutFlowDto);
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
    return await this.cashOutFlowService.findAll(event.id);
  }

  @Get(':cash_out_flow_id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @Param('event_id') event_id: string,
    @Param('cash_out_flow_id') cash_out_flow_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.cashOutFlowService.findOne({
      where: { id: cash_out_flow_id, event_id: event.id },
    });
  }

  @Put(':cash_out_flow_id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('event_id') event_id: string,
    @Param('cash_out_flow_id') cash_out_flow_id: string,
    @Req() req: any,
    @Body() updateCashOutFlowDto: UpdateCashOutFlowDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.cashOutFlowService.update(
      event.id,
      cash_out_flow_id,
      updateCashOutFlowDto,
    );
  }

  @Delete(':cash_out_flow_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('event_id') event_id: string,
    @Param('cash_out_flow_id') cash_out_flow_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.cashOutFlowService.remove(event.id, cash_out_flow_id);
  }
}
