import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { TextDto } from './dto/text.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Language } from '../language/entities/language.entity';
import { Text } from "../text/entities/text.entity";
import { Topic } from '../topic/entities/topic.entity';
import { ModuleType } from 'src/enums/module-types.enum';

@Injectable()
export class TextService {
  constructor(private em: EntityManager){}

  async create(languageId: number, dto: TextDto, topicId?: number) {
    
    const language = await this.em.findOne(Language, {id: languageId});
    const topic = await this.em.findOne(Topic, {id: topicId});

    if(language){
      
      const text = new Text(dto.title, dto.content);
      text.language = language;

      if(topic){

        if(topic.moduleType != ModuleType.TEXT){
          throw new UnprocessableEntityException();
        }
        
        text.topic = topic;
      }

      await this.em.persistAndFlush(text);

      return text;
    }

    throw new NotFoundException();
    
  }

  async findAll(languageId: number, topicId?: number) {
    const topic = await this.em.findOne(Topic, {id: topicId, moduleType: ModuleType.TEXT});
    const texts = await this.em.find(Text, {language: languageId, topic: topic});
    
    if(texts.length > 0){
      return texts;
    }

    throw new NotFoundException();
  }

  async findOne(id: number) {
    const text = await this.em.findOne(Text, {id: id});

    if(text){
      return text;
    }

    throw new NotFoundException();
  }

  async update(id: number, dto: TextDto) {

    const text = await this.em.findOne(Text, {id: id});

    if(text){

      text.title = dto.title;
      text.content = dto.content;
      await this.em.flush();

      return text;

    }

    throw new NotFoundException();
  }

  async remove(id: number) {
    const text =  await this.em.findOne(Text, {id:id});

    if(text){
      this.em.removeAndFlush(text);
    }

    throw new NotFoundException();
  }
}
