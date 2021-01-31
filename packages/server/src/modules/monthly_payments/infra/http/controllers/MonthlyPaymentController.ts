import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMonthlyPaymentService from '@modules/monthly_payments/services/CreateMonthlyPaymentService';
import ListMonthlyPaymentService from '@modules/monthly_payments/services/ListMonthlyPaymentService';

export default class MonthlyPayment {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, title_number, due_date, value, status } = request.body;

    const createMonthlyPaymentService = container.resolve(
      CreateMonthlyPaymentService,
    );

    const monthlyPayment = await createMonthlyPaymentService.execute({
      name,
      title_number,
      due_date,
      value,
      status,
    });

    return response.json(classToClass(monthlyPayment));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { start_date, end_date, name, status } = request.query;

    const listMonthlyPayment = container.resolve(ListMonthlyPaymentService);

    const monthlyPayment = await listMonthlyPayment.execute({
      start_date,
      end_date,
      name,
      status,
    } as any);

    return response.json(classToClass(monthlyPayment));
  }
}
