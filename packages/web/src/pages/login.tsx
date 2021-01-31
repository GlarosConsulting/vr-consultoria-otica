import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import { FiLock, FiUser } from 'react-icons/fi';

import {
  Button,
  Flex,
  Heading,
  Link,
  useDisclosure,
  useToast,
} from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Footer from '@/components/Footer';
import CreateUsersModal from '@/components/Modals/CreateNewUser';
import ForgotPasswordModal from '@/components/Modals/ForgotPassword';
import SocialButton from '@/components/SocialButton';
import getValidationErrors from '@/utils/getValidationErrors';

import Header from '../components/Header';
import Input from '../components/Input';
import SEO from '../components/SEO';
import { useAuthentication } from '../context/authentication';

interface IUserCredentialsFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { signIn, signInWithPopup } = useAuthentication();

  const toast = useToast();
  const formRef = useRef<FormHandles>(null);
  const router = useRouter();

  const {
    isOpen: isCreateUsersModalOpen,
    onOpen: onOpenCreateUsersModal,
    onClose: onCloseUsersModal,
  } = useDisclosure();
  const {
    isOpen: isForgotPasswordModalOpen,
    onOpen: onOpenForgotPasswordModal,
    onClose: onCloseForgotPasswordModal,
  } = useDisclosure();

  const handleSignIn = useCallback(async (data: IUserCredentialsFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatória'),
        password: Yup.string().required('E-mail obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      const { email, password } = data;

      await signIn({
        email,
        password,
      });

      router.replace('home');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
      if (err.code === 'auth/wrong-password') {
        toast({
          position: 'top',
          status: 'error',
          title: 'E-mail ou senha inválidos.',
          isClosable: true,
          description:
            'Por favor verifique seu e-mail e senha e tente novamente.',
        });
      }
    }
  }, []);

  return (
    <>
      <SEO title="Brasil Car" image="boost.png" shouldExcludeTitleSuffix />

      <Flex
        as="main"
        height="100vh"
        position="relative"
        width="100vw"
        direction="column"
        alignItems="center"
      >
        <Header />

        <Flex
          borderRadius="md"
          flexDirection="column"
          alignItems="center"
          padding={6}
          paddingTop={0}
          paddingBottom={0}
          width="100%"
          maxWidth="500px"
        >
          <Heading color="gray.800" marginBottom={6} marginTop={12}>
            Login
          </Heading>
          <Form css={{ width: '100%' }} onSubmit={handleSignIn}>
            <Input name="email" icon={FiUser} placeholder="Usuário" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
              containerProps={{
                marginTop: 3,
              }}
            />
            <Flex direction="column">
              <Button
                marginTop={3}
                variantColor="green"
                type="submit"
                width="100%"
              >
                Entrar
              </Button>

              <SocialButton
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onClick={() => signInWithPopup('google')}
                marginTop={3}
              >
                Entrar com o Google
              </SocialButton>

              <Button
                marginBottom={3}
                type="submit"
                bg="gray.500"
                color="white"
                _hover={{
                  bg: 'gray.400',
                  color: 'gray.100',
                }}
                _focusWithin={{
                  bg: 'gray.400',
                  color: 'gray.100',
                }}
                width="100%"
                onClick={onOpenCreateUsersModal}
              >
                Criar novo usuário
              </Button>
            </Flex>
          </Form>
          <Link onClick={onOpenForgotPasswordModal} color="gray.800">
            Esqueci minha senha
          </Link>
        </Flex>

        <CreateUsersModal
          isOpen={isCreateUsersModalOpen}
          onClose={onCloseUsersModal}
          onSave={() => {
            console.log('cadastrado');
          }}
        />

        <ForgotPasswordModal
          isOpen={isForgotPasswordModalOpen}
          onClose={onCloseForgotPasswordModal}
          onSave={() => {
            console.log('mensagem enviada');
          }}
        />
      </Flex>
      <Footer
        height={{
          xs: '0px',
          sm: '0px',
          md: '10px',
          lg: '40px',
          xl: '60px',
        }}
      />
    </>
  );
};

export default Login;
