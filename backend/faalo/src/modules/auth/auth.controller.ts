import { Body, Controller, HttpCode, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { UserTokensService } from 'src/modules/user-tokens/user-tokens.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private userTokensService: UserTokensService){}
    
    @Post('register')
    @UsePipes(new ValidationPipe({ transform: true }))
    register(@Body() dto: UserDto){
        return this.authService.register(dto);
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async logIn(@Body() dto: AuthDto){
        return this.authService.logIn(dto);
        
    }

    async logout(){
        
    }
}