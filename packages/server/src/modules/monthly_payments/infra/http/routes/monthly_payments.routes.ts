import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import MonthlyPaymentController from '../controllers/MonthlyPaymentController';

const monthlyPaymentsRouter = Router();
const monthlyPaymentController = new MonthlyPaymentController();

monthlyPaymentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      title_number: Joi.string().required(),
      due_date: Joi.date().required(),
      value: Joi.number().required(),
      status: Joi.string().required().valid('paid', 'pending', 'opened'),
    },
  }),
  monthlyPaymentController.create,
);

monthlyPaymentsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      start_date: Joi.date().allow(null),
      end_date: Joi.date().allow(null),
      name: Joi.string().allow(null),
      status: Joi.number().allow(null).valid('paid', 'pending', 'opened'),
    },
  }),
  monthlyPaymentController.index,
);

export default monthlyPaymentsRouter;
