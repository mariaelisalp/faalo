import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/postgresql";
import { User } from "../../user/entities/user.entity";
import { Vocabulary } from "../../vocabulary/entities/vocabulary.entity";
import { Text } from "../../text/entities/text.entity";
import { Topic } from "../../topic/entities/topic.entity";

@Entity()
export class Language{
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => User)
    user!: User;
    
    @Property()
    name: string;

    @Property()
    createdAt: Date;

    @OneToMany(() => Vocabulary, vocabulary => vocabulary.language, { cascade: [Cascade.REMOVE] })
    vocabularies= new Collection<Vocabulary>(this);

    @OneToMany(() => Text, text => text.language, { cascade: [Cascade.REMOVE] })
    texts = new Collection<Text>(this);

    @OneToMany(() => Topic, topic => topic.language, { cascade: [Cascade.REMOVE] })
    topics = new Collection<Topic>(this);

    constructor(name: string, createdAt: Date){
        this.name = name;
        this.createdAt = createdAt;
    }


}