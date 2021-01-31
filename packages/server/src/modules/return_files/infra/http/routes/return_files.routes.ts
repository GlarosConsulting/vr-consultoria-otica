import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ReturnFilesController from '../controllers/ReturnFilesController';

const returnFilesRouter = Router();
const returnFilesController = new ReturnFilesController();
const upload = multer(uploadConfig.multer);

returnFilesRouter.post(
  '/',
  upload.single('file'),
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().id().required(),
    },
  }),
  returnFilesController.create,
);

returnFilesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      start_date: Joi.date().allow(null),
      end_date: Joi.date().allow(null),
    },
  }),
  returnFilesController.index,
);

export default returnFilesRouter;
