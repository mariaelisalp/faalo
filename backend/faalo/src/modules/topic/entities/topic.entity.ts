import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Language } from "../../language/entities/language.entity";

@Entity()
export class Topic {
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Language)
    language: Language;
    
    @Property()
    name: string;

    @Property()
    moduleType: string;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    constructor(name: string, moduleType: string){
        this.name = name;
        this.moduleType = moduleType;
    }
}
