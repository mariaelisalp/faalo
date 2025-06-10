import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, ParseEnumPipe } from '@nestjs/common';
import { TopicsService } from './topic.service';
import { TopicDto } from './dto/topic.dto';
import { ModuleType } from 'src/enums/module-types.enum';

@Controller(':languageId/topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  create(@Param('languageId', ParseIntPipe) languageId, @Body() dto: TopicDto) {
    return this.topicsService.create(languageId, dto);
  }

  @Post(':parentId')
  createSubtopic(@Param('languageId', ParseIntPipe) languageId: number, @Param('parentId') parentId: number, @Body() dto: TopicDto ){
    return this.topicsService.create(languageId, dto, parentId);
  }

  @Get('all')
  findAll(@Param('languageId', ParseIntPipe) languageId: number, @Query('moduleType') moduleType: ModuleType) {
    return this.topicsService.findAll(languageId, moduleType);
  }

  @Get()
  findMany(@Param('languageId', ParseIntPipe) languageId: number, @Query('moduleType') moduleType: ModuleType,
   @Query('parentId') parentId?: number) {
    return this.topicsService.findMany(languageId, moduleType, parentId);
  }

  @Get(':id')
  findOne(@Param('languageId', ParseIntPipe) languageId, @Param('id', ParseIntPipe) id: number, @Query('moduleType') moduleType: ModuleType) {
    return this.topicsService.findOne(languageId, id, moduleType);
  }

  @Patch(':id')
  update(@Param('languageId', ParseIntPipe) languageId, @Param('id', ParseIntPipe) id: number, @Body() name: {name: string}) {
    return this.topicsService.update(languageId, id, name);
  }

  @Delete(':id')
  remove(@Param('languageId', ParseIntPipe) languageId, @Param('id', ParseIntPipe) id: number) {
    return this.topicsService.remove(languageId, id);
  }
}
