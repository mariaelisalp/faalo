import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards, Put } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentDto } from './dto/content.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserResourceGuard } from '../auth/guards/user-resource.guard';

@UseGuards(JwtGuard, UserResourceGuard)
@Controller(':languageId/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  create(@Param('languageId') languageId: number, @Body() dto: ContentDto) {
    return this.contentService.create(languageId, dto);
  }

  @Post(':topicId')
  createByTopic(@Param('languageId', ParseIntPipe) languageId, @Body() dto: ContentDto,
    @Param('topicId', ParseIntPipe) topicId?: number) {
    return this.contentService.create(languageId, dto, topicId);
  }

  @Get()
  findAll(@Param('languageId') languageId: number, @Query('topicId') topicId?: number) {
    return this.contentService.findAll(languageId, topicId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: ContentDto, @Query('topicId') topicId?: number) {
    return this.contentService.update(id, dto, topicId);
  }

  @Put(':id')
  updateTopic(@Param('id') id: number, @Body() topic: {id: number | null}){
    console.log('chegou no controller')
    return this.contentService.updateTopic(id, topic);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.contentService.remove(id);
  }
}