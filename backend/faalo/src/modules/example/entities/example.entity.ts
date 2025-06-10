import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ModuleType } from "../../../enums/module-types.enum";

@Entity()
export class Example {

    @PrimaryKey()
    id!: number;

    @Property()
    moduleId: number;

    @Property()
    moduleType: ModuleType;

    @Property({type: 'string', length: 500})
    content: string;
    
    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    constructor(moduleId: number, moduleType: ModuleType, content: string){
        this.moduleId = moduleId;
        this.moduleType = moduleType;
        this.content = content;
    }
}
