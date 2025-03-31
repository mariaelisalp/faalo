import { Injectable, NotFoundException } from '@nestjs/common';
import { TopicDto } from './dto/topic.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Language } from '../language/entities/language.entity';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(private em: EntityManager){}

  async create(languageId: number, dto: TopicDto) {
    const language = await this.em.findOne(Language, {id: languageId});
    
    if(language){
      const topic = new Topic(dto.name, dto.moduleType);
        topic.language = language;

      await this.em.persistAndFlush(topic);

      return{
        response: true,
        data: topic,
        message: 'Topic created successfully'
      }
    }
  }

  async findAll(languageId: number, moduleType: string) {
    const topics = await this.em.find(Topic, {language: languageId, moduleType: moduleType});

    if(topics){
      return {
        response: true,
        data: topics,
        message: 'Topics loaded.'
      }
    }
    else{
      throw new NotFoundException();
    }
  }

  async findOne(languageId: number, id: number) {
    const topic = await this.em.findOne(Topic, {language: languageId, id: id});

    if(topic){
      return {
        response: true,
        data: topic,
        message: 'Topic loaded'
      }
    }
    else{
      throw new NotFoundException({
        response: false,
        data: null,
        message: 'This Topic does not exist.'
      });
    }
  }

  async update(languageId: number, id: number, name) {
    console.log('nome', name);
    const topic = await this.em.findOne(Topic, {language: languageId, id: id});

    if(topic){
      topic.name = name.name;
      await this.em.flush()

      return {
        response: true,
        data: topic,
        message: 'Topic updated.'
      }
    }
    else{
      throw new NotFoundException({
        response: false,
        data: null,
        message: 'This Topic does not exist.'
      });
    }
  }

  async remove(languageId: number, id: number) {
    const topic = await this.em.findOne(Topic, {language: languageId, id: id});

    if(topic){
      await this.em.removeAndFlush(topic);
    }
    else{
      throw new NotFoundException({
        response: false,
        data: null,
        message: 'This Topic does not exist.'
      });
    }
  }
}
