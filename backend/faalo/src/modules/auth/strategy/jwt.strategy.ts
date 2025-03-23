import {PassportStrategy} from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){

    private repository;

    constructor(config: ConfigService, private manager: EntityManager){
        const key = config.get('JWT_SECRET');
        
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: key,
        });

        this.repository = this.manager.getRepository(User);
    }

   async validate(payload: {
        sub: number,
        email: string
        }): Promise<any> {
            
        console.log('Payload recebido:', payload); 
        const user =  await this.manager.findOne(User, {id: payload.sub});
        console.log('Usuário encontrado:', user); 

       return user;
    }

}