import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateReturnFile from '@modules/return_files/services/CreateReturnFile';
import ListReturnFiles from '@modules/return_files/services/ListReturnFiles';

export default class ReturnFilesControler {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;
    const file = request.file.filename;

    const createReturnFile = container.resolve(CreateReturnFile);

    const createdFile = await createReturnFile.execute({ user_id, file });

    return response.json(createdFile);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { start_date, end_date } = request.query;

    const listReturnFiles = container.resolve(ListReturnFiles);

    const returnFiles = await listReturnFiles.execute({
      start_date,
      end_date,
    } as any);

    return response.json(returnFiles);
  }
}
