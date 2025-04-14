import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ModuleType } from "../../../enums/module-types.enum";

@Entity()
export class Connection {

    @PrimaryKey()
    id!: number;

    @Property()
    sourceId: number;

    @Property()
    sourceType: ModuleType;

    @Property()
    targetId: number;

    @Property()
    targetType: ModuleType;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    constructor(sourceId: number, targetId: number, sourceType: ModuleType, targetType: ModuleType){
        this.sourceId = sourceId;
        this.sourceType = sourceType;
        this.targetId = targetId;
        this.targetType = targetType;
    }

}
