import { Injectable } from '@nestjs/common';
import { TextDto } from './dto/text.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Language } from '../language/entities/language.entity';
import { Text } from "../text/entities/text.entity";

@Injectable()
export class TextService {
  constructor(private em: EntityManager){}

  async create(languageId: number, dto: TextDto) {
    const language = await this.em.findOne(Language, {id: languageId});

    if(language){
      const text = new Text(dto.title, dto.content);
      text.language = language;

      await this.em.persistAndFlush(text);

      return{
        response: true,
        data: text,
        message: 'Text created successfully'
      }
    }
    
  }

  async findAll(languageId: number) {
    const texts = await this.em.find(Text, {language: languageId});

    if(texts){
      return {
        response: true,
        data: texts,
        message: 'Texts loaded.'
      }
    }
  }

  async findOne(id: number) {
    const text = await this.em.findOne(Text, {id: id});

    if(text){
      return{
        response: true,
        data: text,
        message: 'Text loaded'
      }
    }
  }

  async update(id: number, dto: TextDto) {
    console.log(id);
    const text = await this.em.findOne(Text, {id: id});

    if(text){
      console.log(text);
      text.title = dto.title;
      text.content = dto.content;
      await this.em.flush();

      console.log('pós update:', text);
      return{
        response: true,
        data: text,
        message: 'Text updated'
      }

    }

    
  }

  async remove(id: number) {
    const text =  await this.em.findOne(Text, {id:id});

    if(text){
      this.em.removeAndFlush(text);
    }
  }
}
