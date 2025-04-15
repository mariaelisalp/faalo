import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Language } from "../../language/entities/language.entity";
import { ModuleType } from "../../../enums/module-types.enum";

@Entity()
export class Topic {
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Language)
    language: Language;
    
    @Property()
    name: string;

    @ManyToOne(() => Topic, { nullable: true })
    parent?: Topic;

    @OneToMany(() => Topic, topic => topic.parent)
    children? = new Collection<Topic>(this);

    @Property()
    moduleType: ModuleType;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    constructor(name: string, moduleType: ModuleType){
        this.name = name;
        this.moduleType = moduleType;
    }
}
