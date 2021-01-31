import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import FirebaseUsersController from '../controllers/FirebaseUsersController';

const firebaseUsersRouter = Router();
const firebaseUsersController = new FirebaseUsersController();

firebaseUsersRouter.get(
  '/:uid',
  celebrate({
    [Segments.PARAMS]: {
      uid: Joi.string().required(),
    },
  }),
  firebaseUsersController.index,
);

export default firebaseUsersRouter;
