import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/modules/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard';
import { UserEditDto } from './dto/user-edit.dto';
import { PasswordEditDto } from './dto/password-edit.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Get('user')
    findByEmail(@GetUser('email') email: string){
      return this.userService.findOne(email);
    }

    @Get('getById')
    findById(@GetUser('id') userId: number){
      return this.userService.findById(userId);
    }

    @Patch('update')
    update(@GetUser('id') userId: number, @Body() dto: UserEditDto){
      return this.userService.updateInfo(userId, dto);
    }

    @Put('update-password')
    updatePassword(@GetUser('id') userId: number, @Body() dto: PasswordEditDto){
      return this.userService.updatePassword(userId, dto);
    }

    @Delete('delete')
    delete(@GetUser('id') userId: number){
      return this.userService.delete(userId);
    }
}