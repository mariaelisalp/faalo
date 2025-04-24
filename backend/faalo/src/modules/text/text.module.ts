import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextController } from './text.controller';
import { UserResourceGuard } from '../auth/guards/user-resource.guard';

@Module({
  controllers: [TextController],
  providers: [TextService, UserResourceGuard],
})
export class TextModule {}
