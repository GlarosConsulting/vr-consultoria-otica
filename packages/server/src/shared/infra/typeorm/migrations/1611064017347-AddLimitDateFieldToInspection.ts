import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddLimitDateFieldToInspection1611064017347
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'inspections',
      new TableColumn({
        name: 'limit_date',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('inspections', 'limit_date');
  }
}
