import { Injectable, NotFoundException } from '@nestjs/common';
import { TopicDto } from './dto/topic.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Language } from '../language/entities/language.entity';
import { Topic } from './entities/topic.entity';
import { ModuleType } from 'src/enums/module-types.enum';
import { ContentService } from '../content/content.service';
import { VocabularyService } from '../vocabulary/vocabulary.service';
import { ResourcesService } from '../resource/resource.service';
import { TextService } from '../text/text.service';
import { Content } from '../content/entities/content.entity';
import { Resource } from '../resource/entities/resource.entity';
import { Vocabulary } from '../vocabulary/entities/vocabulary.entity';
import { Text } from '../text/entities/text.entity';

@Injectable()
export class TopicsService {
  constructor(private em: EntityManager) { }

  async create(languageId: number, dto: TopicDto, parentId?: number) {
    const language = await this.em.findOne(Language, { id: languageId });

    if (language) {
      const topic = new Topic(dto.name, dto.moduleType);
      topic.language = language;

      if (parentId) {
        const parent = await this.em.findOne(Topic, { id: parentId });

        if (parent) {
          topic.parent = parent;
        }
      }

      await this.em.persistAndFlush(topic);

      return topic;
    }

    throw new NotFoundException();
  }

  async findAll(languageId: number, moduleType: ModuleType) {
    const topics = await this.em.find(Topic, { language: languageId, moduleType: moduleType });

    if (topics.length > 0) {
      return topics;
    }

    throw new NotFoundException();
  }

  async findMany(languageId: number, moduleType: ModuleType, parentId?: number) {
    let topics;

    if (parentId) {
      topics = await this.em.find(Topic, { language: languageId, moduleType: moduleType, parent: parentId });
    }
    else {
      topics = await this.em.find(Topic, { language: languageId, moduleType: moduleType, parent: null });
    }

    if (topics.length > 0) {
      return topics;
    }

    throw new NotFoundException();
  }

  async findOne(languageId: number, id: number, moduleType: ModuleType) {
    const topic = await this.em.findOne(Topic, { language: languageId, id: id, moduleType: moduleType });

    if (topic) {
      return topic;
    }

    throw new NotFoundException();
  }

  async update(languageId: number, id: number, name) {

    const topic = await this.em.findOne(Topic, { language: languageId, id: id });

    if (topic) {
      topic.name = name.name;
      await this.em.flush()

      return topic
    }

    throw new NotFoundException();
  }

  async remove(languageId: number, id: number) {
    const topic = await this.em.findOne(Topic, { language: languageId, id: id });

    if (!topic) {
      throw new NotFoundException();
    }

    const children = await this.em.find(Topic, {parent: topic});

    let modules;

    switch (topic.moduleType) {
      case ModuleType.CONTENT:
        modules = await this.em.find(Content, { topic: topic });
        break;

      case ModuleType.RESOURCE:
        modules = await this.em.find(Resource, { topic: topic });
        break;

      case ModuleType.VOCABULARY:
        modules = await this.em.find(Vocabulary, { topic: topic });
        break;

      case ModuleType.TEXT:
        modules = await this.em.find(Text, { topic: topic });
        break;
    }

    if (modules) {
      await this.em.transactional(async em => {

        await em.nativeDelete(topic.moduleType, {
          topic: topic.id
        });

        children.forEach(async child => {
          child.parent = topic.parent;
          await this.em.flush();
        });

        return await em.removeAndFlush(topic);
      });
    }

    return await this.em.removeAndFlush(topic);
  }

}
