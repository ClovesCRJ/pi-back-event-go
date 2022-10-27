import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventService } from '../event/event.service';
import { AnnotationService } from './annotation.service';
import { CreateAnnotationDto } from './dto/create-annotation.dto';
import { UpdateAnnotationDto } from './dto/update-annotation.dto';

@Controller('/api/v1/events/:event_id/annotations')
@ApiTags('Anotações')
export class AnnotationController {
  constructor(
    private readonly annotationService: AnnotationService,
    private readonly eventService: EventService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar Anotação' })
  @ApiResponse({ status: 201, description: 'Anotação criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (text)' })
  async create(
    @Param('event_id') event_id: string,
    @Req() req: any,
    @Body() createAnnotationDto: CreateAnnotationDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.annotationService.create(event.id, createAnnotationDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Anotações' })
  @ApiResponse({ status: 200, description: 'Anotações listadas com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findAll(
    @Param('event_id') event_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.annotationService.findAll(event.id);
  }

  @Get(':annotation_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Anotação' })
  @ApiResponse({ status: 200, description: 'Anotação listada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Anotação não encontrados' })
  async findOne(
    @Param('event_id') event_id: string,
    @Param('annotation_id') annotation_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.annotationService.findOne({
      where: { id: annotation_id, event_id: event.id },
    });
  }

  @Put(':annotation_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar Anotação' })
  @ApiResponse({ status: 200, description: 'Anotação editada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Anotação não encontrados' })
  @ApiResponse({ status: 400, description: 'Atributos inválidos (text)' })
  async update(
    @Param('event_id') event_id: string,
    @Param('annotation_id') annotation_id: string,
    @Req() req: any,
    @Body() updateAnnotationDto: UpdateAnnotationDto,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.annotationService.update(
      event.id,
      annotation_id,
      updateAnnotationDto,
    );
  }

  @Delete(':annotation_id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover Anotação' })
  @ApiResponse({ status: 204, description: 'Anotação removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento ou Anotação não encontrados' })
  async remove(
    @Param('event_id') event_id: string,
    @Param('annotation_id') annotation_id: string,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      where: { id: event_id, owner_id: req.user.id },
    });
    return await this.annotationService.remove(event.id, annotation_id);
  }
}
