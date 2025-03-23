import { TokenStrategy } from "./token.strategy";
import * as crypto from 'crypto';
import { EmailService } from "src/modules/email/email.service";
import { Injectable } from "@nestjs/common";
import { UserToken } from "../entities/user-token.entity";
import { EntityManager, EntityRepository } from "@mikro-orm/postgresql";

@Injectable()
export class EmailTokenStrategy implements TokenStrategy{

    private repository;

    constructor(private emailService: EmailService, private em: EntityManager){
        this.repository = this.em.getRepository(UserToken);
    }

    async generateEmailToken(email: string) {
        let emailToken = crypto.randomInt(100000,999999);

        const token = new UserToken(email, emailToken, "email-verification", new Date(), 600);

        await this.em.persistAndFlush(token);

        return this.sendEmail(email, emailToken);
    }

    async updateEmailToken(id: number, email: string){
        const token = await this.repository.findOne({email});
        let emailToken = crypto.randomInt(100000,999999);

       this.repository.assign(token, {token: emailToken, createdAt: new Date()});
       this.em.flush();

        return this.sendEmail(email, emailToken);
    }

    sendEmail(email: string, token: number) {
        return this.emailService.sendVerificationCode(email, token);
    }

}