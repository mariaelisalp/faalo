import { Migration } from '@mikro-orm/migrations';

export class Migration20250331202656 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "topic" ("id" serial primary key, "language_id" int not null, "name" varchar(255) not null, "module_type" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`alter table "topic" add constraint "topic_language_id_foreign" foreign key ("language_id") references "language" ("id") on update cascade;`);
  }

}
