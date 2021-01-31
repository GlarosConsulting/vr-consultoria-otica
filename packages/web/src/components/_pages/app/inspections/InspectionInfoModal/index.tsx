import React, { useCallback, useRef } from 'react';

import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Select from '@/components/Select';
import IFormattedInspection from '@/interfaces/inspections/IFormattedInspection';
import { Status } from '@/interfaces/inspections/IInspection';
import api from '@/services/api';
import getStatusFromInspections from '@/utils/getStatusFromInspections';

import ImageCard from './ImageCard';

interface IInspectionInfoModalProps {
  isOpen: boolean;
  inspection?: IFormattedInspection;
  onClose?: (
    event: React.MouseEvent | React.KeyboardEvent,
    reason?: 'pressedEscape' | 'clickedOverlay',
  ) => void;
}

interface IFormData {
  status: Status;
}

const InspectionInfoModal: React.FC<IInspectionInfoModalProps> = ({
  isOpen,
  inspection,
  onClose,
}) => {
  const formRef = useRef<FormHandles>(null);

  const toast = useToast();
  const handleChangeStatus = useCallback(
    async ({ status }: IFormData) => {
      try {
        await api.patch(`/inspections/status/${inspection?.original?.id}`, {
          status,
        });

        const statusConfig = getStatusFromInspections(status);

        toast({
          duration: 3000,
          position: 'top',
          status: 'success',
          title: 'Vistoria atualizada com sucesso',
          description: `A situação da vistoria foi alterada para: ${statusConfig.label.toLowerCase()}.`,
        });

        if (onClose) {
          onClose(null);
        }
      } catch {
        toast({
          duration: 3000,
          position: 'top',
          status: 'error',
          title: 'Ocorreu um erro',
          description:
            'Ocorreu um erro ao tentar atualizar a situação da vistoria.',
        });
      }
    },
    [inspection],
  );

  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent paddingX={64} borderRadius="md">
        <ModalHeader>Vistoria</ModalHeader>
        <ModalCloseButton />

        <Form
          ref={formRef}
          initialData={{
            status: inspection?.original?.status,
          }}
          onSubmit={handleChangeStatus}
        >
          <ModalBody paddingBottom={4}>
            <Stack width="100%" marginBottom={6} direction="row" spacing={8}>
              <Stack spacing={0}>
                <Heading size="sm">Nome:</Heading>
                <Text>{inspection?.name}</Text>
              </Stack>

              <Stack spacing={0}>
                <Heading size="sm">Data de envio:</Heading>
                <Text>{inspection?.send_date}</Text>
              </Stack>

              <Stack spacing={0}>
                <Heading size="sm">Data limite:</Heading>
                <Text>{inspection?.limit_date}</Text>
              </Stack>

              <Stack spacing={0}>
                <Heading size="sm">Situação:</Heading>
                {inspection?.status}
              </Stack>
            </Stack>

            <Stack spacing={2}>
              <SimpleGrid columns={2} spacing={6} mt={2}>
                <ImageCard
                  title="Dianteira"
                  image_url={inspection?.original?.images?.forward_img_url}
                />

                <ImageCard
                  title="Traseira"
                  image_url={inspection?.original?.images?.croup_img_url}
                />

                <ImageCard
                  title="Lateral esquerda"
                  image_url={inspection?.original?.images?.left_side_img_url}
                />

                <ImageCard
                  title="Lateral direita"
                  image_url={inspection?.original?.images?.right_side_img_url}
                />

                <ImageCard
                  title="Motor"
                  image_url={inspection?.original?.images?.motor_img_url}
                />

                <ImageCard
                  title="Chassi"
                  image_url={inspection?.original?.images?.chassi_img_url}
                />

                <ImageCard
                  title="Documento"
                  image_url={inspection?.original?.images?.document_img_url}
                />

                <ImageCard
                  title="Painel"
                  image_url={inspection?.original?.images?.panel_img_url}
                />

                <ImageCard
                  title="Dianteira esquerda"
                  image_url={inspection?.original?.images?.forward_left_img_url}
                />

                <ImageCard
                  title="Dianteira direita"
                  image_url={
                    inspection?.original?.images?.forward_right_img_url
                  }
                />

                <ImageCard
                  title="Traseira esquerda"
                  image_url={inspection?.original?.images?.rear_left_img_url}
                />

                <ImageCard
                  title="Traseira direita"
                  image_url={inspection?.original?.images?.rear_right_img_url}
                />

                <ImageCard
                  title="Dianteira direita com capô aberto"
                  image_url={
                    inspection?.original?.images
                      ?.forward_right_with_opened_hood_img_url
                  }
                />

                <ImageCard
                  title="Dianteira esquerda com capô aberto"
                  image_url={
                    inspection?.original?.images
                      ?.forward_left_with_opened_hood_img_url
                  }
                />

                <ImageCard
                  title="Dianteira com capô aberto"
                  image_url={
                    inspection?.original?.images
                      ?.forward_with_opened_hood_img_url
                  }
                />

                <ImageCard
                  title="Placa"
                  image_url={inspection?.original?.images?.rear_plate_img_url}
                />

                <ImageCard
                  title="Capô aberto"
                  image_url={inspection?.original?.images?.opened_trunk_img_url}
                />

                <ImageCard
                  title="Selo da placa"
                  image_url={inspection?.original?.images?.seal_plate_img_url}
                />

                <ImageCard
                  title="Step"
                  image_url={inspection?.original?.images?.spare_tire_img_url}
                />

                <ImageCard
                  title="Chave"
                  image_url={inspection?.original?.images?.key_img_url}
                />

                <ImageCard
                  title="Roda dianteira direita"
                  image_url={
                    inspection?.original?.images?.forward_right_wheel_img_url
                  }
                />

                <ImageCard
                  title="Roda dianteira esquerda"
                  image_url={
                    inspection?.original?.images?.forward_left_wheel_img_url
                  }
                />

                <ImageCard
                  title="Roda traseira esquerda"
                  image_url={
                    inspection?.original?.images?.rear_left_wheel_img_url
                  }
                />

                <ImageCard
                  title="Roda traseira direita"
                  image_url={
                    inspection?.original?.images?.rear_right_wheel_img_url
                  }
                />

                <ImageCard
                  title="Coluna esquerda"
                  image_url={inspection?.original?.images?.left_column_img_url}
                />

                <ImageCard
                  title="Coluna direita"
                  image_url={inspection?.original?.images?.right_column_img_url}
                />

                <ImageCard
                  title="Hodômetro"
                  image_url={inspection?.original?.images?.pedometer_img_url}
                />

                <ImageCard
                  title="Pneu dianteiro da direita"
                  image_url={
                    inspection?.original?.images?.forward_right_tire_img_url
                  }
                />

                <ImageCard
                  title="Pneu dianteiro da esquerda"
                  image_url={
                    inspection?.original?.images?.forward_left_tire_img_url
                  }
                />

                <ImageCard
                  title="Pneu traseiro da direita"
                  image_url={
                    inspection?.original?.images?.rear_right_tire_img_url
                  }
                />

                <ImageCard
                  title="Pneu traseiro da esquerda"
                  image_url={
                    inspection?.original?.images?.rear_left_tire_img_url
                  }
                />

                <ImageCard
                  title="Console"
                  image_url={inspection?.original?.images?.console_img_url}
                />

                <ImageCard
                  title="Número do motor"
                  image_url={
                    inspection?.original?.images?.engine_number_img_url
                  }
                />

                <ImageCard
                  title="Amortecedor dianteiro da direita"
                  image_url={
                    inspection?.original?.images?.forward_right_buffer_img_url
                  }
                />

                <ImageCard
                  title="Amortecedor dianteiro da esquerda"
                  image_url={
                    inspection?.original?.images?.forward_left_buffer_img_url
                  }
                />

                <ImageCard
                  title="Amortecedor traseiro da direita"
                  image_url={
                    inspection?.original?.images?.rear_right_buffer_img_url
                  }
                />

                <ImageCard
                  title="Amortecedor traseiro da esquerda"
                  image_url={
                    inspection?.original?.images?.rear_left_buffer_img_url
                  }
                />

                {inspection?.original?.images?.glass?.map(glass => (
                  <ImageCard
                    id={glass.id}
                    title={glass.name}
                    image_url={glass.glass_url}
                  />
                ))}

                {inspection?.original?.images?.breakdowns?.map(breakdown => (
                  <ImageCard
                    id={breakdown.id}
                    title="Avaria"
                    image_url={breakdown.breakdown_url}
                  />
                ))}
              </SimpleGrid>

              <Flex mt={4} alignItems="center">
                <Text fontWeight="bold" fontSize={18} marginRight={4}>
                  Decisão:
                </Text>

                <Select
                  placeholder="Situação"
                  backgroundColor="#CBD5E0"
                  name="status"
                  containerProps={{
                    backgroundColor: '#CBD5E0',
                    width: 332,
                    border: '1px solid',
                    borderColor: '#A0AEC0',
                  }}
                >
                  <option value="pending">Pendente</option>
                  <option value="approved">Aprovado</option>
                  <option value="refused">Recusado</option>
                </Select>
              </Flex>
            </Stack>
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
  );
};

export default InspectionInfoModal;
