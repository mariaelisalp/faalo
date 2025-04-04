import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/postgresql";
import { Vocabulary } from "../../vocabulary/entities/vocabulary.entity";

@Entity()
export class Word {
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Vocabulary)
    vocabulary: Vocabulary;
    
    @Property()
    word: string;

    @Property({nullable: true})
    translation?: string;

    @Property({nullable: true})
    definition?: string;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    constructor(word: string, translation: string, definition: string){
        this.word = word;
        this.translation = translation;
        this.definition = definition;
    }
}
