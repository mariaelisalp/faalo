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
    async verifyEmail(@GetUser('email') email: string, @Body() token: TokenDto){
        console.log("codigo de verificação recebido:", token);
        return this.userTokensService.verifyEmail(email, token);
    }
    
}
