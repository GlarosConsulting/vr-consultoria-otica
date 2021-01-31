import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateImageColumnsToNullableFromInspectionsTable1611262458724
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('inspections', [
      {
        oldColumn: new TableColumn({
          name: 'forward_img',
          type: 'varchar',
        }),
        newColumn: new TableColumn({
          name: 'forward_img',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'croup_img',
          type: 'varchar',
        }),
        newColumn: new TableColumn({
          name: 'croup_img',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'left_side_img',
          type: 'varchar',
        }),
        newColumn: new TableColumn({
          name: 'left_side_img',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'right_side_img',
          type: 'varchar',
        }),
        newColumn: new TableColumn({
          name: 'right_side_img',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'motor_img',
          type: 'varchar',
        }),
        newColumn: new TableColumn({
          name: 'motor_img',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'chassi_img',
          type: 'varchar',
        }),
        newColumn: new TableColumn({
          name: 'chassi_img',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'document_img',
          type: 'varchar',
        }),
        newColumn: new TableColumn({
          name: 'document_img',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'panel_img',
          type: 'varchar',
        }),
        newColumn: new TableColumn({
          name: 'panel_img',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('inspections', [
      {
        oldColumn: new TableColumn({
          name: 'forward_img',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        }),
        newColumn: new TableColumn({
          name: 'forward_img',
          type: 'varchar',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'croup_img',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        }),
        newColumn: new TableColumn({
          name: 'croup_img',
          type: 'varchar',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'left_side_img',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        }),
        newColumn: new TableColumn({
          name: 'left_side_img',
          type: 'varchar',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'right_side_img',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        }),
        newColumn: new TableColumn({
          name: 'right_side_img',
          type: 'varchar',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'motor_img',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        }),
        newColumn: new TableColumn({
          name: 'motor_img',
          type: 'varchar',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'chassi_img',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        }),
        newColumn: new TableColumn({
          name: 'chassi_img',
          type: 'varchar',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'document_img',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        }),
        newColumn: new TableColumn({
          name: 'document_img',
          type: 'varchar',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'panel_img',
          type: 'varchar',
          isNullable: true,
          isUnique: true,
        }),
        newColumn: new TableColumn({
          name: 'panel_img',
          type: 'varchar',
        }),
      },
    ]);
  }
}
