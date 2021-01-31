import ICreateBreakdownsDTO from '../dtos/ICreateBreakdownsDTO';
import InspectionBreakdown from '../infra/typeorm/entities/InspectionBreakdown';

export default interface IInspectionsBreakdownsRepository {
  create(data: ICreateBreakdownsDTO): Promise<InspectionBreakdown>;
  save(breakdown: ICreateBreakdownsDTO): Promise<InspectionBreakdown>;
}
