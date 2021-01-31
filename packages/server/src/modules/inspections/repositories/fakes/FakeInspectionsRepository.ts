import { isAfter, isBefore } from 'date-fns';
import merge from 'lodash/merge';
import { v4 } from 'uuid';

import ICreateInspectionDTO from '@modules/inspections/dtos/ICreateInspectionDTO';
import IFindAllInspectionsDTO from '@modules/inspections/dtos/IFindAllInspectionsDTO';
import Inspection from '@modules/inspections/infra/typeorm/entities/Inspection';

import IInspectionsRepository from '../IInspectionsRepository';

class FakeInspectionsRepository implements IInspectionsRepository {
  private inspections: Inspection[] = [];

  public async findAll({
    start_date,
    end_date,
    status,
  }: IFindAllInspectionsDTO): Promise<Inspection[]> {
    const filterInspections = this.inspections.filter(inspection => {
      if (start_date && !isAfter(inspection.created_at, start_date)) {
        return false;
      }

      if (end_date && !isBefore(inspection.created_at, end_date)) {
        return false;
      }

      if (status && inspection.status !== status) {
        return false;
      }

      return true;
    });

    return filterInspections;
  }

  public async findFilterInspections({
    start_date,
    end_date,
    status,
    is_detailed,
  }: IFindAllInspectionsDTO): Promise<Inspection[]> {
    const filterInspections = this.inspections.filter(inspection => {
      if (start_date && !isAfter(inspection.created_at, start_date)) {
        return false;
      }

      if (end_date && !isBefore(inspection.created_at, end_date)) {
        return false;
      }

      if (status && inspection.status !== status) {
        return false;
      }

      if (is_detailed && inspection.is_detailed !== is_detailed) {
        return false;
      }

      return true;
    });

    return filterInspections;
  }

  public async findById(id: string): Promise<Inspection | undefined> {
    const findInspection = this.inspections.find(
      inspection => inspection.id === id,
    );

    return findInspection;
  }

  public async create(data: ICreateInspectionDTO): Promise<Inspection> {
    const inspection = new Inspection();

    merge(
      inspection,
      { id: v4(), created_at: new Date(), updated_at: new Date() },
      data,
    );

    this.inspections.push(inspection);

    return inspection;
  }

  public async save(inspection: Inspection): Promise<Inspection> {
    const findIndex = this.inspections.findIndex(
      findInspection => findInspection.id === inspection.id,
    );

    this.inspections[findIndex] = inspection;

    return inspection;
  }
}

export default FakeInspectionsRepository;
