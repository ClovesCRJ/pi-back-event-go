import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventService } from '../event/event.service';
import { CashOutFlowService } from './cash_out_flow.service';
import { CreateCashOutFlowDto } from './dto/create-cash_out_flow.entity';
import { UpdateCashOutFlowDto } from './dto/update-cash_out_flow.entity';

@Controller('/api/v1/events/:event_id/cash-out-flows')
@ApiTags('CashOut Flow')
export class CashOutFlowController {
  constructor(
    private readonly cashOutFlowService: CashOutFlowService,
    private readonly eventService: EventService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Saída de Caixa' })
  @ApiResponse({ status: 200, description: 'Saída de Caixa criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
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
  @ApiOperation({ summary: 'Listar Saídas de Caixa' })
  @ApiResponse({ status: 200, description: 'Saídas de Caixa listadas com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
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
  @ApiOperation({ summary: 'Listar Saída de Caixa' })
  @ApiResponse({ status: 200, description: 'Saída de Caixa listada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Saída de Caixa não encontrados' })
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
  @ApiOperation({ summary: 'Editar Saída de Caixa' })
  @ApiResponse({ status: 200, description: 'Saída de Caixa editada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Saída de Caixa não encontrados' })
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
  @ApiOperation({ summary: 'Remover Saída de Caixa' })
  @ApiResponse({ status: 200, description: 'Saída de Caixa removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Saída de Caixa não encontrados' })
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
