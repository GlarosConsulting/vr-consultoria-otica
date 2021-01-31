import { endOfDay, startOfDay } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import ReturnFiles from '@modules/return_files/infra/typeorm/entities/ReturnFiles';
import IReturnFilesRepository from '@modules/return_files/repositories/IReturnFilesRepository';

interface IRequest {
  start_date?: Date;
  end_date?: Date;
}

@injectable()
class CreateReturnFilesService {
  constructor(
    @inject('ReturnFilesRepository')
    private returnFilesRepository: IReturnFilesRepository,
  ) {}

  public async execute({
    start_date,
    end_date,
  }: IRequest): Promise<ReturnFiles[]> {
    const files = this.returnFilesRepository.find({
      start_date: start_date ? startOfDay(start_date) : undefined,
      end_date: end_date ? endOfDay(end_date) : undefined,
    });

    return files;
  }
}

export default CreateReturnFilesService;
