import { TokenStrategy } from "./token.strategy";
import * as crypto from 'crypto';
import { EmailService } from "src/modules/email/email.service";
import { Injectable } from "@nestjs/common";
import { UserToken } from "../entities/user-token.entity";
import { EntityManager} from "@mikro-orm/postgresql";
import { TokenType } from "src/enums/token-types.enum";

@Injectable()
export class EmailTokenStrategy implements TokenStrategy{

    private repository;

    constructor(private emailService: EmailService, private em: EntityManager){
        this.repository = this.em.getRepository(UserToken);
    }

    async generateEmailToken(email: string) {
        let emailToken = crypto.randomInt(100000,999999).toString();

        const token = new UserToken(email, emailToken, TokenType.EMAIL_VERIFICATION, new Date(), 1200);

        await this.em.persistAndFlush(token);

        return this.sendEmail(email, emailToken);
    }

    async updateEmailToken(id: number, email: string){
        const token = await this.repository.findOne({email});
        let emailToken = crypto.randomInt(100000,999999).toString();

       this.repository.assign(token, {token: emailToken, createdAt: new Date()});
       this.em.flush();

        return this.sendEmail(email, emailToken);
    }

    sendEmail(email: string, token: string) {
        return this.emailService.sendVerificationCode(email, token);
    }

}