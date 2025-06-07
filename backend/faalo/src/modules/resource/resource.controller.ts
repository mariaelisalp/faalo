import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors, ParseIntPipe, Res } from '@nestjs/common';
import { ResourcesService } from './resource.service';
import { ResourceDto } from './dto/resource.dto';
import 'multer';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ModuleType } from 'src/enums/module-types.enum';


@Controller(':languageId/resources')
export class ResourcesController {
  constructor(private readonly resourceService: ResourcesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Param('languageId') languageId: number, @Body() dto: ResourceDto, @UploadedFile() file?: Express.Multer.File) {
    return this.resourceService.create(languageId, dto, undefined, file);
  }

  @Post(':topicId')
  @UseInterceptors(FileInterceptor('file'))
  createByTopic(@Param('languageId') languageId: number, @Body() dto: ResourceDto, @Param('topicId') topicId?: number,
    @UploadedFile() file?: Express.Multer.File) {
    return this.resourceService.create(languageId, dto, topicId, file);
  }

  @Get('all')
  findAll(@Param('languageId') languageId: number) {
    return this.resourceService.findAll(languageId);
  }

  @Get()
  findMany(@Param('languageId') languageId: number, @Query('topicId') topicId?: number) {
    return this.resourceService.findMany(languageId, topicId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.resourceService.findOne(id);
  }

  @Get('file/:id')
  async findFile(@Param('languageId', ParseIntPipe) languageId: number, @Param('id', ParseIntPipe) id: number, @Query('moduleType') moduleType: ModuleType, @Res() res: Response){
    return this.resourceService.getFile(languageId, id, res);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(@Param('id') id: number, @Body() dto: ResourceDto, @UploadedFile() file?: Express.Multer.File,
   @Query('topicId') topicId?: number) {
    return this.resourceService.update(id, dto, file, topicId);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.resourceService.remove(id);
  }
}
