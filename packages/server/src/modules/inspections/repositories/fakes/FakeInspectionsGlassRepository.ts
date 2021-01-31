import merge from 'lodash/merge';
import { v4 } from 'uuid';

import ICreateInspectionGlassDTO from '@modules/inspections/dtos/ICreateInspectionGlassDTO';
import InspectionGlass from '@modules/inspections/infra/typeorm/entities/InspectionGlass';

import IInspectionsGlassRepository from '../IInspectionsGlassRepository';

class FakeInspectionsGlassRepository implements IInspectionsGlassRepository {
  private inspections: InspectionGlass[] = [];

  public async create(
    data: ICreateInspectionGlassDTO,
  ): Promise<InspectionGlass> {
    const inspectionGlass = new InspectionGlass();

    merge(
      InspectionGlass,
      { id: v4(), created_at: new Date(), updated_at: new Date() },
      data,
    );

    this.inspections.push(inspectionGlass);

    return inspectionGlass;
  }

  public async save(inspection: InspectionGlass): Promise<InspectionGlass> {
    const findIndex = this.inspections.findIndex(
      findInspection => findInspection.id === inspection.id,
    );

    this.inspections[findIndex] = inspection;

    return inspection;
  }
}

export default FakeInspectionsGlassRepository;
