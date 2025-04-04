import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentDto } from './dto/content.dto';

@Controller(':languageId/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  create(@Param('languageId') languageId: number, @Body() dto: ContentDto) {
    return this.contentService.create(languageId, dto);
  }

  @Get()
  findAll(@Param('languageId') languageId: number) {
    return this.contentService.findAll(languageId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: ContentDto) {
    return this.contentService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.contentService.remove(id);
  }
}
