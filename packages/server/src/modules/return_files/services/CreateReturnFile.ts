import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import ReturnFiles from '@modules/return_files/infra/typeorm/entities/ReturnFiles';
import IReturnFilesRepository from '@modules/return_files/repositories/IReturnFilesRepository';

interface IRequest {
  user_id: string;
  file: string;
}

@injectable()
class CreateReturnFilesService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('ReturnFilesRepository')
    private returnFilesRepository: IReturnFilesRepository,
  ) {}

  public async execute({ user_id, file }: IRequest): Promise<ReturnFiles> {
    const filename = await this.storageProvider.saveFile(file);

    const createdFile = this.returnFilesRepository.create({
      name: filename,
      user_id,
    });

    return createdFile;
  }
}

export default CreateReturnFilesService;
