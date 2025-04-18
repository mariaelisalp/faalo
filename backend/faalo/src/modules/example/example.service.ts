import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ExampleDto } from './dto/example.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Example } from './entities/example.entity';
import { ModuleType } from 'src/enums/module-types.enum';

@Injectable()
export class ExampleService {
  constructor(private readonly em: EntityManager){}

  async create(moduleId: number, dto: ExampleDto) {
    const module = await this.em.findOne(dto.moduleType, {id: moduleId});

    if(!module){
      throw new NotFoundException();
    }

    try{
      const example = new Example(moduleId, dto.moduleType, dto.content);

      await this.em.persistAndFlush(example);

      return 'ok';
    }
    catch(e){
      throw new InternalServerErrorException();
    }
  }

  async findAll(moduleId: number, moduleType: ModuleType) {
    const examples = await this.em.find(Example, {moduleId: moduleId, moduleType: moduleType});

    if(!examples){
      throw new NotFoundException();
    }

    return examples;

  }

  async findOne(id: number) {
    const example = await this.em.findOne(Example, {id: id});

    if(!example){
      throw new NotFoundException();
    }

    return example;

  }

  async update(id: number, dto: ExampleDto) {
    const example = await this.em.findOne(Example, {id: id});

    try{
      if(example){
        example.content = dto.content;

        await this.em.flush();

        return 'updated';
      }

    }catch(e){
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    const example = await this.em.findOne(Example, {id: id});

    try{
      if(example){
        await this.em.removeAndFlush(example);
      }

      return 'its removed';

    }catch(e){
      throw new InternalServerErrorException();
    }
  }
}
