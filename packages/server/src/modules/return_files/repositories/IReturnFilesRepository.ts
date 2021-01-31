import ICreateReturnFilesDTO from '../dtos/ICreateReturnFilesDTO';
import IFindAllReturnFilesDTO from '../dtos/IFIndAllReturnFilesDTO';
import ReturnFiles from '../infra/typeorm/entities/ReturnFiles';

export default interface IReturnFilesRepository {
  find(data: IFindAllReturnFilesDTO): Promise<ReturnFiles[]>;
  create(data: ICreateReturnFilesDTO): Promise<ReturnFiles>;
  save(user: ReturnFiles): Promise<ReturnFiles>;
}
