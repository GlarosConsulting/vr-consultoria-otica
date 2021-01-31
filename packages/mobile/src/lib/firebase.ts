import firebase from 'firebase';

import 'firebase/auth';

import firebaseConfig from '../config/firebase';

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
