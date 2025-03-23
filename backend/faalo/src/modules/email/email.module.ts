import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { SendgridClient } from './sendgrid-client/sendgrid-client';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, 
  }),],
  providers: [EmailService, SendgridClient],
  exports: [EmailService]
})
export class EmailModule {}
