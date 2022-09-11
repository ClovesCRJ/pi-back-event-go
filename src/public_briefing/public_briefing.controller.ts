import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicBriefingService } from './public_briefing.service';
import { CreatePublicBriefingDto } from './dto/create-public_briefing.dto';
import { UpdatePublicBriefingDto } from './dto/update-public_briefing.dto';

@Controller('public-briefing')
export class PublicBriefingController {
  constructor(private readonly publicBriefingService: PublicBriefingService) {}

  @Post()
  create(@Body() createPublicBriefingDto: CreatePublicBriefingDto) {
    return this.publicBriefingService.create(createPublicBriefingDto);
  }

  @Get()
  findAll() {
    return this.publicBriefingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicBriefingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicBriefingDto: UpdatePublicBriefingDto) {
    return this.publicBriefingService.update(+id, updatePublicBriefingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicBriefingService.remove(+id);
  }
}
