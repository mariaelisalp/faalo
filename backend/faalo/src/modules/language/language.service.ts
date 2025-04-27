import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { LanguageDto } from './dto/language.dto';
import { Language } from './entities/language.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '../user/entities/user.entity';

@Injectable()
export class LanguageService {

    constructor(private em: EntityManager){}

    async create(userId: number, dto: LanguageDto){

        const user = await this.em.findOne(User, userId);
        if(!user){
            throw new NotFoundException();
        }

        const language = new Language(dto.name, new Date());
        language.user = user;

        await this.em.persistAndFlush(language);

        return language;
    }

    async findOne(userId: number, languageId: number){
        const language = await this.em.findOne(Language, { id: languageId});

        if(language){
            if(language.user.id != userId){
                throw new ForbiddenException();
            }

            return language;
        }

        throw new NotFoundException();

    }

    async findMany(userId: number){
        const languages = await this.em.find(Language, { user: userId });

        if(languages.length > 0){
            return languages;
        }

        throw new NotFoundException('No languages found');
    }

    async delete(userId: number, languageId: number){
        const language = await this.em.findOne(Language, { id: languageId});

        if(language != null){
            if(language?.user.id == userId){
                await this.em.removeAndFlush(language);
            }
            else{
                throw new ForbiddenException();
            }

        } 

        throw new NotFoundException();
        
    }
}
