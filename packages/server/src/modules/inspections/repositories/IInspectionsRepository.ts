import IFindAllInspectionsDTO from '@modules/inspections/dtos/IFindAllInspectionsDTO';
import Inspection, {
  Status,
} from '@modules/inspections/infra/typeorm/entities/Inspection';

import ICreateInspectionDTO from '../dtos/ICreateInspectionDTO';

export default interface IInspectionsRepository {
  findAll({
    start_date,
    end_date,
    status,
  }: {
    start_date?: Date;
    end_date?: Date;
    status?: Status;
  }): Promise<Inspection[]>;
  findFilterInspections(data: IFindAllInspectionsDTO): Promise<Inspection[]>;
  findById(id: string): Promise<Inspection | undefined>;
  create(data: ICreateInspectionDTO): Promise<Inspection>;
  save(inspection: Inspection): Promise<Inspection>;
}
