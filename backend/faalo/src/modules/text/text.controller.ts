import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TextService } from './text.service';
import { TextDto } from './dto/text.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserResourceGuard } from '../auth/guards/user-resource.guard';

@UseGuards(JwtGuard, UserResourceGuard)
@Controller(':languageId/texts')
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Post()
  create(@Param('languageId', ParseIntPipe) languageId, @Body() dto: TextDto) {
    return this.textService.create(languageId, dto);
  }

  @Post(':topicId')
  createByTopic(@Param('languageId', ParseIntPipe) languageId, @Body() dto: TextDto,
    @Param('topicId', ParseIntPipe) topicId?: number) {
    return this.textService.create(languageId, dto, topicId);
  }

  @Get()
  findAll(@Param('languageId', ParseIntPipe) languageId: number) {
    return this.textService.findAll(languageId);
  }

  @Get(':topicId')
  findByTopic(@Param('languageId', ParseIntPipe) languageId: number, @Param('topicId', ParseIntPipe) topicId: number) {
    return this.textService.findAll(languageId, topicId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.textService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: TextDto) {
    return this.textService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.textService.remove(id);
  }
}
