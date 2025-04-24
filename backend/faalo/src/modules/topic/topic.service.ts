import { Injectable, NotFoundException } from '@nestjs/common';
import { TopicDto } from './dto/topic.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Language } from '../language/entities/language.entity';
import { Topic } from './entities/topic.entity';
import { ModuleType } from 'src/enums/module-types.enum';

@Injectable()
export class TopicsService {
  constructor(private em: EntityManager){}

  async create(languageId: number, dto: TopicDto, parentId?: number) {
    const language = await this.em.findOne(Language, {id: languageId});
    
    if(language){
      const topic = new Topic(dto.name, dto.moduleType);
        topic.language = language;

        if(parentId){
          const parent = await this.em.findOne(Topic, {id: parentId});

          if(parent){
            topic.parent = parent;
          }
        }

      await this.em.persistAndFlush(topic);

      return topic;
    }

    throw new NotFoundException();
  }

  async findAll(languageId: number, moduleType: ModuleType, parentId?: number) {
    let topics;
    
    if(parentId){
      topics = await this.em.find(Topic, {language:languageId, moduleType: moduleType, parent: parentId});
    }
    else{
      topics = await this.em.find(Topic, {language: languageId, moduleType: moduleType});
    }
   
    if(topics.length > 0){
      return topics;
    }
    
    throw new NotFoundException();
  }

  async findOne(languageId: number, id: number) {
    const topic = await this.em.findOne(Topic, {language: languageId, id: id});

    if(topic){
      return topic;
    }
    
    throw new NotFoundException();
  }

  async update(languageId: number, id: number, name) {
    console.log('nome', name);
    const topic = await this.em.findOne(Topic, {language: languageId, id: id});

    if(topic){
      topic.name = name.name;
      await this.em.flush()

      return topic
    }
    
    throw new NotFoundException();
  }

  async remove(languageId: number, id: number) {
    const topic = await this.em.findOne(Topic, {language: languageId, id: id});

    if(topic){
      await this.em.removeAndFlush(topic);
    }
    
    throw new NotFoundException()
  }
  
}
