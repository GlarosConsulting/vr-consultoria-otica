import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

interface ISignUpData {
  name: string;
  email: string;
  password: string;
}
export interface IAuthContextData {
  user?: FirebaseAuthTypes.User;
  loading: boolean;
  signInWithEmailAndPassword(email: string, password: string): Promise<void>;
  signUp(data: ISignUpData): Promise<void>;
  signOut(): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signInWithPhoneNumber(
    phoneNumber: string,
  ): Promise<FirebaseAuthTypes.ConfirmationResult | undefined>;
  confirmPhoneCode(
    code: string,
    confirm: FirebaseAuthTypes.ConfirmationResult,
  ): Promise<void>;
  passwordReset(email: string): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const storedUser = await AsyncStorage.getItem('@VRConsultoriaOtica:user');

      if (storedUser) {
        setUser(JSON.parse(storedUser) as FirebaseAuthTypes.User);
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signInWithEmailAndPassword = useCallback(async (email, password) => {
    try {
      setLoading(true);

      const { user: newUser } = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      setUser(newUser);

      await AsyncStorage.setItem(
        '@VRConsultoriaOtica:user',
        JSON.stringify(newUser),
      );
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
        const { user: newUser } = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        await newUser.updateProfile({
          displayName: name,
        });

        await database().ref(`users/${newUser.uid}`).set({
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
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } catch (err) {
        await auth().signOut();
      }

      await AsyncStorage.removeItem('@VRConsultoriaOtica:user');

      setUser(undefined);
    } catch (error) {
      console.log(error);
    }
  }, [setUser]);

  const signInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);

      GoogleSignin.configure({
        webClientId:
          '824008646225-5ongm6o09g4fm4npe5qio1fskbv300la.apps.googleusercontent.com',
      });

      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const { user: newUser } = await auth().signInWithCredential(
        googleCredential,
      );

      await database().ref(`users/${newUser.uid}`).set({
        company: 'vr-consultoria-otica',
      });

      setUser(newUser as FirebaseAuthTypes.User);

      await AsyncStorage.setItem(
        '@VRConsultoriaOtica:user',
        JSON.stringify(newUser),
      );
    } catch (error) {
      Alert.alert('Ocorreu um erro', JSON.stringify(error));

      if (
        error.code !== statusCodes.SIGN_IN_CANCELLED ||
        error.code !== statusCodes.IN_PROGRESS ||
        error.code !== statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        throw new Error(error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmPhoneCode = useCallback(
    async (code: string, confirm: FirebaseAuthTypes.ConfirmationResult) => {
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
    },
    [],
  );

  const signInWithPhoneNumber = useCallback(
    async (
      phoneNumber: string,
    ): Promise<FirebaseAuthTypes.ConfirmationResult | undefined> => {
      setLoading(true);

      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setLoading(false);

      return confirmation;
    },
    [],
  );

  const passwordReset = useCallback(async (email: string): Promise<void> => {
    await auth().sendPasswordResetEmail(email);
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
