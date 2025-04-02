import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { WordService } from './word.service';
import { WordDto } from './dto/word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Controller(':vocabularyId/words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  create(@Param('vocabularyId', ParseIntPipe) vocabularyId: number, @Body() dto: WordDto) {
    return this.wordService.create(vocabularyId, dto);
  }

  @Get()
  findAll(@Param('vocabularyId', ParseIntPipe) vocabularyId: number) {
    return this.wordService.findAll(vocabularyId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wordService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: WordDto) {
    return this.wordService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.wordService.remove(id);
  }
}
