import { Migration } from '@mikro-orm/migrations';

export class Migration20250413012917 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "connection" ("id" serial primary key, "source_id" int not null, "source_type" varchar(255) not null, "target_id" int not null, "target_type" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "example" ("id" serial primary key, "module_id" int not null, "module_type" varchar(255) not null, "content" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "note" ("id" serial primary key, "content" varchar(255) not null, "module_id" int not null, "module_type" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "task" ("id" serial primary key, "content" varchar(255) not null, "is_done" boolean not null default false, "language_id" int not null);`);

    this.addSql(`alter table "task" add constraint "task_language_id_foreign" foreign key ("language_id") references "language" ("id") on update cascade;`);

    this.addSql(`alter table "text" add column "topic_id" int null;`);
    this.addSql(`alter table "text" add constraint "text_topic_id_foreign" foreign key ("topic_id") references "topic" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "resource" add column "topic_id" int null;`);
    this.addSql(`alter table "resource" add constraint "resource_topic_id_foreign" foreign key ("topic_id") references "topic" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "content" add column "topic_id" int null;`);
    this.addSql(`alter table "content" add constraint "content_topic_id_foreign" foreign key ("topic_id") references "topic" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "vocabulary" add column "topic_id" int null;`);
    this.addSql(`alter table "vocabulary" add constraint "vocabulary_topic_id_foreign" foreign key ("topic_id") references "topic" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "text" drop constraint "text_topic_id_foreign";`);

    this.addSql(`alter table "resource" drop constraint "resource_topic_id_foreign";`);

    this.addSql(`alter table "content" drop constraint "content_topic_id_foreign";`);

    this.addSql(`alter table "vocabulary" drop constraint "vocabulary_topic_id_foreign";`);
  }

}
