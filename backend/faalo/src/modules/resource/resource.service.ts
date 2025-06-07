import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ResourceDto } from './dto/resource.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Language } from '../language/entities/language.entity';
import { Resource } from './entities/resource.entity';
import { Topic } from '../topic/entities/topic.entity';
import { ModuleType } from 'src/enums/module-types.enum';
import 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';

@Injectable()
export class ResourcesService {

  constructor(private readonly em: EntityManager) { }

  async create(languageId: number, dto: ResourceDto, topicId?: number, file?: Express.Multer.File) {

    const language = await this.em.findOne(Language, { id: languageId });
    const topic = await this.em.findOne(Topic, { id: topicId });

    if (language) {

      if (file != undefined) {
        dto.access = file.filename;

      }

      let resource = new Resource(dto.name, dto.type, dto.description, dto.access, file?.originalname);

      resource.language = language;

      if (topic) {

        if (topic.moduleType != ModuleType.RESOURCE) {
          throw new UnprocessableEntityException();
        }

        resource.topic = topic;
      }

      await this.em.persistAndFlush(resource);

      return resource;
    }

    throw new NotFoundException();
  }

  async findAll(languageId: number) {

    const resources = await this.em.find(Resource, { language: languageId });

    if (resources.length > 0) {
      return resources;
    }

    throw new NotFoundException();
  }

  async findMany(languageId: number, topicId?: number) {
    const topic = await this.em.findOne(Topic, { id: topicId, moduleType: ModuleType.RESOURCE });

    const resources = await this.em.find(Resource, { language: languageId, topic: topic });

    if (resources.length > 0) {
      return resources;
    }

    throw new NotFoundException();
  }

  async findOne(id: number) {
    const resource = await this.em.findOne(Resource, { id: id });

    if (resource != null) {
      return resource;
    }

    throw new NotFoundException()
  }

  async getFile(languageId: number, id: number, res: Response) {

    const resource = await this.em.findOne(Resource, { language: languageId, id: id });
    console.log('recurso:', resource)
    let filePath: string;

    if (!resource || !resource.access) {
      throw new NotFoundException('File not found');
    }

    else {
      filePath = path.join(process.cwd(), '/uploads/resources', resource.access);
      console.log('path:', filePath, fs.existsSync(filePath))

      if (!fs.existsSync(filePath)) {
        throw new NotFoundException('File path not found');
      }

      const contentType = this.getContentType(filePath);
      res.setHeader('Content-Type', contentType);
      res.sendFile(filePath);
    }

  }

  private getContentType(filePath: string): string {

    const extension = path.extname(filePath).toLowerCase();

    switch (extension) {
      case '.pdf': return 'application/pdf';
      case '.jpg': case '.jpeg': return 'image/jpeg';
      case '.png': return 'image/png';
      case '.txt': return 'text/plain';
      default: return 'application/octet-stream';
    }
  }

  async update(id: number, dto: ResourceDto, file?: Express.Multer.File, topicId?: number) {
    let topic;

    if (topicId) {

      topic = await this.em.findOne(Topic, { id: topicId, moduleType: ModuleType.RESOURCE });

    }
    const resource = await this.em.findOne(Resource, { id: id });

    if (resource != null) {
      resource.name = dto.name;
      resource.type = dto.type;
      resource.description = dto.description;
      resource.access = dto.access;
      resource.topic = topic;

      if (file) {
        resource.access = file.path;
      }

      await this.em.flush();

      return resource;
    }

    throw new NotFoundException()
  }

  async remove(id: number) {
    const resource = await this.em.findOne(Resource, { id: id });

    if (resource == null) {
      throw new NotFoundException()
    }

    return await this.em.removeAndFlush(resource);
  }

}
