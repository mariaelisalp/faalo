import { Module } from '@nestjs/common';
import { UserTokensService } from './user-tokens.service';
import { EmailTokenStrategy } from './strategy/email-token.strategy';
import { EmailModule } from 'src/modules/email/email.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserToken } from './entities/user-token.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { UserTokensController } from './user-tokens.controller';
import { UserService } from '../user/user.service';
import { PasswordResetStrategy } from './strategy/password-reset.strategy';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LanguageModule } from '../language/language.module';

@Module({
  providers: [UserTokensService, EmailTokenStrategy, PasswordResetStrategy, EntityRepository, UserService, JwtService, ConfigService],
  exports: [UserTokensService],
  imports: [EmailModule, MikroOrmModule.forFeature([UserToken]), LanguageModule],
  controllers: [UserTokensController]
})
export class UserTokensModule {}
