import { Body, Controller, HttpCode, HttpStatus, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { UserTokensService } from 'src/modules/user-tokens/user-tokens.service';
import { PasswordResetEmailDto } from '../user-tokens/dto/password-reset-email.dto';
import { PasswordEditDto } from '../user/dto/password-edit.dto';
import { PassworResetDto } from '../user-tokens/dto/password-reset.dto';

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
    logIn(@Body() dto: AuthDto){
        return this.authService.logIn(dto);  
    }

    @Post('forgot-password')
    sendResetPasswordEmail(@Body() email: PasswordResetEmailDto){
        return this.authService.sendResetPasswordEmail(email);
    }

    @Post('reset-password')
    resetPassword(@Body() password: PassworResetDto, @Query('token') token: string){
        return this.authService.resetPassword(token, password);
    }
}