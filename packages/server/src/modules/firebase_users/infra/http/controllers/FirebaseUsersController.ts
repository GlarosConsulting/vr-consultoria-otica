import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindUserByIdService from '@modules/firebase_users/services/FindUserByIdService';

export default class FirebaseUsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { uid } = request.params;

    const findUsersById = container.resolve(FindUserByIdService);

    const user = await findUsersById.execute(uid);

    return response.json(user);
  }
}
