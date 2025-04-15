import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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

      return{
        response: true,
        data: content,
        message: 'content created successfully'
      }
    }
    
  }

  async findAll(languageId: number, topicId?: number) {
    const topic = await this.em.findOne(Topic, {id: topicId, moduleType: ModuleType.CONTENT});
    const contents = await this.em.find(Content, {language: languageId, topic: topic});

    if(contents){
      return {
        response: true,
        data: contents,
        message: 'contents loaded.'
      }
    }
  }

  async findOne(id: number) {
    const content = await this.em.findOne(Content, {id: id});

    if(content){
      return{
        response: true,
        data: content,
        message: 'content loaded'
      }
    }
  }

  async update(id: number, dto: ContentDto) {
    console.log(id);
    const content = await this.em.findOne(Content, {id: id});

    if(content){
      content.title = dto.title;
      content.content = dto.content;
      await this.em.flush();

      return{
        response: true,
        data: content,
        message: 'content updated'
      }

    }
    
  }

  async remove(id: number) {
    const content =  await this.em.findOne(Content, {id:id});

    if(content){
      this.em.removeAndFlush(content);
    }
  }
}
