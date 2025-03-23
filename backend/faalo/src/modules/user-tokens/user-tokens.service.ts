import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailTokenStrategy } from './strategy/email-token.strategy';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { UserToken } from './entities/user-token.entity';
import { TokenDto } from './dto/token.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class UserTokensService {
    private repository;

    constructor(private emailStrategy: EmailTokenStrategy, private em: EntityManager, private user: UserService){
        this.repository = this.em.getRepository(UserToken);
    }

    async sendVerificationEmail(email:string){
        console.log(email);

        if((await this.findByEmail(email))){
            return this.resendVerificationEmail(email);
        }

        return this.emailStrategy.generateEmailToken(email);
    }

    async resendVerificationEmail(email: string){
        const token = await this.findByEmail(email);

        if(token){
            return this.emailStrategy.updateEmailToken(token.id, email);
        }
    }

    async verifyEmail(email: string, dto: TokenDto){
        console.log('token:', dto.token);
 
        const user_token = await this.findByEmail(email);

        try{
            if(await this.verifyTokenExpiration(email) == true){
               
                if(user_token && user_token.token == dto.token){
                    await this.deleteToken(email);

                    this.user.verifyUser(email);
                    return {
                        email: email,
                        verified: true
                    };
                }
            }
            else{
                throw new BadRequestException('Código de verificação expirado');
            }
        }
        catch(e){
            console.log(e);
            throw new BadRequestException("Código de verificação inválido");
        }
    }

    findByEmail(email: string){
        console.log(email);
        return this.repository.findOne({email});
    }

    async verifyTokenExpiration(email: string){
        const token = await this.findByEmail(email);

        if(token){
            const createdAt = new Date(token.createdAt)
            const expiration = new Date(createdAt.getTime() + token.expiresIn * 1000)
            const now = new Date();

            if(now > expiration){
                return false;
            }

            return true;
        }

        return false;
    }

    async deleteToken(email: string){
        const token = await this.findByEmail(email);
        if(token){
            console.log('token a deletar:', token.id);

            return this.em.removeAndFlush(token);
        }
    }
}
