import { Injectable } from '@nestjs/common';
import { ResourceDto } from './dto/resource.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Language } from '../language/entities/language.entity';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourcesService {

  constructor(private readonly em: EntityManager){}
  
  async create(languageId: number, dto: ResourceDto) {
    const language = await this.em.findOne(Language, {id: languageId});

    if(language){
      let resource = new Resource(dto.name, dto.type, dto.description, dto.access);
      resource.language = language;
      await this.em.persistAndFlush(resource);

      return {
        response: true,
        data: resource,
        message: 'Resource saved'
      }
    }
  }

  async findAll(languageId: number) {
    const resources = await this.em.find(Resource, {language: languageId});

    if(resources){
      return {
        response: true,
        data: resources,
        message: 'Resources loaded'
      }
    }
  }

  async findOne(id: number) {
    const resource = await this.em.findOne(Resource, {id: id});

    if(resource){
      return {
        response: true,
        data: resource,
        message: 'Resource loaded'
      }
    }
  }

  async update(id: number, dto: ResourceDto) {
    const resource = await this.em.findOne(Resource, {id: id});

    if(resource){
      resource.name = dto.name;
      resource.type = dto.type;
      resource.description = dto.description;
      resource.access = dto.access;
      await this.em.flush();

      return {
        response: true,
        data: resource,
        message: 'Resource updated.'
      }
    }
  }

  async remove(id: number) {
    const resource = await this.em.findOne(Resource, {id: id});

    if(resource){
      await this.em.removeAndFlush(resource);

      return {
        response: true,
        data: null,
        message: 'Resource removed'
      }
    }
  }
}
