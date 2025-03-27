import { Module } from '@nestjs/common';
import { ResourcesService } from './resource.service';
import { ResourcesController } from './resource.controller';

@Module({
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourceModule {}
