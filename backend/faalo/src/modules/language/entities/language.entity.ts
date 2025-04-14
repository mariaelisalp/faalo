import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/postgresql";
import { User } from "../../user/entities/user.entity";
import { Vocabulary } from "../../vocabulary/entities/vocabulary.entity";
import { Text } from "../../text/entities/text.entity";
import { Topic } from "../../topic/entities/topic.entity";
import { Content } from "../../content/entities/content.entity";
import { Resource } from "../../resource/entities/resource.entity";

@Entity()
export class Language{
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => User)
    user!: User;
    
    @Property()
    name: string;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    @OneToMany(() => Vocabulary, vocabulary => vocabulary.language, { cascade: [Cascade.REMOVE] })
    vocabularies = new Collection<Vocabulary>(this);

    @OneToMany(() => Text, text => text.language, { cascade: [Cascade.REMOVE] })
    texts = new Collection<Text>(this);

    @OneToMany(() => Topic, topic => topic.language, { cascade: [Cascade.REMOVE] })
    topics = new Collection<Topic>(this);

    @OneToMany(() => Content, content => content.language, { cascade: [Cascade.REMOVE] })
    contents = new Collection<Content>(this);

    @OneToMany(() => Resource, resource => resource.language, { cascade: [Cascade.REMOVE] })
    resources = new Collection<Resource>(this);

    constructor(name: string, createdAt: Date){
        this.name = name;
        this.createdAt = createdAt;
    }


}