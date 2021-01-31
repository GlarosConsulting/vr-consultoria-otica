import React, { useCallback, useRef } from 'react';
import {
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationError';

import { Container, BackToSignIn, BackToSignInText, Title } from './styles';

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const { passwordReset } = useAuth();

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Enter a valid email')
            .required('Please enter a registered email'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await passwordReset(data.email);

        Alert.alert(
          'Email enviado com sucesso.',
          'Entre no link enviado ao seu e-mail para alterar sua senha.',
        );

        navigation.navigate('SignIn');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert('Email recusado.', 'Email inválido, tente novamente');
      }
    },
    [passwordReset, navigation],
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
            <Title>Recupere sua senha</Title>
          </View>

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
            <Button onPress={() => formRef.current?.submitForm()}>
              Enviar e-mail de recuperação
            </Button>
          </Form>

          <BackToSignIn onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#E1E1E6" />
            <BackToSignInText>Voltar para logon</BackToSignInText>
          </BackToSignIn>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
