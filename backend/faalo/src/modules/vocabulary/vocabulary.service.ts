import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { VocabularyDto } from './dto/vocabulary.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Language } from '../language/entities/language.entity';
import { Vocabulary } from './entities/vocabulary.entity';
import { Topic } from '../topic/entities/topic.entity';
import { ModuleType } from 'src/enums/module-types.enum';
import 'multer';
import { Word } from '../word/entities/word.entity';

@Injectable()
export class VocabularyService {

    constructor(private readonly em: EntityManager) { }

    async create(languageId: number, dto: VocabularyDto, topicId?: number, image?: Express.Multer.File) {

        const language = await this.em.findOne(Language, { id: languageId });
        const topic = await this.em.findOne(Topic, { id: topicId });

        if (language) {

            const vocabulary = new Vocabulary(dto.name, image?.path || '');
            vocabulary.language = language;

            if (topic) {
                if (topic.moduleType != ModuleType.VOCABULARY) {
                    throw new UnprocessableEntityException();
                }

                vocabulary.topic = topic;
            }

            await this.em.persistAndFlush(vocabulary);

            return vocabulary;
        }

        throw new NotFoundException();
    }

    async findAll(languageId: number, topicId?: number) {
        let vocabularies;
        const topic = await this.em.findOne(Topic, { id: topicId, moduleType: ModuleType.VOCABULARY });

        if (topicId) {
            vocabularies = await this.em.find(Vocabulary, { language: languageId, topic: topic })
        }
        else {
            vocabularies = await this.em.find(Vocabulary, { language: languageId });
        }

        if (vocabularies.length > 0) {
            return vocabularies;
        }

        throw new NotFoundException();

    }

    async findOne(id: number) {
        const vocabulary = await this.em.findOne(Vocabulary, { id: id });

        if (vocabulary) {
            return vocabulary;
        }

        throw new NotFoundException();
    }

    async update(id: number, dto: VocabularyDto) {
        const vocabulary = await this.em.findOne(Vocabulary, { id: id });

        if (vocabulary) {
            vocabulary.name = dto.name;
            //vocabulary.image = dto.image;
            await this.em.flush();

            return vocabulary;
        }

        throw new NotFoundException();
    }

    async remove(id: number) {
        const vocabulary = await this.em.findOne(Vocabulary, { id: id }, { populate: ['words'] });


        if (!vocabulary) {
            throw new NotFoundException();
        }

        await this.em.transactional(async em => {

            await em.nativeDelete(Word, {
                vocabulary: vocabulary.id
            });

            return await em.removeAndFlush(vocabulary);
        });
    }
}
