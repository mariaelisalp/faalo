import { Migration } from '@mikro-orm/migrations';

export class Migration20250414201124 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "topic" add column "parent_id" int null;`);
    this.addSql(`alter table "topic" add constraint "topic_parent_id_foreign" foreign key ("parent_id") references "topic" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "topic" drop constraint "topic_parent_id_foreign";`);
  }

}
