import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import DetailedInspectionsController from '../controllers/DetailedInspectionsController';
import InspectionsController from '../controllers/InspectionsController';
import InspectionsStatusController from '../controllers/InspectionsStatusController';
import NotDetailedInspectionsController from '../controllers/NotDetailedInspectionsController';

const inspectionsRouter = Router();
const notDetailedInspectionsController = new NotDetailedInspectionsController();
const detailedInspectionsController = new DetailedInspectionsController();
const inspectionsStatusController = new InspectionsStatusController();
const inspectionsController = new InspectionsController();

const upload = multer(uploadConfig.multer);

inspectionsRouter.get(
  '/not-detailed',
  celebrate({
    [Segments.QUERY]: {
      start_date: Joi.date(),
      end_date: Joi.date(),
      status: Joi.string().valid('pending', 'approved', 'refused'),
    },
  }),
  notDetailedInspectionsController.index,
);

inspectionsRouter.get(
  '/detailed',
  celebrate({
    [Segments.QUERY]: {
      start_date: Joi.date(),
      end_date: Joi.date(),
      status: Joi.string().valid('pending', 'approved', 'refused'),
    },
  }),
  detailedInspectionsController.index,
);

inspectionsRouter.get('/', inspectionsController.index);

inspectionsRouter.post(
  '/',
  upload.fields([
    { name: 'forward', maxCount: 1 },
    { name: 'croup', maxCount: 1 },
    { name: 'left_side', maxCount: 1 },
    { name: 'right_side', maxCount: 1 },
    { name: 'motor', maxCount: 1 },
    { name: 'chassi', maxCount: 1 },
    { name: 'document', maxCount: 1 },
    { name: 'panel', maxCount: 1 },
    { name: 'forward_left', maxCount: 1 },
    { name: 'forward_right', maxCount: 1 },
    { name: 'rear_left', maxCount: 1 },
    { name: 'rear_right', maxCount: 1 },
    { name: 'forward_right_with_opened_hood', maxCount: 1 },
    { name: 'forward_left_with_opened_hood', maxCount: 1 },
    { name: 'forward_with_opened_hood', maxCount: 1 },
    { name: 'rear_plate', maxCount: 1 },
    { name: 'opened_trunk', maxCount: 1 },
    { name: 'seal_plate', maxCount: 1 },
    { name: 'spare_tire', maxCount: 1 },
    { name: 'key', maxCount: 1 },
    { name: 'forward_right_wheel', maxCount: 1 },
    { name: 'forward_left_wheel', maxCount: 1 },
    { name: 'rear_left_wheel', maxCount: 1 },
    { name: 'rear_right_wheel', maxCount: 1 },
    { name: 'left_column', maxCount: 1 },
    { name: 'right_column', maxCount: 1 },
    { name: 'pedometer', maxCount: 1 },
    { name: 'forward_right_tire', maxCount: 1 },
    { name: 'forward_left_tire', maxCount: 1 },
    { name: 'rear_right_tire', maxCount: 1 },
    { name: 'rear_left_tire', maxCount: 1 },
    { name: 'console', maxCount: 1 },
    { name: 'engine_number', maxCount: 1 },
    { name: 'forward_right_buffer', maxCount: 1 },
    { name: 'forward_left_buffer', maxCount: 1 },
    { name: 'rear_right_buffer', maxCount: 1 },
    { name: 'rear_left_buffer', maxCount: 1 },
    { name: 'breakdown' },
    { name: 'forward_glass' },
    { name: 'rear_glass' },
    { name: 'right_glass' },
    { name: 'left_glass' },
  ]),
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      is_detailed: Joi.boolean().default(false),
    },
  }),
  inspectionsController.create,
);

inspectionsRouter.put(
  '/:id',
  upload.fields([
    { name: 'forward', maxCount: 1 },
    { name: 'croup', maxCount: 1 },
    { name: 'left_side', maxCount: 1 },
    { name: 'right_side', maxCount: 1 },
    { name: 'motor', maxCount: 1 },
    { name: 'chassi', maxCount: 1 },
    { name: 'document', maxCount: 1 },
    { name: 'panel', maxCount: 1 },
    { name: 'forward_left', maxCount: 1 },
    { name: 'forward_right', maxCount: 1 },
    { name: 'rear_left', maxCount: 1 },
    { name: 'rear_right', maxCount: 1 },
    { name: 'forward_right_with_opened_hood', maxCount: 1 },
    { name: 'forward_left_with_opened_hood', maxCount: 1 },
    { name: 'forward_with_opened_hood', maxCount: 1 },
    { name: 'rear_plate', maxCount: 1 },
    { name: 'opened_trunk', maxCount: 1 },
    { name: 'seal_plate', maxCount: 1 },
    { name: 'spare_tire', maxCount: 1 },
    { name: 'key', maxCount: 1 },
    { name: 'forward_right_wheel', maxCount: 1 },
    { name: 'forward_left_wheel', maxCount: 1 },
    { name: 'rear_left_wheel', maxCount: 1 },
    { name: 'rear_right_wheel', maxCount: 1 },
    { name: 'left_column', maxCount: 1 },
    { name: 'right_column', maxCount: 1 },
    { name: 'pedometer', maxCount: 1 },
    { name: 'forward_right_tire', maxCount: 1 },
    { name: 'forward_left_tire', maxCount: 1 },
    { name: 'rear_right_tire', maxCount: 1 },
    { name: 'rear_left_tire', maxCount: 1 },
    { name: 'console', maxCount: 1 },
    { name: 'engine_number', maxCount: 1 },
    { name: 'forward_right_buffer', maxCount: 1 },
    { name: 'forward_left_buffer', maxCount: 1 },
    { name: 'rear_right_buffer', maxCount: 1 },
    { name: 'rear_left_buffer', maxCount: 1 },
    { name: 'breakdown' },
    { name: 'forward_glass' },
    { name: 'rear_glass' },
    { name: 'right_glass' },
    { name: 'left_glass' },
  ]),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  inspectionsController.update,
);

inspectionsRouter.patch(
  '/status/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      status: Joi.string().required().valid('pending', 'approved', 'refused'),
    },
  }),
  inspectionsStatusController.update,
);

export default inspectionsRouter;
