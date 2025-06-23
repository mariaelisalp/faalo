import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { LanguageDto } from './dto/language.dto';
import { Language } from './entities/language.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '../user/entities/user.entity';
import { VocabularyService } from '../vocabulary/vocabulary.service';
import { TopicsService } from '../topic/topic.service';
import { ContentService } from '../content/content.service';
import { ResourcesService } from '../resource/resource.service';

@Injectable()
export class LanguageService {

    constructor(private em: EntityManager, private vocabulary: VocabularyService,
        private topic: TopicsService, private content: ContentService, private resource: ResourcesService) { }

    async create(userId: number, dto: LanguageDto) {

        const user = await this.em.findOne(User, userId);
        if (!user) {
            throw new NotFoundException();
        }

        const language = new Language(dto.name, new Date());
        language.user = user;

        await this.em.persistAndFlush(language);

        return language;
    }

    async findOne(userId: number, languageId: number) {
        const language = await this.em.findOne(Language, { id: languageId });

        if (language) {
            if (language.user.id != userId) {
                throw new ForbiddenException();
            }

            return language;
        }

        throw new NotFoundException();

    }

    async update(userId: number, languageId: number, dto: LanguageDto) {
        const language = await this.em.findOne(Language, { id: languageId });

        if (!language) {
            throw new NotFoundException()
        }

        if (language.user.id != userId) {
            throw new ForbiddenException();
        }

        language.name = dto.name;

        await this.em.flush();

        return language;
    }

    async findMany(userId: number) {
        const languages = await this.em.find(Language, { user: userId });

        if (languages.length > 0) {
            return languages;
        }

        throw new NotFoundException('No languages found');
    }

    async delete(userId: number, languageId: number) {
        const language = await this.em.findOne(Language, { id: languageId }, { populate: ['contents', 'resources', 'vocabularies', 'texts', 'topics'] });

        if (language == null) {
            throw new NotFoundException();

        }

        if (language?.user.id == userId) {

            await this.deleteChildren(languageId, language.contents, language.resources, language.vocabularies, language.texts, language.topics);

            return await this.em.removeAndFlush(language);
        }
        else {
            throw new ForbiddenException();
        }

    }

    async deleteChildren(languageId, contents, resources, vocabularies, texts, topics) {

        await this.em.transactional(async em => {

            for (const content of contents) {
                await this.content.remove(content.id);
            }

            for (const resource of resources) {
                await this.resource.remove(resource.id);
            }

            for (const vocabulary of vocabularies) {
                await this.vocabulary.remove(vocabulary.id);
            }

            for (const topic of topics) {
                await this.topic.remove(languageId, topic.id);
            }

        });
    }
}
