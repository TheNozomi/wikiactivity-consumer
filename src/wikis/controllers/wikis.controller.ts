import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WikisService } from '../services/wikis.service';
import { CreateWikiDto } from '../dto/create-wiki.dto';
import { UpdateWikiDto } from '../dto/update-wiki.dto';

@Controller('wikis')
@ApiTags('wikis')
export class WikisController {
  constructor(private readonly wikisService: WikisService) {}

  @Post()
  create(@Body() createWikiDto: CreateWikiDto) {
    return this.wikisService.create(createWikiDto);
  }

  @Get()
  findAll() {
    return this.wikisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wikisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWikiDto: UpdateWikiDto) {
    return this.wikisService.update(+id, updateWikiDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.wikisService.remove(+id);
  }

  @Get(':id/webhooks')
  findAllWebhooks(@Param('id') id: string) {
    return this.wikisService.findAllWebhooks(+id);
  }
}
