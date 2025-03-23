import { Module } from '@nestjs/common';
import { UserTokensService } from './user-tokens.service';
import { EmailTokenStrategy } from './strategy/email-token.strategy';
import { EmailModule } from 'src/modules/email/email.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserToken } from './entities/user-token.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { UserTokensController } from './user-tokens.controller';

@Module({
  providers: [UserTokensService, EmailTokenStrategy, EntityRepository],
  exports: [UserTokensService],
  imports: [EmailModule, MikroOrmModule.forFeature([UserToken]),],
  controllers: [UserTokensController]
})
export class UserTokensModule {}
