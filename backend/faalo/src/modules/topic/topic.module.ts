import { Module } from '@nestjs/common';
import { TopicsService } from './topic.service';
import { TopicsController } from './topic.controller';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService],
})
export class TopicModule {}
