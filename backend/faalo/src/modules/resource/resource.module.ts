import { Module } from '@nestjs/common';
import { ResourcesService } from './resource.service';
import { ResourcesController } from './resource.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
          storage: diskStorage({
            destination: './uploads/resources',
            filename: (req, file, cb) => {
              const filename = `${Date.now()}-${file.originalname}`;
              cb(null, filename);
            },
          }),
        }),
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourceModule {}
