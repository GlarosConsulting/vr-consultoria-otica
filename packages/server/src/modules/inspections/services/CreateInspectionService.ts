import { addDays, endOfDay } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import Inspection from '@modules/inspections/infra/typeorm/entities/Inspection';
import IInspectionsBreakdownsRepository from '@modules/inspections/repositories/IInspectionsBreakdownsRepository';
import IInspectionsGlassRepository from '@modules/inspections/repositories/IInspectionsGlassRepository';
import IInspectionsRepository from '@modules/inspections/repositories/IInspectionsRepository';
import CreateBreakdownsService from '@modules/inspections/services/CreateBreakdownsService';
import CreateInspectionGlassService from '@modules/inspections/services/CreateInspectionGlassService';

interface IRequest {
  user_id: string;
  is_detailed: boolean;
  filenames: {
    forward?: string;
    croup?: string;
    left_side?: string;
    right_side?: string;
    motor?: string;
    chassi?: string;
    document?: string;
    panel?: string;
    forward_left?: string;
    forward_right?: string;
    rear_left?: string;
    rear_right?: string;
    forward_right_with_opened_hood?: string;
    forward_left_with_opened_hood?: string;
    forward_with_opened_hood?: string;
    rear_plate?: string;
    opened_trunk?: string;
    seal_plate?: string;
    spare_tire?: string;
    key?: string;
    forward_right_wheel?: string;
    forward_left_wheel?: string;
    rear_left_wheel?: string;
    rear_right_wheel?: string;
    left_column?: string;
    right_column?: string;
    pedometer?: string;
    forward_right_tire?: string;
    forward_left_tire?: string;
    rear_right_tire?: string;
    rear_left_tire?: string;
    console?: string;
    engine_number?: string;
    forward_right_buffer?: string;
    forward_left_buffer?: string;
    rear_right_buffer?: string;
    rear_left_buffer?: string;
  };
  breakdowns?: string[];
  right_glass?: string[];
  left_glass?: string[];
  forward_glass?: string[];
  rear_glass?: string[];
}

interface IFilenames {
  forward?: string;
  croup?: string;
  left_side?: string;
  right_side?: string;
  motor?: string;
  chassi?: string;
  document?: string;
  panel?: string;
  forward_left?: string;
  forward_right?: string;
  rear_left?: string;
  rear_right?: string;
  forward_right_with_opened_hood?: string;
  forward_left_with_opened_hood?: string;
  forward_with_opened_hood?: string;
  rear_plate?: string;
  opened_trunk?: string;
  seal_plate?: string;
  spare_tire?: string;
  key?: string;
  forward_right_wheel?: string;
  forward_left_wheel?: string;
  rear_left_wheel?: string;
  rear_right_wheel?: string;
  left_column?: string;
  right_column?: string;
  pedometer?: string;
  forward_right_tire?: string;
  forward_left_tire?: string;
  rear_right_tire?: string;
  rear_left_tire?: string;
  console?: string;
  engine_number?: string;
  forward_right_buffer?: string;
  forward_left_buffer?: string;
  rear_right_buffer?: string;
  rear_left_buffer?: string;
}

@injectable()
class CreateInspectionService {
  private createBreakdownService: CreateBreakdownsService;

  private createInspectionGlassService: CreateInspectionGlassService;

