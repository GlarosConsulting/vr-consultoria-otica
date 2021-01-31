import React, { useCallback, useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Feather';

import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationError';

import {
  GoBackButton,
  GoBackButtonText,
  BackToSignIn,
  BackToSignInText,
} from './styles';

const PhoneSignIn: React.FC = () => {
  const confirmCodeFormRef = useRef<FormHandles>(null);
  const phoneNumberFormRef = useRef<FormHandles>(null);
  const { signInWithPhoneNumber, confirmPhoneCode } = useAuth();
  const navigation = useNavigation();

  const [
    confirm,
    setConfirm,
  ] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const handleConfirmCode = useCallback(
    async (data: { code: string }) => {
      if (!confirm) {
        return;
      }
      try {
        phoneNumberFormRef.current?.setErrors({});

        const schema = Yup.object().shape({
          code: Yup.string().length(6, 'O código deve ter no dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await confirmPhoneCode(data.code, confirm);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          if (errors.code) {
            Alert.alert('Código inválido', 'O código deve conter 6 dígitos.');
          }

          phoneNumberFormRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Código inválido.',
          'Cheque se esse código está correto ou tente novamente.',
        );
      }
    },
    [confirm, confirmPhoneCode],
  );

  const handleTelephoneSubmit = useCallback(
    async (data: { phoneNumber: string }) => {
      try {
        phoneNumberFormRef.current?.setErrors({});

        const schema = Yup.object().shape({
          phoneNumber: Yup.string().length(
            11,
            'O número de telephone deve conter o ddd',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const confirmation = await signInWithPhoneNumber(
          `+55${data.phoneNumber}`,
        );

        if (!confirmation) {
          throw new Error('invalid number.');
        }

        setConfirm(confirmation);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          if (errors.phoneNumber) {
            Alert.alert(
              'Número inválido',
              'Por favor digite o ddd com um número de telefone de 9 dígitos.',
            );
          }

          phoneNumberFormRef.current?.setErrors(errors);

          return;
        }

        Alert.alert('Ocorreu um erro.', error.message);
      }
    },
    [signInWithPhoneNumber],
  );

  if (!confirm) {
    return (
      <View
        style={{
          padding: 18,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <GoBackButton onPress={navigation.goBack}>
          <FeatherIcon name="arrow-left" size={20} color="#E1E1E6" />
          <GoBackButtonText>Voltar</GoBackButtonText>
        </GoBackButton>
        <Form
          ref={phoneNumberFormRef}
          onSubmit={handleTelephoneSubmit}
          style={{
            width: '100%',
          }}
        >
          <Input
            maxLength={11}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="DDD + Número do celular"
            keyboardType="number-pad"
            name="phoneNumber"
          />
          <Button
            onPress={() => {
              phoneNumberFormRef.current?.submitForm();
            }}
          >
            Entrar com número do celular
          </Button>
        </Form>

        <BackToSignIn onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#E1E1E6" />
          <BackToSignInText>Voltar para logon</BackToSignInText>
        </BackToSignIn>
      </View>
    );
  }

  return (
    <View
      style={{
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <GoBackButton onPress={() => setConfirm(null)}>
        <FeatherIcon name="arrow-left" size={20} color="#E1E1E6" />
        <GoBackButtonText>Criar uma conta</GoBackButtonText>
      </GoBackButton>
      <Form
        ref={confirmCodeFormRef}
        onSubmit={handleConfirmCode}
        style={{
          width: '100%',
        }}
      >
        <Input
          maxLength={6}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Código"
          keyboardType="number-pad"
          name="code"
        />
        <Button onPress={() => confirmCodeFormRef.current?.submitForm()}>
          Confirmar código
        </Button>
      </Form>
    </View>
  );
};

export default PhoneSignIn;
