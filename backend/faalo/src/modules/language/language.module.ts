import { Module } from '@nestjs/common';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { UserResourceGuard } from '../auth/guards/user-resource.guard';
import { VocabularyService } from '../vocabulary/vocabulary.service';
import { ContentService } from '../content/content.service';
import { ResourcesService } from '../resource/resource.service';
import { TopicsService } from '../topic/topic.service';

@Module({
  exports: [LanguageService],
  controllers: [LanguageController],
  providers: [LanguageService, UserResourceGuard, VocabularyService, ContentService, ResourcesService, TopicsService]
})
export class LanguageModule {}
