import { BadRequestException, Body, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { UserTokensService } from '../user-tokens/user-tokens.service';
import { PasswordResetEmailDto } from '../user-tokens/dto/password-reset-email.dto';
import { PassworResetDto } from '../user-tokens/dto/password-reset.dto';

@Injectable()
export class AuthService {

    private userRepository;

    constructor(private readonly manager: EntityManager, private jwtService: JwtService, 
        private config: ConfigService, private tokenService: UserTokensService,){
        
            this.userRepository = this.manager.getRepository(User);
    }

    async register(dto: UserDto){

        const encriptedPassword = await bcrypt.hash(dto.password, 15);
        const now = new Date();

        if(dto.password == dto.confirmPassword){
            const user = new User(dto.name, dto.email, encriptedPassword, dto.profileImage, false, now, now);
        
            await this.manager.persistAndFlush(user);
            await this.logIn({email: dto.email, password: dto.password});
            this.tokenService.sendVerificationEmail(user.email);
        
            return user;
        }

        throw new BadRequestException('Passwords do not match');

    }

    async logIn(@Body() dto: AuthDto){
        const userValidated = await this.validateUser(dto);

        if(userValidated){
            const token = await this.generateToken(userValidated.id, userValidated.email);

            return {
                token,
                userId: userValidated.id,
            };
        }
        
    }

    async validateUser(dto: AuthDto){
        const user = await this.userRepository.findOne({email: dto.email});

        if (!user){
            throw new NotFoundException(
                'This user does not exist.',
            );

        }

        const pwMatches =  await bcrypt.compare(dto.password, user.password);

        if(!pwMatches){
            throw new BadRequestException(
                'Credentials incorrect',
            );
        }

        return user;
        
    }

    async sendResetPasswordEmail(dto: PasswordResetEmailDto){
        console.log(dto);
        const user = await this.userRepository.findOne({email: dto.email});

        if(!user){
            throw new NotFoundException('No users found in our registries')
        }

        if(user.isVerified == true){
            return this.tokenService.createPasswordResetLink(dto.email);
        }

        throw new ForbiddenException('Email not verified');
        
    }

    async resetPassword(token: string, password: PassworResetDto){
        console.log('token:', token);
        console.log('password:', password.password);

        const email = await this.tokenService.decodePasswordResetToken(token);

        const user = await this.userRepository.findOne({email: email});

        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }

        if(password.password == password.confirmPassword){

            const encriptedPassword = await bcrypt.hash(password.password, 15);
            user.password = encriptedPassword;

            console.log('senha resetada')
            await this.manager.persistAndFlush(user);

            return this.tokenService.deleteToken(email);
        }

        throw new BadRequestException('Passwords do not match');
        
    }

    async generateToken(userId: number, email: string): Promise<string>{
        const payload = {
            sub: userId,
            email: email
        }

        console.log('Payload:', payload);


        const secret = this.config.get('JWT_SECRET');
        console.log('Chave secreta usada:', secret);

        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '30d',
            secret: secret
        });

        console.log('Token gerado:', token);

        return token;
    }
 

}