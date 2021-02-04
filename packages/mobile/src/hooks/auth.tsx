import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

import firebaseApp from '../lib/firebase';

interface ISignUpData {
  name: string;
  email: string;
  password: string;
}
interface IUser {
  data: firebase.User;
  additional: {
    company: string;
  };
}

export interface IAuthContextData {
  user?: IUser | null;
  loading: boolean;
  signInWithEmailAndPassword(email: string, password: string): Promise<void>;
  signUp(data: ISignUpData): Promise<void>;
  signOut(): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signInWithPhoneNumber(phoneNumber: string): Promise<any | undefined>;
  confirmPhoneCode(code: string, confirm: any): Promise<void>;
  passwordReset(email: string): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async updatedUser => {
      if (!updatedUser) {
        setUser(null);

        await AsyncStorage.removeItem('@VRConsultoriaOtica:user');
      } else {
        const data = await new Promise<any>(resolve =>
          firebaseApp
            .database()
            .ref(`users/${updatedUser.uid}`)
            .on('value', snapshot => resolve(snapshot.val())),
        );

        const newUser: IUser = {
          data: updatedUser,
          additional: data,
        };

        setUser(newUser);

        await AsyncStorage.setItem(
          '@VRConsultoriaOtica:user',
          JSON.stringify(newUser),
        );
      }
    });
  }, []);

  const signInWithEmailAndPassword = useCallback(async (email, password) => {
    try {
      setLoading(true);

      await firebaseApp.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
      throw new Error('error.');
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(
    async ({ name, email, password }: ISignUpData): Promise<void> => {
      try {
        const {
          user: newUser,
        } = await firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await newUser?.updateProfile({
          displayName: name,
        });

        await firebaseApp.database().ref(`users/${newUser?.uid}`).set({
          company: 'vr-consultoria-otica',
        });
      } catch (error) {
        throw new Error('error');
      }
    },
    [],
  );

  const signOut = useCallback(async () => {
    try {
      await firebaseApp.auth().signOut();

      setUser(undefined);
    } catch (error) {
      console.log(error);
    }
  }, [setUser]);

  const signInWithGoogle = useCallback(async () => {
    const isUserEqual = (googleUser, firebaseUser) => {
      if (firebaseUser) {
        const { providerData } = firebaseUser;

        for (let i = 0; i < providerData.length; i++) {
          if (
            providerData[i].providerId ===
              firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()
          ) {
            return true;
          }
        }
      }

      return false;
    };

    const onSignIn = (googleUser: Google.LogInResult) => {
      if (googleUser.type !== 'success') {
        return;
      }

      const unsubscribe = firebase
        .auth()
        .onAuthStateChanged(async firebaseUser => {
          unsubscribe();

          if (!isUserEqual(googleUser, firebaseUser)) {
            const credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken,
            );

            // Sign in with credential from the Google user.
            const {
              user: newUser,
            } = await firebase.auth().signInWithCredential(credential);

            await AsyncStorage.setItem(
              '@VRConsultoriaOtica:user',
              JSON.stringify(newUser),
            );

            await firebaseApp.database().ref(`users/${newUser?.uid}`).set({
              company: 'vr-consultoria-otica',
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        });
    };

    try {
      setLoading(true);

      const result = await Google.logInAsync({
        clientId:
          'com.googleusercontent.apps.824008646225-sa1qtdsrghqm778bk8hn1lek11sisd21',
        scopes: ['profile', 'email'],
      });

      onSignIn(result);
    } catch (err) {
      Alert.alert('Ocorreu um erro', JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  }, []);

  /* const signInWithGooglea = useCallback(async () => {
    console.log(GoogleSignIn.ERRORS);

    try {
      setLoading(true);

      await GoogleSignIn.initAsync({
        webClientId: '',
      });

      const { idToken } = await GoogleSignIn.signInAsync();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const { user: newUser } = await firebaseApp
        .auth()
        .signInWithCredential(googleCredential);

      await firebaseApp.database().ref(`users/${newUser?.uid}`).set({
        company: 'vr-consultoria-otica',
      });

      setUser(newUser as firebase.User);

      await AsyncStorage.setItem(
        '@VRConsultoriaOtica:user',
        JSON.stringify(newUser),
      );
    } catch (error) {
      Alert.alert('Ocorreu um erro', JSON.stringify(error));

      if (
        error.code !== GoogleSignIn.ERRORS.SIGN_IN_CANCELLED ||
        error.code !== GoogleSignIn.ERRORS.IN_PROGRESS ||
        error.code !== GoogleSignIn.ERRORS.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        throw new Error(error);
      }
    } finally {
      setLoading(false);
    }
  }, []); */

  const confirmPhoneCode = useCallback(async (code: string, confirm: any) => {
    try {
      if (!confirm) {
        throw new Error('error.');
      }

      const response = await confirm.confirm(code);

      if (!response) {
        throw new Error('error.');
      }

      const { user: newUser } = response;

      setUser(newUser);

      await AsyncStorage.setItem(
        '@VRConsultoriaOtica:user',
        JSON.stringify(newUser),
      );
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const signInWithPhoneNumber = useCallback(
    async (phoneNumber: string): Promise<any | undefined> => {
      setLoading(true);

      const confirmation = await firebaseApp
        .auth()
        .signInWithPhoneNumber(
          phoneNumber,
          new firebase.auth.RecaptchaVerifier('invisible'),
        );

      setLoading(false);

      return confirmation;
    },
    [],
  );

  const passwordReset = useCallback(async (email: string): Promise<void> => {
    await firebaseApp.auth().sendPasswordResetEmail(email);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithEmailAndPassword,
        signOut,
        signUp,
        signInWithGoogle,
        signInWithPhoneNumber,
        confirmPhoneCode,
        passwordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}
