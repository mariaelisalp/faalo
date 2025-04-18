import { EntityManager } from "@mikro-orm/postgresql"
import { Injectable } from "@nestjs/common"
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"
import { IsUniqueInterface } from "./is-unique.interface"

@ValidatorConstraint({name: 'IsUniqueConstraint', async: true})
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly entityManager: EntityManager) {}
    async validate(value: any, args: ValidationArguments
        ): Promise<boolean> {

            const {tableName, column}: IsUniqueInterface = args.constraints[0]

            const data = await this.entityManager.findOne(tableName, { [column]: value });
            
            
            return !data
    }

    defaultMessage(validationArguments: ValidationArguments): string {

        const field: string = validationArguments.property
        return `${field} is already taken`
    }
}