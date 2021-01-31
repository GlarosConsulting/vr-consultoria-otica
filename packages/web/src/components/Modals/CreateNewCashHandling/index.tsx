import React, { useCallback, useRef } from 'react';
import { FiDollarSign } from 'react-icons/fi';

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

import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import api from '@/services/api';
import getValidationErrors from '@/utils/getValidationErrors';
import { currencyMasker } from '@/utils/masks';

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
  onSave,
}) => {
  const formRef = useRef<FormHandles>(null);

  const toast = useToast();

  const handleKeyUp = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      currencyMasker(event);
    },
    [],
  );

  const handleSubmit = useCallback(async (data: IFormData, event) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        date: Yup.date().required('Data obrigatória.'),
        bank_value: Yup.number().required('Valor do banco obrigatório.'),
        return_value: Yup.number().required('Valor de retorno obrigatório.'),
        bank_tariff_value: Yup.number().required(
          'Valor da tarifa do banco obrigatório.',
        ),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('cash-handling', data);

      toast({
        status: 'success',
        title: 'Movimentação de caixa criada com sucesso',
        position: 'top',
        duration: 3000,
      });

      onClose(event);
      onSave();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      toast({
        status: 'error',
        title: 'Erro ao registrar movimentação de caixa',
        description:
          'Ocorreu um erro ao registrar a movimentação de caixa, tente novamente.',
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
          <ModalHeader>Registrar movimentação de caixa</ModalHeader>
          <ModalCloseButton />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <ModalBody paddingBottom={4}>
              <Flex direction="column">
                <DatePicker
                  name="date"
                  placeholderText="data"
                  containerProps={{
                    marginBottom: 6,
                    color: '#000',
                    background: '#CBD5E0',
                  }}
                />

                <Input
                  onKeyUp={handleKeyUp}
                  name="bank_value"
                  placeholder="Valor do banco"
                  icon={FiDollarSign}
                  containerProps={{
                    background: '#CBD5E0',
                    marginBottom: 6,
                  }}
                />

                <Input
                  onKeyUp={handleKeyUp}
                  name="return_value"
                  placeholder="Valor de retorno"
                  icon={FiDollarSign}
                  containerProps={{
                    background: '#CBD5E0',
                    marginBottom: 6,
                  }}
                />

                <Input
                  onKeyUp={handleKeyUp}
                  name="bank_tariff_value"
                  placeholder="Valor da tarifa do banco"
                  icon={FiDollarSign}
                  containerProps={{
                    background: '#CBD5E0',
                    marginBottom: 6,
                  }}
                />
              </Flex>
            </ModalBody>

            <ModalFooter>
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
