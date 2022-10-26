import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, forwardRef, UseGuards, Req, Put } from '@nestjs/common';
import { PublicBriefingService } from './public_briefing.service';
import { CreatePublicBriefingDto } from './dto/create-public_briefing.dto';
import { UpdatePublicBriefingDto } from './dto/update-public_briefing.dto';
import { EventModule } from '../event/event.module';
import { EventService } from '../event/event.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/events/:event_id/public-briefing')
@ApiTags('Public Briefing')
export class PublicBriefingController {
  constructor(
    private readonly publicBriefingService: PublicBriefingService,
    @Inject(forwardRef(() => EventService))
    private readonly eventService: EventService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar Briefing de Público' })
  @ApiResponse({ status: 200, description: 'Briefing de Público listado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async findOne(@Param('event_id') event_id: string, @Req() req: any) {
    const event = await this.eventService.findOneBelong({
      relations: ["briefing.public_briefing"],
      where: { id: event_id, owner_id: req.user.id },
    });
    return event.briefing.public_briefing;
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Editar Briefing de Público' })
  @ApiResponse({ status: 200, description: 'Briefing de Público editado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  async update(
    @Param('event_id') event_id: string,
    @Body() updatePublicBriefingDto: UpdatePublicBriefingDto,
    @Req() req: any,
  ) {
    const event = await this.eventService.findOneBelong({
      relations: ["briefing.public_briefing"],
      where: { id: event_id, owner_id: req.user.id },
    });
    return this.publicBriefingService.update(
      event.briefing.public_briefing_id,
      updatePublicBriefingDto,
    );
  }
}
