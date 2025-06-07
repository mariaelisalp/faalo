import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { LanguageService } from '../language/language.service';
import { VocabularyService } from '../vocabulary/vocabulary.service';
import { ContentService } from '../content/content.service';
import { ResourcesService } from '../resource/resource.service';
import { TopicsService } from '../topic/topic.service';

@Module({
  imports: [MikroOrmModule.forFeature([User]), UserModule],
  providers: [UserService, LanguageService, VocabularyService, ContentService, ResourcesService, TopicsService],
  controllers: [UserController],
})
export class UserModule {}
