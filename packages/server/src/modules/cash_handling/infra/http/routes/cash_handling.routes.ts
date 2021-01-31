import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CashHandlingController from '../controllers/CashHandlingController';

const cashHandlingRouter = Router();
const cashHandlingController = new CashHandlingController();

cashHandlingRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      date: Joi.date().required(),
      bank_value: Joi.number().required(),
      return_value: Joi.number().required(),
      bank_tariff_value: Joi.number().required(),
      is_previous_balance: Joi.boolean(),
    },
  }),
  cashHandlingController.create,
);

cashHandlingRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      initialDate: Joi.date().allow(null),
      finalDate: Joi.date().allow(null),
    },
  }),
  cashHandlingController.index,
);

cashHandlingRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  cashHandlingController.delete,
);
export default cashHandlingRouter;
