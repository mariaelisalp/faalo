import { IsAlpha, IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    @Length(2,50)
    @IsAlpha()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(8)
    password: string;

    @IsOptional()
    profileImage: string;
}