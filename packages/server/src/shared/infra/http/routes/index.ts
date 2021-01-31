import { Router } from 'express';

import cashHandlingRouter from '@modules/cash_handling/infra/http/routes/cash_handling.routes';
import firebaseUsersRouter from '@modules/firebase_users/infra/http/routes/firebase_users.routes';
import inspectionsRouter from '@modules/inspections/infra/http/routes/inspections.routes';
import monthlyPaymentsRouter from '@modules/monthly_payments/infra/http/routes/monthly_payments.routes';
import returnFilesRouter from '@modules/return_files/infra/http/routes/return_files.routes';

const routes = Router();

routes.use('/inspections', inspectionsRouter);
routes.use('/cash-handling', cashHandlingRouter);
routes.use('/return-files', returnFilesRouter);
routes.use('/firebase-users', firebaseUsersRouter);
routes.use('/monthly-payments', monthlyPaymentsRouter);

routes.get('/', (_request, response) =>
  response.json({
    name: 'Brasil Car API',
    version: '1.0.0',
  }),
);

export default routes;
