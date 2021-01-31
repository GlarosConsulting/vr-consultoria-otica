import merge from 'lodash/merge';
import { v4 } from 'uuid';

import ICreateBreakdownsDTO from '@modules/inspections/dtos/ICreateBreakdownsDTO';
import InspectionBreakdown from '@modules/inspections/infra/typeorm/entities/InspectionBreakdown';

import IInspectionsBreakdownsRepository from '../IInspectionsBreakdownsRepository';

class FakeInspectionsBreakdownsRepository
  implements IInspectionsBreakdownsRepository {
  private breakdowns: InspectionBreakdown[] = [];

  public async create(
    data: ICreateBreakdownsDTO,
  ): Promise<InspectionBreakdown> {
    const breakdown = new InspectionBreakdown();

    merge(
      InspectionBreakdown,
      { id: v4(), created_at: new Date(), updated_at: new Date() },
      data,
    );

    this.breakdowns.push(breakdown);

    return breakdown;
  }

  public async save(
    breakdown: InspectionBreakdown,
  ): Promise<InspectionBreakdown> {
    const findIndex = this.breakdowns.findIndex(
      findBreakdown => findBreakdown.id === breakdown.id,
    );

    this.breakdowns[findIndex] = breakdown;

    return breakdown;
  }
}

export default FakeInspectionsBreakdownsRepository;
