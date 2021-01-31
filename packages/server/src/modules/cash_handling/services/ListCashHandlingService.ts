import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CashHandling from '@modules/cash_handling/infra/typeorm/entities/CashHandling';
import ICashHandlingRepository from '@modules/cash_handling/repositories/ICashHandlingRepository';

@injectable()
class ListByDateIntervalService {
  constructor(
    @inject('CashHandlingRepository')
    private cashHandlingRepository: ICashHandlingRepository,
  ) {}

  public async execute(): Promise<CashHandling[]> {
    const cashHandling = await this.cashHandlingRepository.find();

    if (!cashHandling) {
      throw new AppError('Error.');
    }

    return cashHandling;
  }
}

export default ListByDateIntervalService;
