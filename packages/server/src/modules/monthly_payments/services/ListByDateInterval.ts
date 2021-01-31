import { endOfDay, startOfDay } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CashHandling from '@modules/cash_handling/infra/typeorm/entities/CashHandling';
import ICashHandlingRepository from '@modules/cash_handling/repositories/ICashHandlingRepository';

interface IRequest {
  initialDate: Date;
  finalDate: Date;
}

@injectable()
class ListByDateIntervalService {
  constructor(
    @inject('CashHandlingRepository')
    private cashHandlingRepository: ICashHandlingRepository,
  ) {}

  public async execute({
    initialDate,
    finalDate,
  }: IRequest): Promise<CashHandling[]> {
    const cashHandling = await this.cashHandlingRepository.findByDateInterval(
      startOfDay(initialDate),
      endOfDay(finalDate),
    );

    if (!cashHandling) {
      throw new AppError('Error.');
    }

    return cashHandling;
  }
}

export default ListByDateIntervalService;
