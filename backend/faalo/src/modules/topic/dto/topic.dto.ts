import { IsEnum, IsNotEmpty, MaxLength } from "class-validator";
import { ModuleType } from "src/enums/module-types.enum";

export class TopicDto {

    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsNotEmpty()
    @IsEnum(ModuleType)
    moduleType: ModuleType;
}
