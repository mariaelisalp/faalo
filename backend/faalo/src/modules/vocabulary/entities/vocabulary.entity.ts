import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/postgresql";
import { Language } from "../../language/entities/language.entity";

@Entity()
export class Vocabulary{
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Language)
    language!: Language;
    
    @Property()
    name: string;

    @Property()
    createdAt: Date;

    constructor(name: string, createdAt: Date){
        this.name = name;
        this.createdAt = createdAt;
    }


}