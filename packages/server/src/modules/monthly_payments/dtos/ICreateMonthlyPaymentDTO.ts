import { Status } from '../infra/typeorm/entities/MonthlyPayment';

export default interface ICreateMonthlyPaymentDTO {
  name: string;
  title_number: string;
  due_date: Date;
  value: number;
  status: Status;
}
