import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateInspectionsBreakdownsTable1611256936206
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inspections_breakdowns',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'img_filename',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'inspection_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'InspectionBreakdown',
            referencedTableName: 'inspections',
            referencedColumnNames: ['id'],
            columnNames: ['inspection_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('inspections_breakdowns');
  }
}
