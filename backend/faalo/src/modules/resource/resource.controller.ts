import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResourcesService } from './resource.service';
import { ResourceDto } from './dto/resource.dto';


@Controller(':languageId/resources')
export class ResourcesController {
  constructor(private readonly resourceService: ResourcesService) {}

  @Post()
  create(@Param('languageId') languageId: number, @Body() dto: ResourceDto) {
    return this.resourceService.create(languageId, dto);
  }

  @Post(':topicId')
  createByTopic(@Param('languageId') languageId: number, @Body() dto: ResourceDto, @Param('topicId') topicId?: number) {
    return this.resourceService.create(languageId, dto, topicId);
  }

  @Get()
  findAll(@Param('languageId') languageId: number, @Query('topicId') topicId?: number) {
    return this.resourceService.findAll(languageId, topicId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.resourceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: ResourceDto) {
    return this.resourceService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.resourceService.remove(id);
  }
}
