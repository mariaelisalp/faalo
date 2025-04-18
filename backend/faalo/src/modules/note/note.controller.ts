import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteDto } from './dto/note.dto';
import { ModuleType } from 'src/enums/module-types.enum';

@Controller(':moduleId/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Param(':moduleId') moduleId: number, @Body() dto: NoteDto) {
    return this.noteService.create(moduleId,dto);
  }

  @Get()
  findAll(@Param('moduleId') moduleId: number, @Query('moduleType') moduleType: ModuleType) {
    return this.noteService.findAll(moduleId, moduleType);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.noteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: NoteDto) {
    return this.noteService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.noteService.remove(id);
  }
}
