import { IsNotEmpty, MaxLength } from "class-validator";
import { ModuleType } from "src/enums/module-types.enum";

export class ExampleDto {
    
    @MaxLength(500)
    content: string;

    @IsNotEmpty()
    moduleType: ModuleType;
}
