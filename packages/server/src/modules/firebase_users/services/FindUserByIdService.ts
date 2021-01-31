import AppError from '@shared/errors/AppError';

import firebaseAdmin from '../lib/firebaseAdmin';

class FindUserByIdService {
  public async execute(
    uid: string,
  ): Promise<firebaseAdmin.auth.UserRecord | undefined> {
    try {
      const user = await firebaseAdmin.auth().getUser(uid);

      return user;
    } catch (err) {
      if (err.errorInfo.code === 'auth/user-not-found') {
        throw new AppError('User not found.', 404);
      }

      return undefined;
    }
  }
}

export default FindUserByIdService;
