import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateInspectionService from '@modules/inspections/services/CreateInspectionService';
import ListInspectionsService from '@modules/inspections/services/ListInspectionsService';
import UpdateInspectionsImagesService from '@modules/inspections/services/UpdateInspectionsImagesService';

export default class InspectionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, is_detailed } = request.body;
    const files = request.files as {
      [fieldName: string]: Express.Multer.File[];
    };

    const getFilename = (file: Express.Multer.File[]) =>
      file ? file[0].filename : undefined;

    const getMultipleFilenames = (file: Express.Multer.File[]) =>
      file ? file.map(fi => fi.filename) : undefined;

    const createInspection = container.resolve(CreateInspectionService);

    const inspection = await createInspection.execute({
      user_id,
      is_detailed,
      filenames: {
        forward: getFilename(files.forward),
        croup: getFilename(files.croup),
        left_side: getFilename(files.left_side),
        right_side: getFilename(files.right_side),
        motor: getFilename(files.motor),
        chassi: getFilename(files.chassi),
        document: getFilename(files.document),
        panel: getFilename(files.panel),
        forward_left: getFilename(files.forward_left),
        forward_right: getFilename(files.forward_right),
        rear_left: getFilename(files.rear_left),
        rear_right: getFilename(files.rear_right),
        forward_right_with_opened_hood: getFilename(
          files.forward_right_with_opened_hood,
        ),
        forward_left_with_opened_hood: getFilename(
          files.forward_left_with_opened_hood,
        ),
        forward_with_opened_hood: getFilename(files.forward_with_opened_hood),
        rear_plate: getFilename(files.rear_plate),
        opened_trunk: getFilename(files.opened_trunk),
        seal_plate: getFilename(files.seal_plate),
        spare_tire: getFilename(files.spare_tire),
        key: getFilename(files.key),
        forward_right_wheel: getFilename(files.forward_right_wheel),
        forward_left_wheel: getFilename(files.forward_left_wheel),
        rear_left_wheel: getFilename(files.rear_left_wheel),
        rear_right_wheel: getFilename(files.rear_right_wheel),
        left_column: getFilename(files.left_column),
        right_column: getFilename(files.right_column),
        pedometer: getFilename(files.pedometer),
        forward_right_tire: getFilename(files.forward_right_tire),
        forward_left_tire: getFilename(files.forward_left_tire),
        rear_right_tire: getFilename(files.rear_right_tire),
        rear_left_tire: getFilename(files.rear_left_tire),
        console: getFilename(files.console),
        engine_number: getFilename(files.engine_number),
        forward_right_buffer: getFilename(files.forward_right_buffer),
        forward_left_buffer: getFilename(files.forward_left_buffer),
        rear_right_buffer: getFilename(files.rear_right_buffer),
        rear_left_buffer: getFilename(files.rear_left_buffer),
      },
      breakdowns: getMultipleFilenames(files.breakdown),
      right_glass: getMultipleFilenames(files.right_glass),
      left_glass: getMultipleFilenames(files.left_glass),
      forward_glass: getMultipleFilenames(files.forward_glass),
      rear_glass: getMultipleFilenames(files.rear_glass),
    });

    return response.json(classToClass(inspection));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { start_date, end_date, status } = request.query;

    const listInspections = container.resolve(ListInspectionsService);

    const inspections = await listInspections.execute({
      start_date,
      end_date,
      status,
    } as any);

    return response.json(classToClass(inspections));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const files = request.files as {
      [fieldName: string]: Express.Multer.File[];
    };

    const getFilename = (file: Express.Multer.File[]) =>
      file ? file[0].filename : undefined;

    const getMultipleFilenames = (file: Express.Multer.File[]) =>
      file ? file.map(fi => fi.filename) : undefined;

    const filenames = {
      forward: getFilename(files.forward),
      croup: getFilename(files.croup),
      left_side: getFilename(files.left_side),
      right_side: getFilename(files.right_side),
      motor: getFilename(files.motor),
      chassi: getFilename(files.chassi),
      document: getFilename(files.document),
      panel: getFilename(files.panel),
      forward_left: getFilename(files.forward_left),
      forward_right: getFilename(files.forward_right),
      rear_left: getFilename(files.rear_left),
      rear_right: getFilename(files.rear_right),
      forward_right_with_opened_hood: getFilename(
        files.forward_right_with_opened_hood,
      ),
      forward_left_with_opened_hood: getFilename(
        files.forward_left_with_opened_hood,
      ),
      forward_with_opened_hood: getFilename(files.forward_with_opened_hood),
      rear_plate: getFilename(files.rear_plate),
      opened_trunk: getFilename(files.opened_trunk),
      seal_plate: getFilename(files.seal_plate),
      spare_tire: getFilename(files.spare_tire),
      key: getFilename(files.key),
      forward_right_wheel: getFilename(files.forward_right_wheel),
      forward_left_wheel: getFilename(files.forward_left_wheel),
      rear_left_wheel: getFilename(files.rear_left_wheel),
      rear_right_wheel: getFilename(files.rear_right_wheel),
      left_column: getFilename(files.left_column),
      right_column: getFilename(files.right_column),
      pedometer: getFilename(files.pedometer),
      forward_right_tire: getFilename(files.forward_right_tire),
      forward_left_tire: getFilename(files.forward_left_tire),
      rear_right_tire: getFilename(files.rear_right_tire),
      rear_left_tire: getFilename(files.rear_left_tire),
      console: getFilename(files.console),
      engine_number: getFilename(files.engine_number),
      forward_right_buffer: getFilename(files.forward_right_buffer),
      forward_left_buffer: getFilename(files.forward_left_buffer),
      rear_right_buffer: getFilename(files.rear_right_buffer),
      rear_left_buffer: getFilename(files.rear_left_buffer),
      breakdowns: getMultipleFilenames(files.breakdown),
      right_glass: getMultipleFilenames(files.right_glass),
      left_glass: getMultipleFilenames(files.left_glass),
      forward_glass: getMultipleFilenames(files.forward_glass),
      rear_glass: getMultipleFilenames(files.rear_glass),
    };
    const updateInspectionsFiles = container.resolve(
      UpdateInspectionsImagesService,
    );

    const updateInspection = await updateInspectionsFiles.execute({
      id,
      filenames,
    });

    return response.json(updateInspection);
  }
}
