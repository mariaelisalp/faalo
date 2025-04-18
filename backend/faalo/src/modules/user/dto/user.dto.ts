import { IsAlpha, IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";
import { isUnique } from "src/validators/is-unique.interface";

export class UserDto{
    @IsNotEmpty()
    @Length(2,50)
    @IsAlpha()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @isUnique({tableName: 'User', column: 'email'})
    email: string;

    @IsNotEmpty()
    @Length(8)
    password: string;

    @IsOptional()
    profileImage: string;
}