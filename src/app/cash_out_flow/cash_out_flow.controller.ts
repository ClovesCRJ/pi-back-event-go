import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventService } from '../event/event.service';
import { UserPermissionService } from '../user_permission/user_permission.service';
import { CashOutFlowService } from './cash_out_flow.service';
import { CreateCashOutFlowDto } from './dto/create-cash_out_flow.entity';
import { UpdateCashOutFlowDto } from './dto/update-cash_out_flow.entity';

@Controller('/api/v1/events/:event_id/cash-out-flows')
@ApiTags('Saídas de Caixa')
export class CashOutFlowController {
  constructor(
    private readonly cashOutFlowService: CashOutFlowService,
    private readonly eventService: EventService,
    private readonly userPermissionService: UserPermissionService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Saída de Caixa' })
  @ApiResponse({ status: 201, description: 'Saída de Caixa criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (description, amount, date)' })
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createCashOutFlowDto: CreateCashOutFlowDto,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, finance_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
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
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, finance_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
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
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, finance_read: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
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
  @ApiResponse({ status: 400, description: 'Atributos inválidos (description, amount, date)' })
  async update(
    @Param('event_id') event_id: string,
    @Param('cash_out_flow_id') cash_out_flow_id: string,
    @Req() req: any,
    @Body() updateCashOutFlowDto: UpdateCashOutFlowDto,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, finance_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
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
  @ApiResponse({ status: 204, description: 'Saída de Caixa removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Saída de Caixa não encontrados' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('event_id') event_id: string,
    @Param('cash_out_flow_id') cash_out_flow_id: string,
    @Req() req: any,
  ) {
    const permission = await this.userPermissionService.findOne({
      where: { event_id, user_id: req.user.id, finance_write: true }
    });
    const event = await this.eventService.findOneBelong({
      where: { id: permission.event_id },
    });
    return await this.cashOutFlowService.remove(event.id, cash_out_flow_id);
  }
}
