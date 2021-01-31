import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateInspections1610378948548
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inspections',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'forward_img',
            type: 'varchar',
          },
          {
            name: 'croup_img',
            type: 'varchar',
          },
          {
            name: 'left_side_img',
            type: 'varchar',
          },
          {
            name: 'right_side_img',
            type: 'varchar',
          },
          {
            name: 'motor_img',
            type: 'varchar',
          },
          {
            name: 'chassi_img',
            type: 'varchar',
          },
          {
            name: 'document_img',
            type: 'varchar',
          },
          {
            name: 'panel_img',
            type: 'varchar',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('inspections');
  }
}
