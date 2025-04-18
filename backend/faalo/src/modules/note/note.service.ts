import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { NoteDto } from './dto/note.dto';
import { ModuleType } from 'src/enums/module-types.enum';

@Injectable()
export class NoteService {

  async create(moduleId: number, dto: NoteDto) {
    
  }

  async findAll(moduleId: number, moduleType: ModuleType) {
    
  }

  async findOne(id: number) {
    
  }

  async update(id: number, dto: NoteDto) {
    
  }

  async remove(id: number) {
    
  }
}
