import {
  Between,
  getRepository,
  LessThan,
  Like,
  MoreThan,
  Repository,
} from 'typeorm';

import ICreateMonthlyPaymentDTO from '@modules/monthly_payments/dtos/ICreateMonthlyPaymentDTO';
import IListMonthlyPaymentDTO from '@modules/monthly_payments/dtos/IListMonthlyPaymentDTO';
import IMonthlyPaymentRepository from '@modules/monthly_payments/repositories/IMonthlyPaymentRepository';

import MonthlyPayment from '../entities/MonthlyPayment';

class MonthlyPaymentRepository implements IMonthlyPaymentRepository {
  private ormRepository: Repository<MonthlyPayment>;

  constructor() {
    this.ormRepository = getRepository(MonthlyPayment);
  }

  public async find({
    start_date,
    end_date,
    name,
    status,
  }: IListMonthlyPaymentDTO): Promise<MonthlyPayment[] | undefined> {
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

    const monthlyPayment = await this.ormRepository.find({
      order: { created_at: 'DESC' },
      where: {
        ...(dateCriteria && { created_at: dateCriteria }),
        ...(status && { status }),
        ...(name && { name: Like(`%${name}%`) }),
      },
    });

    return monthlyPayment;
  }

  public async findById(id: string): Promise<MonthlyPayment | undefined> {
    const monthlyPayment = await this.ormRepository.findOne(id);

    return monthlyPayment;
  }

  public async create(data: ICreateMonthlyPaymentDTO): Promise<MonthlyPayment> {
    const monthlyPayment = this.ormRepository.create(data);

    await this.ormRepository.save(monthlyPayment);

    return monthlyPayment;
  }

  public async save(monthlyPayment: MonthlyPayment): Promise<MonthlyPayment> {
    return this.ormRepository.save(monthlyPayment);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}

export default MonthlyPaymentRepository;
