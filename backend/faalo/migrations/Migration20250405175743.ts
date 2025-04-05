import { Migration } from '@mikro-orm/migrations';

export class Migration20250405175743 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "resource" ("id" serial primary key, "name" varchar(255) not null, "type" varchar(255) null, "description" varchar(255) null, "access" varchar(255) null, "language_id" int not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "content" ("id" serial primary key, "language_id" int not null, "title" varchar(255) not null, "content" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`alter table "resource" add constraint "resource_language_id_foreign" foreign key ("language_id") references "language" ("id") on update cascade;`);

    this.addSql(`alter table "content" add constraint "content_language_id_foreign" foreign key ("language_id") references "language" ("id") on update cascade;`);
  }

}
