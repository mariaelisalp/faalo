import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ModuleType } from "../../../enums/module-types.enum";

@Entity()
export class Note {

    @PrimaryKey()
    id!: number;

    @Property()
    content: string;

    @Property()
    moduleId: number;

    @Property()
    moduleType: ModuleType;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    constructor(content: string, moduleType: ModuleType, moduleId: number){
        this.content = content;
        this.moduleType = moduleType;
        this.moduleId = moduleId;
    }
    
}
