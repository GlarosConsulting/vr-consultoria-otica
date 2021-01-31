import React, { useCallback, useRef } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SocialButton from '../../components/SocialButton';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationError';

import {
  Container,
  FormContainer,
  LogoImage,
  ForgotPassword,
  ForgotPasswordText,
  SocialButtonsContainer,
  CreateAccount,
  CreateAccountText,
} from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { navigate } = useNavigation();

  const { signInWithEmailAndPassword, signInWithGoogle } = useAuth();

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signInWithEmailAndPassword(data.email, data.password);

        navigate('Home');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert('Autenticação recusada.', 'Email ou senha inválidos');
      }
    },
    [signInWithEmailAndPassword],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <FormContainer>
            <LogoImage source={logoImg} />

            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{
                width: '100%',
              }}
            >
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="E-mail"
                keyboardType="email-address"
                name="email"
                icon="mail"
                returnKeyType="next"
              />

              <Input
                secureTextEntry
                placeholder="Senha"
                name="password"
                icon="lock"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>

            <ForgotPassword onPress={() => navigate('ForgotPassword')}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </FormContainer>

          <SocialButtonsContainer>
            <SocialButton
              iconType="font-awesome"
              buttonTitle="Entrar com o Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={() => signInWithGoogle()}
            />

            <SocialButton
              iconType="feather"
              buttonTitle="Entrar com o telefone"
              btnType="phone"
              color="#617feb"
              backgroundColor="#e7eaf5"
              onPress={() => navigate('PhoneSignIn')}
            />
          </SocialButtonsContainer>
        </Container>

        <CreateAccount onPress={() => navigate('SignUp')}>
          <FeatherIcon name="log-in" size={20} color="#E1E1E6" />
          <CreateAccountText>Criar uma conta</CreateAccountText>
        </CreateAccount>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
