import {
  Between,
  getRepository,
  LessThan,
  MoreThan,
  Repository,
} from 'typeorm';

import ICreateReturnFilesDTO from '@modules/return_files/dtos/ICreateReturnFilesDTO';
import IFindAllReturnFilesDTO from '@modules/return_files/dtos/IFIndAllReturnFilesDTO';
import IReturnFilesRepository from '@modules/return_files/repositories/IReturnFilesRepository';

import ReturnFiles from '../entities/ReturnFiles';

class ReturnFilesRepository implements IReturnFilesRepository {
  private ormRepository: Repository<ReturnFiles>;

  constructor() {
    this.ormRepository = getRepository(ReturnFiles);
  }

  public async find({
    start_date,
    end_date,
  }: IFindAllReturnFilesDTO): Promise<ReturnFiles[]> {
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

    const returnFiles = await this.ormRepository.find({
      where: {
        ...(dateCriteria && { created_at: dateCriteria }),
      },
    });

    return returnFiles;
  }

  public async create(data: ICreateReturnFilesDTO): Promise<ReturnFiles> {
    const returnFiles = this.ormRepository.create(data);

    await this.ormRepository.save(returnFiles);

    return returnFiles;
  }

  public async save(returnFiles: ReturnFiles): Promise<ReturnFiles> {
    return this.ormRepository.save(returnFiles);
  }
}

export default ReturnFilesRepository;
