import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailTokenStrategy } from './strategy/email-token.strategy';
import { EntityManager } from '@mikro-orm/postgresql';
import { UserToken } from './entities/user-token.entity';
import { TokenDto } from './dto/token.dto';
import { UserService } from '../user/user.service';
import { PasswordResetStrategy } from './strategy/password-reset.strategy';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenType } from 'src/enums/token-types.enum';

@Injectable()
export class UserTokensService {
    private repository;

    constructor(private emailStrategy: EmailTokenStrategy, private passwordSrategy: PasswordResetStrategy,
        private em: EntityManager, private user: UserService, private jwt: JwtService, private config: ConfigService) {
        this.repository = this.em.getRepository(UserToken);
    }

    async sendVerificationEmail(email: string) {
        console.log(email);

        if ((await this.findByEmail(email))) {
            return this.resendVerificationEmail(email);
        }

        return this.emailStrategy.generateEmailToken(email);
    }

    async resendVerificationEmail(email: string) {
        const token = await this.findByEmail(email);

        if (token) {
            return this.emailStrategy.updateEmailToken(token.id, email);
        }
    }

    async verifyEmail(email: string, dto: TokenDto) {


        const user_token = await this.findByEmail(email);

        if(user_token && user_token.token != dto.value.toString()){
            throw new BadRequestException("Código de verificação inválido");
        }

        if (await this.verifyTokenExpiration(email) == true) {

            if (user_token && user_token.token == dto.value.toString()) {
                await this.deleteToken(email);

                this.user.verifyUser(email);
                return {
                    email: email,
                    verified: true
                };
            }
        }
        else {
            throw new BadRequestException('Código de verificação expirado');
        }


    }

    findByEmail(email: string) {
        return this.em.findOne(UserToken, {email: email});
    }

    async verifyTokenExpiration(email: string) {
        const token = await this.findByEmail(email);

        if (token) {
            const createdAt = new Date(token.createdAt)
            const expiration = new Date(createdAt.getTime() + token.expiresIn * 1000)
            const now = new Date();

            if (now > expiration) {
                return false;
            }

            return true;
        }

        return false;
    }

    async createPasswordResetLink(email: string) {
        return this.passwordSrategy.generateEmailToken(email);
    }

    async decodePasswordResetToken(token: string) {
        try {
            const payload = await this.jwt.verify(token, {
                secret: this.config.get('JWT_PASSWORD_RESET')
            });

            if (typeof payload === 'object' && 'email' in payload) {
                const tokenToDelete = await this.em.findOne(UserToken, { email: payload.email, type: TokenType.PASSWORD_RESET });
                //await this.em.removeAndFlush(tokenToDelete);
                return payload.email;
            }

            throw new BadRequestException();

        } catch (error) {
            if (error?.name === 'TokenExpiredError') {
                throw new BadRequestException(
                    'Email confirmation token expired'
                );
            }
            throw new BadRequestException('Bad confirmation token');
        }
    }

    async deleteToken(email: string) {
        const token = await this.findByEmail(email);
        if (token) {

            return this.em.removeAndFlush(token);
        }
    }
}
