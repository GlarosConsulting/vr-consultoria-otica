import React, { useCallback, useRef } from 'react';

import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '@/components/Input';
import SocialButton from '@/components/SocialButton';
import { useAuthentication } from '@/context/authentication';
import getValidationErrors from '@/utils/getValidationErrors';

interface IFormData {
  email: string;
  password: string;
  password_confirmation: string;
}

interface ICrateNewUserModalProps {
  isOpen: boolean;
  onClose?: (
    event: React.MouseEvent | React.KeyboardEvent,
    reason?: 'pressedEscape' | 'clickedOverlay',
  ) => void;
  onSave: () => void;
}

const CrateNewUserModal: React.FC<ICrateNewUserModalProps> = ({
  isOpen,
  onClose,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { createUser, signInWithPopup } = useAuthentication();
  const toast = useToast();

  const handleSubmit = useCallback(async (data: IFormData, event) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email().required('E-mail obrigatório'),
        password: Yup.string().required('Senha obrigatório'),
        passwordConfirmation: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'As senhas devem ser iguais',
        ),
      });

      await schema.validate(data, { abortEarly: false });

      const { email, password } = data;

      await createUser({ email, password });

      toast({
        status: 'success',
        title: 'Usuário criado com sucesso',
        position: 'top',
        duration: 3000,
      });

      onClose(event);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        toast({
          status: 'info',
          title: 'Usuário já registrado.',
          position: 'top',
          duration: 5000,
        });

        onClose(event);
        return;
      }

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      toast({
        status: 'error',
        title: 'Erro ao registrar usuário',
        description: 'Ocorreu um erro ao registrar usuário, tente novamente.',
        position: 'top',
        duration: 5000,
      });
    }
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth={900} borderRadius="md">
          <ModalHeader>Registrar usuário</ModalHeader>
          <ModalCloseButton />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <ModalBody paddingBottom={4}>
              <Flex direction="column">
                <Input
                  name="email"
                  placeholder="E-mail"
                  containerProps={{
                    border: '1px solid',
                    borderColor: 'gray.400',
                    marginBottom: 2,
                    bg: 'white',
                  }}
                />

                <Input
                  name="password"
                  placeholder="Senha"
                  type="password"
                  containerProps={{
                    border: '1px solid',
                    borderColor: 'gray.400',
                    marginBottom: 2,
                    bg: 'white',
                  }}
                />

                <Input
                  name="password_confirmation"
                  placeholder="Confirmar senha"
                  type="password"
                  containerProps={{
                    border: '1px solid',
                    borderColor: 'gray.400',
                    bg: 'white',
                  }}
                />
              </Flex>
            </ModalBody>

            <ModalFooter>
              <SocialButton
                width={64}
                marginRight={4}
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onClick={() => signInWithPopup('google')}
              >
                Entrar com o Google
              </SocialButton>
              <Button variant="ghost" onClick={onClose} marginRight={4}>
                Cancelar
              </Button>

              <Button type="submit" variantColor="green">
                Salvar
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CrateNewUserModal;
