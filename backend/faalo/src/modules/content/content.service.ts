import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Language } from '../language/entities/language.entity';
import { Content } from "../content/entities/content.entity";
import { ContentDto } from './dto/content.dto';
import { Topic } from '../topic/entities/topic.entity';
import { ModuleType } from 'src/enums/module-types.enum';

@Injectable()
export class ContentService {
  constructor(private em: EntityManager){}

  async create(languageId: number, dto: ContentDto, topicId?: number) {

    const language = await this.em.findOne(Language, {id: languageId});
    const topic = await this.em.findOne(Topic, {id: topicId});

    if(language){

      const content = new Content(dto.title, dto.content);
      content.language = language;

      if(topic){
      
        if(topic.moduleType != ModuleType.CONTENT){
          throw new UnprocessableEntityException();
        } 

        content.topic = topic;
      }

      await this.em.persistAndFlush(content);

      return content;
    }
    
  }

  async findAll(languageId: number, topicId?: number) {
    const topic = await this.em.findOne(Topic, {id: topicId, moduleType: ModuleType.CONTENT});
    const contents = await this.em.find(Content, {language: languageId, topic: topic});

    if(contents.length > 0){
      return contents;
    }

    throw new NotFoundException();
  }

  async findOne(id: number) {
    const content = await this.em.findOne(Content, {id: id});

    if(content != null){
      return content;
    }

    throw new NotFoundException();
  }

  async update(id: number, dto: ContentDto) {
    console.log(id);
    const content = await this.em.findOne(Content, {id: id});

    if(content != null){
      content.title = dto.title;
      content.content = dto.content;
      await this.em.flush();

      return content;

    }

    throw new NotFoundException();
    
  }

  async remove(id: number) {
    const content =  await this.em.findOne(Content, {id:id});

    if(content != null){
      this.em.removeAndFlush(content);
    }

    throw new NotFoundException();
  }
}
