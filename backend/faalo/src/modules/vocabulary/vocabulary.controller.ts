import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { VocabularyDto } from './dto/vocabulary.dto';
import { VocabularyService } from './vocabulary.service';

@Controller(':languageId/vocabulary')
export class VocabularyController {

    constructor(private readonly vocabularyService: VocabularyService){}

    @Post()
    create(@Param('languageId') languageId: number, @Body() dto: VocabularyDto){
        return this.vocabularyService.create(languageId, dto);
    }

    @Post(':topicId')
      createByTopic(@Param('languageId') languageId: number, @Body() dto: VocabularyDto, @Param('topicId') topicId?: number) {
        return this.vocabularyService.create(languageId, dto, topicId);
    }

    @Get()
    findAll(@Param('languageId') languageId: number, @Query('topicId') topicId?: number){
        return this.vocabularyService.findAll(languageId, topicId);
    }

    @Get(':id')
    findOne(@Param('id') id: number){
        return this.vocabularyService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: VocabularyDto){
        return this.vocabularyService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number){
        return this.vocabularyService.remove(id);
    }

}
