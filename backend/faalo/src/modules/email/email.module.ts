import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, 
  }),],
  providers: [EmailService, ConfigService],
  exports: [EmailService]
})
export class EmailModule {}
