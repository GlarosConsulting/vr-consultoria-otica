import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import IInspectionsGlassRepository from '@modules/inspections/repositories/IInspectionsGlassRepository';

import InspectionGlass from '../infra/typeorm/entities/InspectionGlass';

interface IRequest {
  inspection_id: string;
  img_filename: string;
  name: string;
}

@injectable()
class CreateInspectionGlassService {
  constructor(
    @inject('InspectionsGlassRepository')
    private inspectionGlassRepository: IInspectionsGlassRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    inspection_id,
    img_filename,
    name,
  }: IRequest): Promise<InspectionGlass> {
    const filename = await this.storageProvider.saveFile(img_filename);

    const inspectionGlass = await this.inspectionGlassRepository.create({
      inspection_id,
      img_filename: filename,
      name,
    });

    return inspectionGlass;
  }
}

export default CreateInspectionGlassService;
