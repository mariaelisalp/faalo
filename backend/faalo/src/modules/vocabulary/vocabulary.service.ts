import { Injectable } from '@nestjs/common';
import { VocabularyDto } from './dto/vocabulary.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Language } from '../language/entities/language.entity';
import { Vocabulary } from './entities/vocabulary.entity';

@Injectable()
export class VocabularyService {

    constructor(private readonly em: EntityManager){}

    async create(languageId: number, dto: VocabularyDto){
        const language = await this.em.findOne(Language, {id: languageId});

        if(language){
            const vocabulary = new Vocabulary(dto.name, dto.image);
            vocabulary.language = language;
            await this.em.persistAndFlush(vocabulary);

            return {
                reponse: true,
                data: vocabulary,
                message: 'Vocabulary created successfully'
            };
        }
    }

    async findAll(languageId: number){
        const vocabularies = await this.em.find(Vocabulary, {language: languageId})

        if(vocabularies){
            return {
                response: true,
                data: vocabularies,
                message: 'Vocabularies loaded'
            };
        }
    }

    async findOne(id: number){
        const vocabulary = await this.em.findOne(Vocabulary, {id: id});

        if(vocabulary){
            return {
                response: true,
                data: vocabulary,
                message: 'Vocabulary loaded'
            };
        }
    }

    async update(id: number, dto: VocabularyDto){
        const vocabulary = await this.em.findOne(Vocabulary, {id: id});

        if(vocabulary){
            vocabulary.name = dto.name;
            vocabulary.image = dto.image;
            await this.em.flush();

            return{
                response: true,
                data: vocabulary,
                message: 'Vocabulary updated'
            };
        }
    }

    async remove(id: number){
        const vocabulary = await this.em.findOne(Vocabulary, {id: id});

        if(vocabulary){
            this.em.removeAndFlush(vocabulary);
        }
    }
}
