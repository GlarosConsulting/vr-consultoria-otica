import { Status } from '../infra/typeorm/entities/MonthlyPayment';

export default interface IListMonthlyPaymentDTO {
  name?: string;
  start_date?: Date;
  end_date?: Date;
  status?: Status;
}
