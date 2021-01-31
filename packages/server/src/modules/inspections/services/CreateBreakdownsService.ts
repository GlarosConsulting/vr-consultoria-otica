import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import IInspectionsBreakdownsRepository from '@modules/inspections/repositories/IInspectionsBreakdownsRepository';

import InspectionBreakdown from '../infra/typeorm/entities/InspectionBreakdown';

interface IRequest {
  inspection_id: string;
  img_filename: string;
}

@injectable()
class CreateBreakdownsService {
  constructor(
    @inject('InspectionsBreakdownsRepository')
    private inspectionsBreakdownsRepository: IInspectionsBreakdownsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    inspection_id,
    img_filename,
  }: IRequest): Promise<InspectionBreakdown> {
    const filename = await this.storageProvider.saveFile(img_filename);

    const breakdown = await this.inspectionsBreakdownsRepository.create({
      inspection_id,
      img_filename: filename,
    });

    return breakdown;
  }
}

export default CreateBreakdownsService;
