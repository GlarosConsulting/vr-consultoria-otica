import { getRepository, Repository } from 'typeorm';

import ICreateBreakdownsDTO from '@modules/inspections/dtos/ICreateBreakdownsDTO';
import IInspectionsBreakdownsRepository from '@modules/inspections/repositories/IInspectionsBreakdownsRepository';

import InspectionBreakdown from '../entities/InspectionBreakdown';

class InspectionsBreakdownsRepository
  implements IInspectionsBreakdownsRepository {
  private ormRepository: Repository<InspectionBreakdown>;

  constructor() {
    this.ormRepository = getRepository(InspectionBreakdown);
  }

  public async create(
    data: ICreateBreakdownsDTO,
  ): Promise<InspectionBreakdown> {
    const breakdown = this.ormRepository.create(data);

    await this.ormRepository.save(breakdown);

    return breakdown;
  }

  public async save(
    breakdown: InspectionBreakdown,
  ): Promise<InspectionBreakdown> {
    return this.ormRepository.save(breakdown);
  }
}

export default InspectionsBreakdownsRepository;
