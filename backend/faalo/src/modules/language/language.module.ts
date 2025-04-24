import { Module } from '@nestjs/common';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { UserResourceGuard } from '../auth/guards/user-resource.guard';

@Module({
  controllers: [LanguageController],
  providers: [LanguageService, UserResourceGuard]
})
export class LanguageModule {}
