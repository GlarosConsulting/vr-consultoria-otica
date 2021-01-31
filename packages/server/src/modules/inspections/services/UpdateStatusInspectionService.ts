import { merge } from 'lodash';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Inspection, {
  Status,
} from '@modules/inspections/infra/typeorm/entities/Inspection';
import IInspectionsRepository from '@modules/inspections/repositories/IInspectionsRepository';

interface IRequest {
  id: string;
  status: Status;
}

@injectable()
class UpdateStatusInspectionService {
  constructor(
    @inject('InspectionsRepository')
    private inspectionsRepository: IInspectionsRepository,
  ) {}

  public async execute({ id, status }: IRequest): Promise<Inspection> {
    const inspection = await this.inspectionsRepository.findById(id);

    if (!inspection) {
      throw new AppError('Inspection not found', 404);
    }

    merge(inspection, { status });

    return this.inspectionsRepository.save(inspection);
  }
}

export default UpdateStatusInspectionService;
