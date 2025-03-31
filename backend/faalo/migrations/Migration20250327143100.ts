import { Migration } from '@mikro-orm/migrations';

export class Migration20250327143100 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "text" ("id" serial primary key, "language_id" int not null, "title" varchar(255) not null, "content" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "vocabulary" ("id" serial primary key, "language_id" int not null, "name" varchar(255) not null, "created_at" timestamptz not null);`);

    this.addSql(`alter table "text" add constraint "text_language_id_foreign" foreign key ("language_id") references "language" ("id") on update cascade;`);

    this.addSql(`alter table "vocabulary" add constraint "vocabulary_language_id_foreign" foreign key ("language_id") references "language" ("id") on update cascade;`);
  }

}
