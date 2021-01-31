import * as firebaseAdmin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin/lib/credential/index';

import * as serviceAccountKey from './teste-99b30-firebase-adminsdk-0e905-fd0f00a873.json';
// import firebaseAdminConfig from '@/config/firebaseAdmin';

if (!firebaseAdmin.apps.length) {
  const serviceAccount = serviceAccountKey;

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: 'https://teste-99b30.firebaseio.com',
  });
}

export default firebaseAdmin;
