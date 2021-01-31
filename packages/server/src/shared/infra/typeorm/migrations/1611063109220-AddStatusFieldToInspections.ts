import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddStatusFieldToInspections1611063109220
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'inspections',
      new TableColumn({
        name: 'status',
        type: 'enum',
        enum: ['pending', 'approved', 'refused'],
        enumName: 'statusEnum',
        default: "'pending'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('inspections', 'status');
  }
}
