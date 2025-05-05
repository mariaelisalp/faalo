import { JwtService } from "@nestjs/jwt";
import { TokenStrategy } from "./token.strategy";
import { ConfigService } from "@nestjs/config";
import { EntityManager } from "@mikro-orm/postgresql";
import { User } from "src/modules/user/entities/user.entity";
import { UserToken } from "../entities/user-token.entity";
import { EmailService } from "src/modules/email/email.service";
import { Injectable } from "@nestjs/common";
import { TokenType } from "src/enums/token-types.enum";

@Injectable()
export class PasswordResetStrategy implements TokenStrategy{

    constructor(private jwt: JwtService, private config: ConfigService, private em: EntityManager, 
        private emailService: EmailService){}

    async generateEmailToken(email: string) {
        const payload = { email };

        console.log('payload:', payload);
        const key = this.config.get('JWT_PASSWORD_RESET');
        console.log('key', key)
        const token = this.jwt.sign(payload, {
            secret: key,
            expiresIn: '1200s'
        });

        const user = await this.em.findOne(User, {email: email});

        if(user){
            const tokenExists = await this.em.findOne(UserToken, {email:email, type: TokenType.PASSWORD_RESET});

            if(tokenExists){

                tokenExists.token = token;
                tokenExists.createdAt = new Date();
                
                await this.em.flush();
            }
            else{
                const resetToken = new UserToken(email, token, TokenType.PASSWORD_RESET, new Date(), 1200);

                await this.em.persistAndFlush(resetToken);
            }
            
        }

        return this.sendEmail(email, token);
    }

    sendEmail(email: string, token: string) {

        const url = `${this.config.get('EMAIL_RESET_PASSWORD_URL')}?token=${token}`;
        const text = `Hi, \nTo reset your password, click here: ${url}`;

        return this.emailService.sendPasswordResetLink(email, text);
    }

}