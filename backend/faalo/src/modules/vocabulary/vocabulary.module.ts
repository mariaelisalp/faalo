import { Module } from '@nestjs/common';
import { VocabularyController } from './vocabulary.controller';
import { VocabularyService } from './vocabulary.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { WordService } from '../word/word.service';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const filename = `${Date.now()}-${file.originalname}`;
                    cb(null, filename);
                },
            }),
        }),
    ],
    controllers: [VocabularyController],
    providers: [VocabularyService, WordService],
    exports: [VocabularyService]
})
export class VocabularyModule { }
