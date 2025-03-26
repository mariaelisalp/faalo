import { IsEmail, IsOptional, Length } from "class-validator";

export class UserEditDto{
    @Length(2,50)
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsOptional()
    profileImage: string;

}