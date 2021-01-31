import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateStatusInspectionService from '@modules/inspections/services/UpdateStatusInspectionService';

export default class InspectionsStatusController {
  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { status } = request.body;

    const updateStatusInspectionService = container.resolve(
      UpdateStatusInspectionService,
    );

    const inspection = await updateStatusInspectionService.execute({
      id,
      status,
    });

    return response.json(classToClass(inspection));
  }
}
