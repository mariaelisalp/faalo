import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { NoteDto } from './dto/note.dto';
import { ModuleType } from 'src/enums/module-types.enum';
import { EntityManager } from '@mikro-orm/postgresql';
import { Note } from './entities/note.entity';
import { EditNoteDto } from './dto/edit-note.dto';

@Injectable()
export class NoteService {
  constructor(private readonly em: EntityManager){}

  async create(moduleId: number, dto: NoteDto) {
    const module = await this.em.find(dto.moduleType, {moduleId: moduleId});

    try{
      if(module){
        const note = new Note(dto.content, dto.moduleType, moduleId);

        await this.em.persistAndFlush(note);

        return note;
      }
    }
    catch(e){
      throw new InternalServerErrorException()
    }
  }

  async findAll(moduleId: number, moduleType: ModuleType) {
    const notes = await this.em.find(Note, {moduleId: moduleId, moduleType: moduleType});

    if(notes){
      return notes;
    }
    else{
      throw new NotFoundException();
    }
  }

  async findOne(id: number) {
    const note = await this.em.findOne(Note, {id: id});

    if(note){
      return note;
    }
    else{
      throw new NotFoundException();
    }
  }

  async update(id: number, dto: EditNoteDto) {
    const note = await this.em.findOne(Note, {id: id});

    try{
      if(note){
        note.content = dto.content;

        return note;
      }
    }
    catch(e){
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    const note = await this.em.findOne(Note, {id: id});

    try{
      if(note){
        await this.em.removeAndFlush(note);
  
        return 'removed';
      }
    }
    catch(e){
      throw new InternalServerErrorException()
    }
  }
}
