import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { LanguageService } from './language.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { LanguageDto } from './dto/language.dto';

@UseGuards(JwtGuard)
@Controller('languages')
export class LanguageController {

    constructor(private languageService: LanguageService){}

    @Post()
    create(@GetUser('id') userId:number, @Body() dto: LanguageDto){
        return this.languageService.create(userId, dto);
    }

    @Get(':id')
    findOne(@GetUser('id') userId: number, @Param('id') languageId: number){
        return this.languageService.findOne(userId, languageId);
    }

    @Get()
    findMany(@GetUser('id') userId: number){
        return this.languageService.findMany(userId);
    }

    @Delete(':id')
    delete(@GetUser('id') userId: number, @Param('id') languageId: number){
        return this.languageService.delete(userId, languageId);
    }
}