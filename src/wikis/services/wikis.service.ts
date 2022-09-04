import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateWikiDto } from '../dto/create-wiki.dto';
import { UpdateWikiDto } from '../dto/update-wiki.dto';
import { Wiki } from '../entities/wiki.entity';
import { Webhook } from '../entities/webhook.entity';

@Injectable()
export class WikisService {
  constructor(
    @InjectRepository(Wiki)
    private readonly wikisRepository: Repository<Wiki>,

    @InjectRepository(Webhook)
    private readonly webhooksRepository: Repository<Webhook>,
  ) {}

  async create(createWikiDto: CreateWikiDto) {
    try {
      const wiki = await this.wikisRepository.save(createWikiDto);
      return wiki;
    } catch (err) {
      if (
        err.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new UnprocessableEntityException(
          `Wiki with interwiki ${createWikiDto.interwiki} already exists`,
        );
      }

      throw err;
    }
  }

  findAll() {
    return this.wikisRepository.find();
  }

  async findOne(id: number) {
    try {
      const wiki = await this.wikisRepository.findOneByOrFail({ id });
      return wiki;
    } catch (err) {
      if (err.name === 'EntityNotFoundError') {
        throw new NotFoundException(`Wiki with id ${id} not found`);
      }
      throw err;
    }
  }

  update(id: number, updateWikiDto: UpdateWikiDto) {
    return `This action updates a #${id} wiki`;
  }

  async remove(id: number) {
    const wiki = await this.findOne(id);
    await this.wikisRepository.remove(wiki);
  }

  findAllWebhooks(id: number) {
    return this.webhooksRepository.findBy({ wikiId: id });
  }
}
