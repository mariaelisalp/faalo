import { IsEmail, IsOptional, Length } from "class-validator";
import { isUnique } from "src/validators/is-unique.interface";

export class UserEditDto{
    @Length(2,50)
    @IsOptional()
    name: string;

    @IsEmail()
    @isUnique({tableName: 'User', column: 'email'})
    @IsOptional()
    email: string;

    @IsOptional()
    profileImage: string;

}