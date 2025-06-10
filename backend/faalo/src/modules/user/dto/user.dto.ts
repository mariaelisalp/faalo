import { IsAlpha, IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";
import { isUnique } from "src/validators/is-unique.interface";

export class UserDto{
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @isUnique({tableName: 'User', column: 'email'})
    email: string;

    @IsNotEmpty()
    @Length(8)
    password: string;

    @IsNotEmpty()
    @Length(8)
    confirmPassword: string;

}