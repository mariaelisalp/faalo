import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleDto } from './dto/example.dto';
import { ModuleType } from 'src/enums/module-types.enum';

@Controller(':moduleId/example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  create(@Param('moduleId') moduleId: number, @Body() dto: ExampleDto) {
    return this.exampleService.create(moduleId, dto);
  }

  @Get()
  findAll(@Param('moduleId') moduleId: number, @Query('moduleType') moduleType: ModuleType) {
    return this.exampleService.findAll(moduleId, moduleType);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.exampleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: ExampleDto) {
    return this.exampleService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.exampleService.remove(id);
  }
}
