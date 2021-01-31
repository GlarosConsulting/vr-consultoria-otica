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
import { useAuthentication } from '@/context/authentication';
import getValidationErrors from '@/utils/getValidationErrors';

interface IFormData {
  email: string;
  password: string;
  password_confirmation: string;
}

interface IForgotPasswordModalProps {
  isOpen: boolean;
  onClose?: (
    event: React.MouseEvent | React.KeyboardEvent,
    reason?: 'pressedEscape' | 'clickedOverlay',
  ) => void;
  onSave: () => void;
}

const ForgotPasswordModal: React.FC<IForgotPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { sendForgotPasswordEmail } = useAuthentication();
  const toast = useToast();

  const handleSubmit = useCallback(async (data: IFormData, event) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email().required('E-mail obrigatório'),
      });

      await schema.validate(data, { abortEarly: false });

      const { email } = data;

      await sendForgotPasswordEmail(email);

      toast({
        status: 'success',
        title: 'E-mail enviado com sucesso',
        position: 'top',
        duration: 3000,
      });

      onClose(event);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      toast({
        status: 'error',
        title: 'Erro ao enviar E-mail',
        description: 'Ocorreu um erro ao enviar e-mail, tente novamente.',
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
          <ModalHeader>Recuperação de senha</ModalHeader>
          <ModalCloseButton />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <ModalBody paddingBottom={4}>
              <Flex>
                <Input
                  name="email"
                  placeholder="E-mail"
                  containerProps={{
                    border: '1px solid',
                    borderColor: 'gray.400',
                    marginRight: 2,
                    bg: 'white',
                  }}
                />
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={onClose} marginRight={4}>
                Cancelar
              </Button>

              <Button type="submit" variantColor="green">
                Enviar e-mail de confirmação
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ForgotPasswordModal;
