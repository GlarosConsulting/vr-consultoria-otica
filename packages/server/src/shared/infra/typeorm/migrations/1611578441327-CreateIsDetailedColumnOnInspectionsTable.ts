import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateIsDetailedColumnOnInspectionsTable1611578441327
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'inspections',
      new TableColumn({
        name: 'is_detailed',
        type: 'boolean',
        default: false,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('inspections', 'is_detailed');
  }
}
