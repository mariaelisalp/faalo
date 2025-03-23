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
import defineConfig from '../mikro-orm.config';

@Module({
  imports: [UserModule, AuthModule, EmailModule, UserTokensModule, ConfigModule.forRoot({
    isGlobal: true,
  }), JwtModule.register({}), MikroOrmModule.forRoot(defineConfig),
  ], 
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
