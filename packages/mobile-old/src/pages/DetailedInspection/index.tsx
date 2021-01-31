import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, Alert, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OptionsMenu from 'react-native-option-menu';
import { CircleSnail } from 'react-native-progress';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import capitalize from 'capitalize';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Header from '../../components/Header';
import PhotoCard from '../../components/PhotoCard';
import { useAuth } from '../../hooks/auth';
import IInspection from '../../interfaces/inspections/IInspection';
import api from '../../services/api';
import getCarSideTranslation from '../../utils/getCarSideTranslation';
import getValidationErrors from '../../utils/getValidationError';

import { Cards, EmptyListContainer, EmptyListText } from './styles';

interface IListPhotoUri {
  id: number;
  photo_uri?: string;
  data?: any;
}

interface IListActions {
  list: IListPhotoUri[];
  setList: React.Dispatch<React.SetStateAction<IListPhotoUri[]>>;
}

interface IFormData {
  forward_left: string;
  forward_right: string;
  rear_left: string;
  rear_right: string;
  forward_right_with_opened_hood: string;
  forward_left_with_opened_hood: string;
  forward_with_opened_hood: string;
  rear_plate: string;
  opened_trunk: string;
  seal_plate: string;
  spare_tire: string;
  key: string;
  forward_left_wheel: string;
  forward_right_wheel: string;
  rear_left_wheel: string;
  rear_right_wheel: string;
  panel: string;
  left_column: string;
  right_column: string;
  pedometer: string;
  forward_left_tire: string;
  forward_right_tire: string;
  rear_left_tire: string;
  rear_right_tire: string;
  console: string;
  chassi: string;
  engine_number: string;
  document: string;
  forward_left_buffer: string;
  forward_right_buffer: string;
  rear_left_buffer: string;
  rear_right_buffer: string;
}

interface ISendPhotos {
  key: string;
  photo_uri?: string;
}

