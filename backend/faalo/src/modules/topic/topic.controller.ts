import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TopicsService } from './topic.service';
import { TopicDto } from './dto/topic.dto';

@Controller(':languageId/topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  create(@Param('languageId', ParseIntPipe) languageId, @Body() dto: TopicDto) {
    return this.topicsService.create(languageId, dto);
  }

  @Get()
  findAll(@Param('languageId', ParseIntPipe) languageId, @Body() moduleType: string) {
    return this.topicsService.findAll(languageId, moduleType);
  }

  @Get(':id')
  findOne(@Param('languageId', ParseIntPipe) languageId, @Param('id', ParseIntPipe) id: number) {
    return this.topicsService.findOne(languageId, id);
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
