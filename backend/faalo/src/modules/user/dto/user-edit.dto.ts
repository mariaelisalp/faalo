import { IsEmail, IsOptional, Length } from "class-validator";

export class UserEditDto{
    @Length(2,50)
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @Length(8)
    @IsOptional()
    password: string;

    @IsOptional()
    profileImage: string;

}