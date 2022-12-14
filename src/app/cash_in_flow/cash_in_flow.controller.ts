import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventService } from '../event/event.service';
import { UserPermissionService } from '../user_permission/user_permission.service';
import { CashInFlowService } from './cash_in_flow.service';
import { CreateCashInFlowDto } from './dto/create-cash_in_flow.entity';
import { UpdateCashInFlowDto } from './dto/update-cash_in_flow.entity';

@Controller('/api/v1/events/:event_id/cash-in-flows')
@ApiTags('Entradas de Caixa')
export class CashInFlowController {
  constructor(
    private readonly cashInFlowService: CashInFlowService,
    private readonly eventService: EventService,
    private readonly userPermissionService: UserPermissionService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Entrada de Caixa' })
  @ApiResponse({ status: 201, description: 'Entrada de Caixa criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (description, amount, date)' })
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createCashInFlowDto: CreateCashInFlowDto,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, finance_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.cashInFlowService.create(event.id, createCashInFlowDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Entradas de Caixa' })
  @ApiResponse({ status: 200, description: 'Entradas de Caixa listadas com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findAll(
    @Param('event_id') event_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, finance_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.cashInFlowService.findAll(event.id);
  }

  @Get('total')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Total de Entradas de Caixa' })
  @ApiResponse({ status: 200, description: 'Total de Entradas de Caixa listado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findTotal(
    @Param('event_id') event_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, finance_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    const cashInFlows = await this.cashInFlowService.findAll(event.id);

    let total = 0;

    cashInFlows.forEach((cashInFlow) => {
      total += cashInFlow.amount;
    });

    return {
      total_cash_in: total,
    };
  }

  @Get(':cash_in_flow_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Entrada de Caixa' })
  @ApiResponse({ status: 200, description: 'Entrada de Caixa listada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Entrada de Caixa não encontrados' })
  async findOne(
    @Param('event_id') event_id: string,
    @Param('cash_in_flow_id') cash_in_flow_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, finance_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.cashInFlowService.findOne({
      where: { id: cash_in_flow_id, event_id: event.id },
    });
  }

  @Put(':cash_in_flow_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar Entrada de Caixa' })
  @ApiResponse({ status: 200, description: 'Entrada de Caixa editada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Entrada de Caixa não encontrados' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (description, amount, date)' })
  async update(
    @Param('event_id') event_id: string,
    @Param('cash_in_flow_id') cash_in_flow_id: string,
    @Req() req: any,
    @Body() updateCashInFlowDto: UpdateCashInFlowDto,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, finance_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
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
  @ApiOperation({ summary: 'Remover Entrada de Caixa' })
  @ApiResponse({ status: 204, description: 'Entrada de Caixa removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Entrada de Caixa não encontrados' })
  async remove(
    @Param('event_id') event_id: string,
    @Param('cash_in_flow_id') cash_in_flow_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, finance_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.cashInFlowService.remove(event.id, cash_in_flow_id);
  }
}
