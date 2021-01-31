import { Status } from '@modules/inspections/infra/typeorm/entities/Inspection';

export default interface IFindAllInspectionsDTO {
  start_date?: Date;
  end_date?: Date;
  status?: Status;
  is_detailed: boolean;
}
