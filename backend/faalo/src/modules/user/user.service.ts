import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEditDto } from './dto/user-edit.dto';
import { User } from './entities/user.entity';
import { EntityManager, } from '@mikro-orm/postgresql';
import { PasswordEditDto } from './dto/password-edit.dto';
import { LanguageService } from '../language/language.service';

@Injectable()
export class UserService {

    private repository;
    constructor(private readonly em: EntityManager, private languageService: LanguageService) {
        this.repository = this.em.getRepository(User);
    }

    async findOne(email: string): Promise<any> {

        try {
            const user = await this.repository.findOne({ email });
            return user;

        } catch (e) {
            console.log(e);
            throw new Error('Erro ao procurar usuário');
        }
    }

    async findById(id: number) {
        console.log(id);
        try {

            const user = await this.repository.findOne({ id });
            return user;

        } catch (error) {
            throw new NotFoundException();
        }

    }

    async updateInfo(userId: number, dto: UserEditDto) {
        console.log('id do usuario p atualizar:', userId);
        const user = await this.findById(userId);

        try {
            if (user) {
                this.repository.assign(user, { ...dto });
                await this.repository.getEntityManager().flush();

                return "Informações atualizadas com sucesso.";

            }

            throw new NotFoundException();
        }
        catch (e) {
            console.log(e);
            throw new Error('Erro ao atualizar informações do usuário.');
        }
    }

    async updatePassword(userId: number, dto: PasswordEditDto) {
        const user = await this.findById(userId);

        if (userId == user.id) {
            const pwMatches = await bcrypt.compare(dto.password, user.password);

            if (pwMatches) {
                const newPassword = await bcrypt.hash(dto.newPassword, 15);
                user.password = newPassword;
                this.em.flush();

                return 'Password updated successfully.';
            }
            else {
                throw new BadRequestException('Password incorrect.');
            }
        }
    }

    async verifyUser(email: string) {
        const user = await this.em.findOne(User, { email: email });

        if (user) {
            user.isVerified = true;
            await this.em.flush();
        }
    }

    async delete(userId: number) {
        try {


            const user = await this.em.findOne(User, { id: userId }, { populate: ['languages'] });

            if (user) {

                for (const language of user.languages) {
                    await this.languageService.delete(userId, language.id); 
                }

                return await this.em.removeAndFlush(user);
            }

        }
        catch (e) {
            console.log(e);
            throw new Error('Erro ao deletar usuário');
        }
    }

}
