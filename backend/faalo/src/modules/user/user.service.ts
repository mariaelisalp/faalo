import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEditDto } from './dto/user-edit.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { EntityManager,} from '@mikro-orm/postgresql';

@Injectable()
export class UserService {

    private repository;
    constructor(@InjectRepository(User) private readonly em: EntityManager){
        this.repository = this.em.getRepository(User);
    }

    async findOne(email: string): Promise<any>{
        
        try{
            const user = await this.repository.findOne({ email });
            return user;
            
        }catch(e){
            console.log(e);
            throw new Error('Erro ao procurar usuário');
        }
    }

    async findById(id: number){
        console.log(id);
        try {
            
            const user = await this.repository.findOne({ id });
            return user;

        } catch (error) {
            throw new Error('Usuário não encontrado');
        }
        
    }

    async updateInfo(userId: number, dto: UserEditDto){
        console.log('id do usuario p atualizar:', userId);
        const user = await this.findById(userId);

        try{
            if(user){
                if(dto.password){
                    dto.password = await this.updatePassword(userId, dto.password);
                }

                this.repository.assign(user, {...dto});
                await this.repository.getEntityManager().flush();

                return "Informações atualizadas com sucesso.";
                
            }
            else{
                return "Usuário não encontrado";
            }
        }
        catch(e){
            console.log(e);
            throw new Error('Erro ao atualizar informações do usuário.');
        }


    }

    async updatePassword(userId: number, password: string){
        return "a implementar";
    }

    async verifyUser(email: string){
        const user = await this.repository.findOne({email});

        if(user){
            user.isVerified = true;
            this.em.flush();
        }
    }

    async delete(userId: number){
        const user = this.findById(userId);
        try{
            
            await this.repository.getEntityManager().removeAndFlush(user);
            return "Usuário excluido."
              
        }
        catch(e){
            console.log(e);
            throw new Error('Erro ao deletar usuário');
        }
    }

}
    