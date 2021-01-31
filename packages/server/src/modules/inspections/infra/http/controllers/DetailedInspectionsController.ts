import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListInspectionsService from '@modules/inspections/services/ListInspectionsService';

export default class DetailedInspectionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { start_date, end_date, status } = request.query;

    const listInspections = container.resolve(ListInspectionsService);

    const inspections = await listInspections.execute({
      start_date,
      end_date,
      status,
      is_detailed: true,
    } as any);

    return response.json(classToClass(inspections));
  }
}
