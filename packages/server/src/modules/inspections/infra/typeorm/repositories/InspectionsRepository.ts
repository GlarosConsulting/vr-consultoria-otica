import {
  Between,
  getRepository,
  LessThan,
  MoreThan,
  Repository,
} from 'typeorm';

import ICreateInspectionDTO from '@modules/inspections/dtos/ICreateInspectionDTO';
import IFindAllInspectionsDTO from '@modules/inspections/dtos/IFindAllInspectionsDTO';
import Inspection from '@modules/inspections/infra/typeorm/entities/Inspection';
import IInspectionsRepository from '@modules/inspections/repositories/IInspectionsRepository';

class InspectionsRepository implements IInspectionsRepository {
  private ormRepository: Repository<Inspection>;

  constructor() {
    this.ormRepository = getRepository(Inspection);
  }

  public async findFilterInspections({
    start_date,
    end_date,
    status,
    is_detailed,
  }: IFindAllInspectionsDTO): Promise<Inspection[]> {
    let dateCriteria;

    if (start_date) {
      dateCriteria = MoreThan(end_date);
    }

    if (end_date) {
      dateCriteria = LessThan(start_date);
    }

    if (start_date && end_date) {
      dateCriteria = Between(start_date, end_date);
    }

    const inspections = await this.ormRepository.find({
      where: {
        ...(dateCriteria && { created_at: dateCriteria }),
        ...(status && { status }),
        ...{ is_detailed },
      },
      relations: ['breakdowns', 'glass'],
    });

    return inspections;
  }

  public async findAll({
    start_date,
    end_date,
    status,
  }: IFindAllInspectionsDTO): Promise<Inspection[]> {
    let dateCriteria;

    if (start_date) {
      dateCriteria = MoreThan(end_date);
    }

    if (end_date) {
      dateCriteria = LessThan(start_date);
    }

    if (start_date && end_date) {
      dateCriteria = Between(start_date, end_date);
    }

    const inspections = await this.ormRepository.find({
      where: {
        ...(dateCriteria && { created_at: dateCriteria }),
        ...(status && { status }),
      },
      relations: ['breakdowns', 'glass'],
    });

    return inspections;
  }

  public async findById(id: string): Promise<Inspection | undefined> {
    const inspection = await this.ormRepository.findOne(id);

    return inspection;
  }

  public async create(data: ICreateInspectionDTO): Promise<Inspection> {
    const inspection = this.ormRepository.create(data);

    await this.ormRepository.save(inspection);

    return inspection;
  }

  public async save(inspection: Inspection): Promise<Inspection> {
    return this.ormRepository.save(inspection);
  }
}

export default InspectionsRepository;
