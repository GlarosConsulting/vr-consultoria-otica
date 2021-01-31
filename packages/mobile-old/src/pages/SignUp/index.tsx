import React, { useCallback, useRef } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import SocialButton from '../../components/SocialButton';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationError';

import {
  Title,
  Container,
  BackToSignIn,
  BackToSignInText,
  SocialButtonsContainer,
} from './styles';

interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { signUp, signInWithGoogle } = useAuth();

  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: ISignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signUp(data);

        navigation.navigate('SignIn');

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer login na aplicação.',
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro ao registrar usuário',
          'Erro ao registrar usuário, cadastro já existente',
        );
      }
    },
    [navigation, signUp],
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
          <View>
            <Title>Crie sua conta</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSignUp} style={{ width: '100%' }}>
            <Input
              ref={nameInputRef}
              autoCapitalize="words"
              placeholder="Seu nome"
              name="name"
              icon="user"
              keyboardType="default"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />

            <Input
              ref={emailInputRef}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="E-mail"
              name="email"
              icon="mail"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Input
              ref={passwordInputRef}
              placeholder="Senha"
              name="password"
              icon="lock"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
              textContentType="newPassword"
            />

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Criar conta
            </Button>
          </Form>

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
              onPress={() => navigation.navigate('PhoneSignIn')}
            />
          </SocialButtonsContainer>

          <BackToSignIn onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#E1E1E6" />
            <BackToSignInText>Voltar para logon</BackToSignInText>
          </BackToSignIn>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
