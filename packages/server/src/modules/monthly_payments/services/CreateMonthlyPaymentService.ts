import { injectable, inject } from 'tsyringe';

import MonthlyPayment, {
  Status,
} from '@modules/monthly_payments/infra/typeorm/entities/MonthlyPayment';
import IMonthlyPaymentRepository from '@modules/monthly_payments/repositories/IMonthlyPaymentRepository';

interface IRequest {
  name: string;
  title_number: string;
  due_date: Date;
  value: number;
  status: Status;
}

@injectable()
class CreateMonthlyPaaymentService {
  constructor(
    @inject('MonthlyPaymentRepository')
    private monthlyPaymentRepository: IMonthlyPaymentRepository,
  ) {}

  public async execute({
    name,
    title_number,
    due_date,
    value,
    status,
  }: IRequest): Promise<MonthlyPayment> {
    const monthlyPayment = await this.monthlyPaymentRepository.create({
      name,
      title_number,
      due_date,
      value,
      status,
    });

    return monthlyPayment;
  }
}

export default CreateMonthlyPaaymentService;
