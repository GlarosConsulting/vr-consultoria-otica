import { container } from 'tsyringe';

import './providers';

import CashHandlingRepository from '@modules/cash_handling/infra/typeorm/repositories/CashHandlingRepository';
import ICashHandlingRepository from '@modules/cash_handling/repositories/ICashHandlingRepository';
import InspectionsBreakdownsRepository from '@modules/inspections/infra/typeorm/repositories/InspectionsBreakdownsRepository';
import InspectionsGlassRepository from '@modules/inspections/infra/typeorm/repositories/InspectionsGlassRepository';
import InspectionsRepository from '@modules/inspections/infra/typeorm/repositories/InspectionsRepository';
import IInspectionsBreakdownsRepository from '@modules/inspections/repositories/IInspectionsBreakdownsRepository';
import IInspectionsGlassRepository from '@modules/inspections/repositories/IInspectionsGlassRepository';
import IInspectionsRepository from '@modules/inspections/repositories/IInspectionsRepository';
import MonthlyPaymentRepository from '@modules/monthly_payments/infra/typeorm/repositories/MonthlyPaymentRepository';
import IMonthlyPaymentRepository from '@modules/monthly_payments/repositories/IMonthlyPaymentRepository';
import ReturnFilesRepository from '@modules/return_files/infra/typeorm/repositories/ReturnFilesRepository';
import IReturnFilesRepository from '@modules/return_files/repositories/IReturnFilesRepository';

container.registerSingleton<IInspectionsRepository>(
  'InspectionsRepository',
  InspectionsRepository,
);

container.registerSingleton<IInspectionsBreakdownsRepository>(
  'InspectionsBreakdownsRepository',
  InspectionsBreakdownsRepository,
);

container.registerSingleton<IInspectionsGlassRepository>(
  'InspectionsGlassRepository',
  InspectionsGlassRepository,
);

container.registerSingleton<ICashHandlingRepository>(
  'CashHandlingRepository',
  CashHandlingRepository,
);

container.registerSingleton<IReturnFilesRepository>(
  'ReturnFilesRepository',
  ReturnFilesRepository,
);

container.registerSingleton<IMonthlyPaymentRepository>(
  'MonthlyPaymentRepository',
  MonthlyPaymentRepository,
);
