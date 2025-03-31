import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TextService } from './text.service';
import { TextDto } from './dto/text.dto';

@Controller(':languageId/texts')
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Post()
  create(@Param('languageId', ParseIntPipe) languageId, @Body() dto: TextDto) {
    return this.textService.create(languageId, dto);
  }

  @Get()
  findAll(@Param('languageId', ParseIntPipe) languageId: number) {
    return this.textService.findAll(languageId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.textService.findOne(+id);
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
