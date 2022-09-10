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
import { WikiService } from '../services/wiki.service';
import { CreateWikiDto } from '../dto/create-wiki.dto';
import { UpdateWikiDto } from '../dto/update-wiki.dto';

@Controller('wikis')
@ApiTags('wikis')
export class WikisController {
  constructor(private readonly wikiService: WikiService) {}

  @Post()
  create(@Body() createWikiDto: CreateWikiDto) {
    return this.wikiService.create(createWikiDto);
  }

  @Get()
  findAll() {
    return this.wikiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wikiService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWikiDto: UpdateWikiDto) {
    return this.wikiService.update(+id, updateWikiDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.wikiService.remove(+id);
  }

  @Get(':id/webhooks')
  findAllWebhooks(@Param('id') id: string) {
    return this.wikiService.findAllWebhooks(+id);
  }
}
