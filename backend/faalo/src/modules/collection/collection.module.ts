import { Module } from '@nestjs/common';
import { CollectionsService } from './collection.service';
import { CollectionsController } from './collection.controller';

@Module({
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionModule {}
