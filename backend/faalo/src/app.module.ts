import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmailModule } from './modules/email/email.module';
import { UserTokensModule } from './modules/user-tokens/user-tokens.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { LanguageModule } from './modules/language/language.module';
import { VocabularyService } from './modules/vocabulary/vocabulary.service';
import { VocabularyController } from './modules/vocabulary/vocabulary.controller';
import { TextModule } from './modules/text/text.module';
import defineConfig from '../mikro-orm.config';
import { ContentModule } from './modules/content/content.module';
import { ResourceModule } from './modules/resource/resource.module';
import { TopicModule } from './modules/topic/topic.module';
import { WordModule } from './modules/word/word.module';
import { VocabularyModule } from './modules/vocabulary/vocabulary.module';
import { TaskModule } from './modules/task/task.module';
import { ConnectionModule } from './modules/connection/connection.module';
import { ExampleModule } from './modules/example/example.module';
import { NoteModule } from './modules/note/note.module';
import { IsUniqueConstraint } from './validators/is-unique.validator';

@Module({
  imports: [UserModule, AuthModule, EmailModule, UserTokensModule, ConfigModule.forRoot({
    isGlobal: true,
  }), JwtModule.register({}), MikroOrmModule.forRoot(defineConfig), LanguageModule, TextModule, TopicModule, ResourceModule, 
  ContentModule, VocabularyModule, WordModule, NoteModule, ExampleModule, ConnectionModule, TaskModule], 
  controllers: [AppController,],
  providers: [AppService, IsUniqueConstraint],
  exports: [IsUniqueConstraint]
})
export class AppModule {}
