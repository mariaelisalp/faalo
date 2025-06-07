import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';

@Controller(':languageId/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Param('languageId') languageId: number, @Body() dto: TaskDto) {
    return this.taskService.create(languageId, dto);
  }

  @Get()
  findAll(@Param('languageId') languageId: number) {
    return this.taskService.findAll(languageId);
  }

  @Get(':id')
  findOne(@Param('languageId') languageId: number, @Param('id') id: number) {
    return this.taskService.findOne(languageId, id);
  }

  @Patch(':id')
  update(@Param('languageId') languageId: number, @Param('id') id: number, @Body() dto: EditTaskDto) {
    return this.taskService.update(languageId, id, dto);
  }

  @Delete(':id')
  remove(@Param('languageId') languageId: number, @Param('id') id: number) {
    return this.taskService.remove(languageId, id);
  }
}
