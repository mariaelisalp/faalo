import { Migration } from '@mikro-orm/migrations';

export class Migration20250519191355 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "example" alter column "content" type varchar(500) using ("content"::varchar(500));`);

    this.addSql(`alter table "note" alter column "content" type text using ("content"::text);`);

    this.addSql(`alter table "task" alter column "content" type varchar(500) using ("content"::varchar(500));`);

    this.addSql(`alter table "content" alter column "content" type text using ("content"::text);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "example" alter column "content" type varchar(255) using ("content"::varchar(255));`);

    this.addSql(`alter table "note" alter column "content" type varchar(255) using ("content"::varchar(255));`);

    this.addSql(`alter table "task" alter column "content" type varchar(255) using ("content"::varchar(255));`);

    this.addSql(`alter table "content" alter column "content" type varchar(255) using ("content"::varchar(255));`);
  }

}
