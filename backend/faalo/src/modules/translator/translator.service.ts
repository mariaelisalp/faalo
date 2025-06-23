import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as deepl from 'deepl-node';
import { TranslatorDto } from './dto/translator.dto';

@Injectable()
export class TranslatorService {
    private authKey: string = '';

    constructor(private config: ConfigService) {
        const key = this.config.get('DEEPL_API_KEY');
        this.authKey = key;

        const deeplClient = new deepl.DeepLClient(this.authKey);
    }

    async translate(dto: TranslatorDto) {
        const translator = new deepl.Translator(this.authKey);

        const result = await translator.translateText(dto.content, dto.source, dto.target);

        return result;
    }
}
