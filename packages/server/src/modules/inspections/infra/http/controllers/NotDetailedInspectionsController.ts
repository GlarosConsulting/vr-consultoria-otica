import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import listNotDetailedInspectionsService from '@modules/inspections/services/ListInspectionsService';

export default class NotDetailedInspectionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { start_date, end_date, status } = request.query;

    const listInspections = container.resolve(
      listNotDetailedInspectionsService,
    );

    const inspections = await listInspections.execute({
      start_date,
      end_date,
      status,
      is_detailed: false,
    } as any);

    return response.json(classToClass(inspections));
  }
}
