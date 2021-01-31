import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, Alert } from 'react-native';
import { CircleSnail } from 'react-native-progress';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Header from '../../components/Header';
import PhotoCard from '../../components/PhotoCard';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationError';

import { Cards } from './styles';

interface IFormData {
  forward: string;
  croup: string;
  left_side: string;
  right_side: string;
  motor: string;
  chassi: string;
  document: string;
  panel: string;
}

const Inspection: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user } = useAuth();

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
        forward: Yup.string().required(),
        croup: Yup.string().required(),
        left_side: Yup.string().required(),
        right_side: Yup.string().required(),
        motor: Yup.string().required(),
        chassi: Yup.string().required(),
        document: Yup.string().required(),
        panel: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      const formData = new FormData();

      formData.append('user_id', user?.uid || 'not_found');

      Object.keys(data).forEach(key => {
        const value = (data as any)[key];

        if (value) {
          appendImageToFormData(formData, key, value);
        }
      });

      setIsSending(true);

      await api.post('/inspections', formData);

      formRef.current?.reset();

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

  return (
    <>
      <Header />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Cards
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            paddingBottom: 96,
          }}
        >
          <PhotoCard {...photoCardProps} name="forward" title="Dianteira" />

          <PhotoCard {...photoCardProps} name="croup" title="Traseira" />

          <PhotoCard
            {...photoCardProps}
            name="left_side"
            title="Lateral esquerda"
          />

          <PhotoCard
            {...photoCardProps}
            name="right_side"
            title="Lateral direita"
          />

          <PhotoCard {...photoCardProps} name="motor" title="Motor" />

          <PhotoCard {...photoCardProps} name="chassi" title="Chassi" />

          <PhotoCard {...photoCardProps} name="document" title="Documento" />

          <PhotoCard {...photoCardProps} name="panel" title="Painel" />

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

export default Inspection;
