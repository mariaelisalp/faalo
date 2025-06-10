import { Migration } from '@mikro-orm/migrations';

export class Migration20250604034107 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "resource" add column "file_name" varchar(255) null;`);
  }

}
