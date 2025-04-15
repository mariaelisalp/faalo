import { IsEnum, IsNotEmpty } from "class-validator";
import { ModuleType } from "src/enums/module-types.enum";

export class TopicDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEnum(ModuleType)
    moduleType: ModuleType;
}
