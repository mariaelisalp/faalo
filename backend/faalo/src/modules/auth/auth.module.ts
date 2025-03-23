import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from 'src/modules/email/email.module';
import { UserTokensModule } from 'src/modules/user-tokens/user-tokens.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { EntityRepository } from '@mikro-orm/core';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true}), JwtModule.register({}), EmailModule, UserTokensModule],
  providers: [AuthService, JwtStrategy, EntityRepository],
  controllers: [AuthController]
})
export class AuthModule {}
