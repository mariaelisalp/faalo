import { Injectable } from '@nestjs/common';
import { CreateConnectionDto } from './dto/create-connection.dto';

@Injectable()
export class ConnectionService {
  create(createConnectionDto: CreateConnectionDto) {
    return 'This action adds a new connection';
  }

  findAll() {
    return `This action returns all connection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} connection`;
  }

  update(id: number, updateConnectionDto: CreateConnectionDto) {
    return `This action updates a #${id} connection`;
  }

  remove(id: number) {
    return `This action removes a #${id} connection`;
  }
}
