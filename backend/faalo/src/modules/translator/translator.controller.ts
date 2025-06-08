import { Body, Controller, Post } from '@nestjs/common';
import { TranslatorService } from './translator.service';
import { TranslatorDto } from './dto/translator.dto';

@Controller('translate')
export class TranslatorController {

    constructor(private translator: TranslatorService){}

    @Post()
    translate(@Body() dto: TranslatorDto){
        return this.translator.translate(dto);
    }

    @Post()
    improve(){}
}
