import { addDays, endOfDay } from 'date-fns';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import FakeInspectionsBreakdownsRepository from '@modules/inspections/repositories/fakes/FakeInspectionsBreakdownsRepository';
import FakeInspectionsGlassRepository from '@modules/inspections/repositories/fakes/FakeInspectionsGlassRepository';
import FakeInspectionsRepository from '@modules/inspections/repositories/fakes/FakeInspectionsRepository';

import CreateInspectionService from './CreateInspectionService';

let fakeInspectionsRepository: FakeInspectionsRepository;
let fakeInspectionsGlassRepository: FakeInspectionsGlassRepository;
let fakeInspectionsBreakdownsRepository: FakeInspectionsBreakdownsRepository;
let fakeStorageProvider: FakeStorageProvider;
let createInspection: CreateInspectionService;

describe('CreateInspection', () => {
  beforeEach(() => {
    fakeInspectionsRepository = new FakeInspectionsRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeInspectionsBreakdownsRepository = new FakeInspectionsBreakdownsRepository();

    createInspection = new CreateInspectionService(
      fakeInspectionsRepository,
      fakeInspectionsBreakdownsRepository,
      fakeInspectionsGlassRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new inspection', async () => {
    const inspection = await createInspection.execute({
      user_id: '123456',
      is_detailed: false,
      filenames: {
        forward: '',
        croup: '',
        left_side: '',
        right_side: '',
        motor: '',
        chassi: '',
        document: '',
        panel: '',
      },
    });

    const limitDate = addDays(endOfDay(Date.now()), 3);

    expect(inspection).toEqual(
      expect.objectContaining({
        limit_date: limitDate,
        forward_img: '',
        croup_img: '',
        left_side_img: '',
        right_side_img: '',
        motor_img: '',
        chassi_img: '',
        document_img: '',
        panel_img: '',
      }),
    );
  });
});
