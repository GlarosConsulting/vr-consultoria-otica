import ICreateMonthlyPaymentDTO from '../dtos/ICreateMonthlyPaymentDTO';
import IListMonthlyPaymentDTO from '../dtos/IListMonthlyPaymentDTO';
import MonthlyPayment from '../infra/typeorm/entities/MonthlyPayment';

export default interface IMonthlyPaymentRepository {
  find(filters: IListMonthlyPaymentDTO): Promise<MonthlyPayment[] | undefined>;
  findById(id: string): Promise<MonthlyPayment | undefined>;
  create(data: ICreateMonthlyPaymentDTO): Promise<MonthlyPayment>;
  save(monthlyPayment: MonthlyPayment): Promise<MonthlyPayment>;
  delete(id: string): Promise<void>;
}
