import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { CreateConnectionDto } from './dto/create-connection.dto';

@Controller('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Post()
  create(@Body() createConnectionDto: CreateConnectionDto) {
    return this.connectionService.create(createConnectionDto);
  }

  @Get()
  findAll() {
    return this.connectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.connectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConnectionDto: CreateConnectionDto) {
    return this.connectionService.update(+id, updateConnectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.connectionService.remove(+id);
  }
}