  constructor(
    @inject('InspectionsRepository')
    private inspectionsRepository: IInspectionsRepository,

    @inject('InspectionsBreakdownsRepository')
    private inspectionsBreakdownsRepository: IInspectionsBreakdownsRepository,

    @inject('InspectionsGlassRepository')
    private inspectionsGlassRepository: IInspectionsGlassRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {
    this.createBreakdownService = new CreateBreakdownsService(
      inspectionsBreakdownsRepository,
      storageProvider,
    );

    this.createInspectionGlassService = new CreateInspectionGlassService(
      inspectionsGlassRepository,
      storageProvider,
    );
  }

  public async execute({
    user_id,
    filenames,
    breakdowns,
    right_glass,
    left_glass,
    forward_glass,
    rear_glass,
    is_detailed,
  }: IRequest): Promise<Inspection> {
    const allFilenames: Array<keyof typeof filenames> = [
      'forward',
      'croup',
      'left_side',
      'right_side',
      'motor',
      'chassi',
      'document',
      'panel',
      'forward_left',
      'forward_right',
      'rear_left',
      'rear_right',
      'forward_right_with_opened_hood',
      'forward_left_with_opened_hood',
      'forward_with_opened_hood',
      'rear_plate',
      'opened_trunk',
      'seal_plate',
      'spare_tire',
      'key',
      'forward_right_wheel',
      'forward_left_wheel',
      'rear_left_wheel',
      'rear_right_wheel',
      'left_column',
      'right_column',
      'pedometer',
      'forward_right_tire',
      'forward_left_tire',
      'rear_right_tire',
      'rear_left_tire',
      'console',
      'engine_number',
      'forward_right_buffer',
      'forward_left_buffer',
      'rear_right_buffer',
      'rear_left_buffer',
    ];

    const filledFiles = allFilenames.filter(
      file => filenames[file] !== undefined,
    );

    const filledFilenames = filledFiles.map(file =>
      this.storageProvider.saveFile(filenames[file] as string),
    );

    const savedFilledFilenames = await Promise.all(filledFilenames);

    const sentFilenames: IFilenames = {};

    for (let i = 0; i < filledFiles.length; i++) {
      sentFilenames[filledFiles[i]] = savedFilledFilenames[i];
    }

    const limitDate = addDays(endOfDay(Date.now()), 3);

    const inspection = await this.inspectionsRepository.create({
      user_id,
      is_detailed,
      limit_date: limitDate,
      forward_img: sentFilenames?.forward,
      croup_img: sentFilenames?.croup,
      left_side_img: sentFilenames?.left_side,
      right_side_img: sentFilenames?.right_side,
      motor_img: sentFilenames?.motor,
      chassi_img: sentFilenames?.chassi,
      document_img: sentFilenames?.document,
      panel_img: sentFilenames?.panel,
      forward_left_img: sentFilenames?.forward_left,
      forward_right_img: sentFilenames?.forward_right,
      rear_left_img: sentFilenames?.rear_left,
      rear_right_img: sentFilenames?.rear_right,
      forward_right_with_opened_hood_img:
        sentFilenames?.forward_right_with_opened_hood,
      forward_left_with_opened_hood_img:
        sentFilenames?.forward_left_with_opened_hood,
      forward_with_opened_hood_img: sentFilenames?.forward_with_opened_hood,
      rear_plate_img: sentFilenames?.rear_plate,
      opened_trunk_img: sentFilenames?.opened_trunk,
      seal_plate_img: sentFilenames?.seal_plate,
      spare_tire_img: sentFilenames?.spare_tire,
      key_img: sentFilenames?.key,
      forward_right_wheel_img: sentFilenames?.forward_right_wheel,
      forward_left_wheel_img: sentFilenames?.forward_left_wheel,
      rear_left_wheel_img: sentFilenames?.rear_left_wheel,
      rear_right_wheel_img: sentFilenames?.rear_right_wheel,
      left_column_img: sentFilenames?.left_column,
      right_column_img: sentFilenames?.right_column,
      pedometer_img: sentFilenames?.pedometer,
      forward_right_tire_img: sentFilenames?.forward_right_tire,
      forward_left_tire_img: sentFilenames?.forward_left_tire,
      rear_right_tire_img: sentFilenames?.rear_right_tire,
      rear_left_tire_img: sentFilenames?.rear_left_tire,
      console_img: sentFilenames?.console,
      engine_number_img: sentFilenames?.engine_number,
      forward_right_buffer_img: sentFilenames?.forward_right_buffer,
      forward_left_buffer_img: sentFilenames?.forward_left_buffer,
      rear_right_buffer_img: sentFilenames?.rear_right_buffer,
      rear_left_buffer_img: sentFilenames?.rear_left_buffer,
    });

    if (breakdowns) {
      const breakdownsPromises = breakdowns.map(breakdown =>
        this.createBreakdownService.execute({
          img_filename: breakdown,
          inspection_id: inspection.id,
        }),
      );

      await Promise.all(breakdownsPromises);
    }

    if (right_glass) {
      const glassPromises = right_glass.map(rightInspectionGlass =>
        this.createInspectionGlassService.execute({
          img_filename: rightInspectionGlass,
          inspection_id: inspection.id,
          name: 'vidro da lateral direita',
        }),
      );

      await Promise.all(glassPromises);
    }

    if (left_glass) {
      const glassPromises = left_glass.map(leftInspectionGlass =>
        this.createInspectionGlassService.execute({
          img_filename: leftInspectionGlass,
          inspection_id: inspection.id,
          name: 'vidoro da lateral esquerda',
        }),
      );

      await Promise.all(glassPromises);
    }

    if (forward_glass) {
      const glassPromises = forward_glass.map(forwardInspectionGlass =>
        this.createInspectionGlassService.execute({
          img_filename: forwardInspectionGlass,
          inspection_id: inspection.id,
          name: 'vidoro da dianteira',
        }),
      );

      await Promise.all(glassPromises);
    }

    if (rear_glass) {
      const glassPromises = rear_glass.map(rearInspectionGlass =>
        this.createInspectionGlassService.execute({
          img_filename: rearInspectionGlass,
          inspection_id: inspection.id,
          name: 'vidoro da traseira',
        }),
      );

      await Promise.all(glassPromises);
    }

    return inspection;
  }
}

export default CreateInspectionService;