const DetailedInspection: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user } = useAuth();

  const [breakdownsPhotoUri, setBreakdownsPhotoUri] = useState<IListPhotoUri[]>(
    [],
  );
  const [glassPhotoUri, setGlassPhotoUri] = useState<IListPhotoUri[]>([]);

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = useCallback(async (data: IFormData) => {
    const appendImageToFormData = (
      formData: FormData,
      key: string,
      imageUri?: string | null,
    ) => {
      if (!imageUri) {
        return;
      }

      formData.append(key, {
        type: 'image/jpeg',
        name: `${key}-${user?.uid}.jpg`,
        uri: imageUri,
      } as any);
    };

    try {
      const schema = Yup.object().shape({
        forward_left: Yup.string().required(),
        forward_right: Yup.string().required(),
        rear_left: Yup.string().required(),
        rear_right: Yup.string().required(),
        forward_right_with_opened_hood: Yup.string().required(),
        forward_left_with_opened_hood: Yup.string().required(),
        forward_with_opened_hood: Yup.string().required(),
        rear_plate: Yup.string().required(),
        opened_trunk: Yup.string().required(),
        seal_plate: Yup.string().required(),
        spare_tire: Yup.string().required(),
        key: Yup.string().required(),
        forward_left_wheel: Yup.string().required(),
        forward_right_wheel: Yup.string().required(),
        rear_left_wheel: Yup.string().required(),
        rear_right_wheel: Yup.string().required(),
        panel: Yup.string().required(),
        left_column: Yup.string().required(),
        right_column: Yup.string().required(),
        pedometer: Yup.string().required(),
        forward_left_tire: Yup.string().required(),
        forward_right_tire: Yup.string().required(),
        rear_left_tire: Yup.string().required(),
        rear_right_tire: Yup.string().required(),
        console: Yup.string(),
        chassi: Yup.string().required(),
        engine_number: Yup.string(),
        document: Yup.string().required(),
        forward_left_buffer: Yup.string().required(),
        forward_right_buffer: Yup.string().required(),
        rear_left_buffer: Yup.string().required(),
        rear_right_buffer: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setIsSending(true);

      let formData = new FormData();

      formData.append('user_id', user?.uid || 'not_found');
      formData.append('is_detailed', 'true');

      glassPhotoUri.forEach(
        glass =>
          glass.data?.side &&
          appendImageToFormData(
            formData,
            `${glass.data.side}_glass`,
            glass.photo_uri,
          ),
      );

      breakdownsPhotoUri.forEach(breakdown =>
        appendImageToFormData(formData, 'breakdown', breakdown.photo_uri),
      );

      const { data: inspection } = await api.post<IInspection>(
        '/inspections',
        formData,
      );

      const photos: ISendPhotos[] = [];

      Object.keys(data).forEach(key => {
        const value = (data as any)[key];

        if (value) {
          photos.push({
            key,
            photo_uri: value,
          });
        }
      });

      let sending: ISendPhotos[] = [];

      for (let i = 0; i < photos.length; i++) {
        sending.push(photos[i]);

        if (i % 4 === 0 || i === photos.length - 1) {
          formData = new FormData();

          sending.forEach(photo =>
            appendImageToFormData(formData, photo.key, photo.photo_uri),
          );

          await api.put(`/inspections/${inspection.id}`, formData);

          sending = [];
        }
      }

      formRef.current?.reset();

      setBreakdownsPhotoUri([]);
      setGlassPhotoUri([]);

      Alert.alert(
        'Enviado com sucesso',
        'Todas as fotos foram enviadas com sucesso!',
      );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        Alert.alert('Aviso', 'Por favor, verifique suas fotos.');

        formRef.current?.setErrors(errors);

        return;
      }

      console.log(JSON.stringify(err));

      Alert.alert('Ocorreu um erro inesperado', JSON.stringify(err));
    } finally {
      setIsSending(false);
    }
  }, []);

  const handleAddItemToListPhotoUri = useCallback(
    ({ list, setList }: IListActions, data?: any) => {
      const id = list.length + 1;

      setList([...list, { id, photo_uri: undefined, data }]);
    },
    [breakdownsPhotoUri],
  );

  const handleChangeListPhotoUri = useCallback(
    (id: number, uri: string | undefined, { list, setList }: IListActions) => {
      const newListPhotosUri = list.map(item =>
        item.id === id ? { ...item, photo_uri: uri } : item,
      );

      setList(newListPhotosUri);
    },
    [],
  );

  const photoCardProps = useMemo(() => {
    const screenWidth = Dimensions.get('screen').width;

    const width = `${screenWidth * 0.44}px`;
    const height = '164px';

    return {
      width,
      height,
      style: {
        marginBottom: 16,
      },
    };
  }, []);

  /* useEffect(() => {
    const photoUri =
      'content://com.carauditapp.imagepickerprovider/cacheDir/rn_image_picker_lib_temp_a7fba4ae-75c3-465a-aa07-d47b92553c9c.jpg';

    formRef?.current?.setData({
      forward_left: photoUri,
      forward_right: photoUri,
      rear_left: photoUri,
      rear_right: photoUri,
      forward_right_with_opened_hood: photoUri,
      forward_left_with_opened_hood: photoUri,
      forward_with_opened_hood: photoUri,
      rear_plate: photoUri,
      opened_trunk: photoUri,
      seal_plate: photoUri,
      spare_tire: photoUri,
      key: photoUri,
      forward_left_wheel: photoUri,
      forward_right_wheel: photoUri,
      rear_left_wheel: photoUri,
      rear_right_wheel: photoUri,
      panel: photoUri,
      left_column: photoUri,
      right_column: photoUri,
      pedometer: photoUri,
      forward_left_tire: photoUri,
      forward_right_tire: photoUri,
      rear_left_tire: photoUri,
      rear_right_tire: photoUri,
      console: photoUri,
      chassi: photoUri,
      engine_number: photoUri,
      document: photoUri,
      forward_left_buffer: photoUri,
      forward_right_buffer: photoUri,
      rear_left_buffer: photoUri,
      rear_right_buffer: photoUri,
    });
  }, []); */

  return (
    <>
      <Header />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Cards
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            paddingBottom: 88,
          }}
        >
          <PhotoCard
            {...photoCardProps}
            name="forward_left"
            title="Frente do veiculo lado esquerdo"
          />

          <PhotoCard
            {...photoCardProps}
            name="forward_right"
            title="Frente do veiculo lado direito"
          />

          <PhotoCard
            {...photoCardProps}
            name="rear_left"
            title="Traseira do veiculo lado esquerdo"
          />

          <PhotoCard
            {...photoCardProps}
            name="rear_right"
            title="Traseira do veiculo lado direito"
          />

          <PhotoCard
            {...photoCardProps}
            name="forward_right_with_opened_hood"
            title="Frente do veiculo lado direito com capô aberto lado direito"
          />

          <PhotoCard
            {...photoCardProps}
            name="forward_left_with_opened_hood"
            title="Frente do veiculo lado direito com capô aberto lado esquerdo"
          />

          <PhotoCard
            {...photoCardProps}
            name="forward_with_opened_hood"
            title="Frente do veiculo copô aberto"
          />

          <PhotoCard
            {...photoCardProps}
            name="rear_plate"
            title="Placa traseira"
          />

          <PhotoCard
            {...photoCardProps}
            name="opened_trunk"
            title="Porta mala aberto"
          />

          <PhotoCard
            {...photoCardProps}
            name="seal_plate"
            title="Selo da placa"
          />

          <PhotoCard {...photoCardProps} name="spare_tire" title="Estepe" />

          <PhotoCard {...photoCardProps} name="key" title="Chave do veiculo" />

          <PhotoCard
            {...photoCardProps}
            name="forward_left_wheel"
            title="Roda dianteira esquerda"
          />

          <PhotoCard
            {...photoCardProps}
            name="forward_right_wheel"
            title="Roda dianteira direita"
          />

          <PhotoCard
            {...photoCardProps}
            name="rear_left_wheel"
            title="Roda traseira esquerda"
          />

          <PhotoCard
            {...photoCardProps}
            name="rear_right_wheel"
            title="Roda traseira direita"
          />

          <PhotoCard
            {...photoCardProps}
            name="panel"
            title="Painel do veiculo ligado"
          />

          <PhotoCard
            {...photoCardProps}
            name="left_column"
            title="Coluna esquerda"
          />

          <PhotoCard
            {...photoCardProps}
            name="right_column"
            title="Coluna direita"
          />

          <PhotoCard
            {...photoCardProps}
            name="pedometer"
            title="Hodômetro ligado"
          />

          <PhotoCard
            {...photoCardProps}
            name="forward_left_tire"
            title="Pneu dianteiro esquerdo"
          />

          <PhotoCard
            {...photoCardProps}
            name="forward_right_tire"
            title="Pneu dianteiro direito"
          />

          <PhotoCard
            {...photoCardProps}
            name="rear_left_tire"
            title="Pneu traseiro esquerdo"
          />

          <PhotoCard
            {...photoCardProps}
            name="rear_right_tire"
            title="Pneu traseiro direito"
          />

          <PhotoCard
            {...photoCardProps}
            name="console"
            title="Console (se o carro tiver)"
          />

          <PhotoCard {...photoCardProps} name="chassi" title="Chassi" />

          <PhotoCard
            {...photoCardProps}
            name="engine_number"
            title="Nº do motor (caso consiga identificar)"
          />

          <PhotoCard
            {...photoCardProps}
            name="document"
            title="Fotos dos documentos de porte obrigatório do veiculo e do associado"
          />

          <PhotoCard
            {...photoCardProps}
            name="forward_left_buffer"
            title="Amortecedor dianteiro esquerdo"
          />

          <PhotoCard
            {...photoCardProps}
            name="forward_right_buffer"
            title="Amortecedor dianteiro direito"
          />

          <PhotoCard
            {...photoCardProps}
            name="rear_left_buffer"
            title="Amortecedor traseiro esquerdo"
          />

          <PhotoCard
            {...photoCardProps}
            name="rear_right_buffer"
            title="Amortecedor traseiro direito"
          />

          <OptionsMenu
            customButton={
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  backgroundColor: '#312e38',
                  width: Dimensions.get('screen').width - 32,
                  height: 60,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 24,
                  marginBottom: 24,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 18 }}>
                  Adicionar vidro
                </Text>
              </TouchableOpacity>
            }
            destructiveIndex={3}
            options={[
              'Dianteira',
              'Traseira',
              'Lateral esquerda',
              'Lateral direita',
              'Cancelar',
            ]}
            actions={[
              () =>
                handleAddItemToListPhotoUri(
                  {
                    list: glassPhotoUri,
                    setList: setGlassPhotoUri,
                  },
                  { side: 'forward' },
                ),
              () =>
                handleAddItemToListPhotoUri(
                  {
                    list: glassPhotoUri,
                    setList: setGlassPhotoUri,
                  },
                  { side: 'rear' },
                ),
              () =>
                handleAddItemToListPhotoUri(
                  {
                    list: glassPhotoUri,
                    setList: setGlassPhotoUri,
                  },
                  { side: 'left' },
                ),
              () =>
                handleAddItemToListPhotoUri(
                  {
                    list: glassPhotoUri,
                    setList: setGlassPhotoUri,
                  },
                  { side: 'right' },
                ),
            ]}
          />

          {glassPhotoUri.length > 0 ? (
            glassPhotoUri.map((glass, index) => (
              <PhotoCard
                key={glass.id}
                {...photoCardProps}
                title={`Vidro ${index + 1} (${
                  capitalize(getCarSideTranslation(glass.data.side)) || '-'
                })`}
                uri={glass.photo_uri}
                onPhotoUriChange={uri =>
                  handleChangeListPhotoUri(glass.id, uri, {
                    list: glassPhotoUri,
                    setList: setGlassPhotoUri,
                  })
                }
              />
            ))
          ) : (
            <EmptyListContainer>
              <EmptyListText>Nenhum vidro adicionado</EmptyListText>
            </EmptyListContainer>
          )}

          <Button
            onPress={() =>
              handleAddItemToListPhotoUri({
                list: breakdownsPhotoUri,
                setList: setBreakdownsPhotoUri,
              })
            }
            style={{ marginTop: 32, marginBottom: 24 }}
          >
            Adicionar avaria
          </Button>

          {breakdownsPhotoUri.length > 0 ? (
            breakdownsPhotoUri.map((breakdown, index) => (
              <PhotoCard
                key={breakdown.id}
                {...photoCardProps}
                title={`Avaria ${index + 1}`}
                uri={breakdown.photo_uri}
                onPhotoUriChange={uri =>
                  handleChangeListPhotoUri(breakdown.id, uri, {
                    list: breakdownsPhotoUri,
                    setList: setBreakdownsPhotoUri,
                  })
                }
              />
            ))
          ) : (
            <EmptyListContainer>
              <EmptyListText>Nenhuma avaria adicionada</EmptyListText>
            </EmptyListContainer>
          )}

          <Button
            background="#344c66"
            onPress={() => {
              formRef.current?.submitForm();
            }}
            style={{ marginTop: 32, marginBottom: 24 }}
          >
            Enviar
          </Button>
        </Cards>
      </Form>

      {isSending && (
        <CircleSnail
          indeterminate
          size={80}
          thickness={6}
          style={{
            position: 'absolute',
            top: '45%',
            left: '40%',
          }}
        />
      )}
    </>
  );
};

export default DetailedInspection;
