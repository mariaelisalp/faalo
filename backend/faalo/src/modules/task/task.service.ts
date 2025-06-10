import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './dto/create-task.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Language } from '../language/entities/language.entity';
import { Task } from './entities/task.entity';
import { EditTaskDto } from './dto/edit-task.dto';

@Injectable()
export class TaskService {

  constructor(private em: EntityManager){}

  async create(languageId: number, dto: TaskDto) {
    const language = await this.em.findOne(Language, {id: languageId});

    if(language == null){
      throw new NotFoundException('Language does not exist');
    }

    const task = new Task(dto.content);
    task.language = language;

    await this.em.persistAndFlush(task);

    return task;

  }

  async findAll(languageId: number) {
    const tasks = await this.em.find(Task, {language: languageId});

    if(tasks.length != 0){
      return tasks;
    }

    throw new NotFoundException();
  }

  async findOne(languageId: number, id: number) {
    const task = await this.em.findOne(Task, {language: languageId, id: id});

    if(task){
      return task;
    }

    throw new NotFoundException();
  }

  async update(languageId: number, id: number, dto: EditTaskDto) {
    const task = await this.em.findOne(Task, {language: languageId, id: id});

    if(task){

      task.content = dto.content;
      task.isDone = dto.isDone;

      await this.em.flush();

      return task;
    }

    throw new NotFoundException();
  }

  async remove(languageId: number, id: number) {
    const task = await this.em.find(Task, {language: languageId, id: id});

    if(task){
      await this.em.removeAndFlush(task);

      return;
    }

    throw new NotFoundException();

  }
}
