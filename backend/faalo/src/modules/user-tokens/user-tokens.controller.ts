import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserTokensService } from './user-tokens.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { TokenDto } from './dto/token.dto';

@UseGuards(JwtGuard)
@Controller()
export class UserTokensController {

    constructor(private userTokensService: UserTokensService){}

    @Post('verify-email')
    verifyEmail(@GetUser('email') email: string, @Body() token: TokenDto){

        return this.userTokensService.verifyEmail(email, token);
    }

    @Post('resend-code')
    resendCode(@GetUser('email') email: string){
        return this.userTokensService.resendVerificationEmail(email);
    }
    
}
