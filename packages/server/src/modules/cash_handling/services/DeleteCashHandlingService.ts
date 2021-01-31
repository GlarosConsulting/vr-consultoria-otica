import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICashHandlingRepository from '@modules/cash_handling/repositories/ICashHandlingRepository';

interface IRequest {
  id: string;
}

@injectable()
class CreateInspectionService {
  constructor(
    @inject('CashHandlingRepository')
    private cashHandlingRepository: ICashHandlingRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const cashHandling = await this.cashHandlingRepository.findById(id);

    if (!cashHandling) {
      throw new AppError('cashHandling does not exists.');
    }

    await this.cashHandlingRepository.delete(id);
  }
}

export default CreateInspectionService;
