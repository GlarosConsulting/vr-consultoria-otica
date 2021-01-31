import ICreateInspectionGlassDTO from '../dtos/ICreateInspectionGlassDTO';
import InspectionGlass from '../infra/typeorm/entities/InspectionGlass';

export default interface IInspectionsGlassRepository {
  create(data: ICreateInspectionGlassDTO): Promise<InspectionGlass>;
  save(InspectionGlass: ICreateInspectionGlassDTO): Promise<InspectionGlass>;
}
