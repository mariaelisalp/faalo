import { IsNotEmpty } from "class-validator";
import { ModuleType } from "src/enums/module-types.enum";

export class ExampleDto {

    content: string;

    @IsNotEmpty()
    moduleType: ModuleType;
}
