import { startOfDay, endOfDay } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import MonthlyPayment from '@modules/monthly_payments/infra/typeorm/entities/MonthlyPayment';
import IMonthlyPaymentRepository from '@modules/monthly_payments/repositories/IMonthlyPaymentRepository';

import IListMonthlyPaymentDTO from '../dtos/IListMonthlyPaymentDTO';

@injectable()
class ListMonthlyPaymentService {
  constructor(
    @inject('MonthlyPaymentRepository')
    private monthlyPaymentRepository: IMonthlyPaymentRepository,
  ) {}

  public async execute({
    name,
    start_date,
    end_date,
    status,
  }: IListMonthlyPaymentDTO): Promise<MonthlyPayment[]> {
    const monthlyPayment = await this.monthlyPaymentRepository.find({
      name,
      start_date: start_date && startOfDay(start_date),
      end_date: end_date && endOfDay(end_date),
      status,
    });

    if (!monthlyPayment) {
      throw new AppError('Error.');
    }

    return monthlyPayment;
  }
}

export default ListMonthlyPaymentService;
