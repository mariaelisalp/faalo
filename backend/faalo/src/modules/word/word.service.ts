import { Injectable, NotFoundException } from '@nestjs/common';
import { WordDto } from './dto/word.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Vocabulary } from '../vocabulary/entities/vocabulary.entity';
import { Word } from './entities/word.entity';

@Injectable()
export class WordService {

  constructor(private readonly em: EntityManager){}

  async create(vocabularyId: number, dto: WordDto) {
    const vocabulary = await this.em.findOne(Vocabulary, {id: vocabularyId});

    if(vocabulary){
      const word = new Word(dto.word, dto.translation, dto.definition);
      word.vocabulary = vocabulary;
      await this.em.persistAndFlush(word);

      return word;
    }

    throw new NotFoundException();
  }

  async findAll(vocabularyId: number) {
    const words = await this.em.find(Word, {vocabulary: vocabularyId});

    if(words.length > 0){
      return words;
    }

    throw new NotFoundException();
  }

  async findOne(id: number) {
    const word = await this.em.findOne(Word, {id: id});

    if(word){
      return word;
    }

    throw new NotFoundException();
  }

  async update(id: number, dto: WordDto) {
    const word = await this.em.findOne(Word, {id: id});

    if(word){
      word.word = dto.word;
      word.translation = dto.translation;
      word.definition = dto.definition;

      await this.em.flush();

      return word;
    }

    throw new NotFoundException();
  }

  async remove(id: number) {
    const word = await this.em.findOne(Word, {id: id});

    if(word){
      this.em.removeAndFlush(word);
    }

    throw new NotFoundException();
  }
}
