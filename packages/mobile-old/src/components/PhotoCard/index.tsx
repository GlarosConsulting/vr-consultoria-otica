import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ViewProps } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import OptionsMenu from 'react-native-option-menu';
import { v4 as uuid } from 'react-native-uuid';

import { useField } from '@unform/core';

import { Container, Photo, TitleContainer, Title } from './styles';

interface IPhotoCardProps extends ViewProps {
  name?: string;
  title: string;
  uri?: string;
  width: string | number;
  height: string | number;
  onPhotoUriChange?(uri?: string): void;
}

type Photo = string | undefined;

const PhotoCard: React.FC<IPhotoCardProps> = ({
  name,
  title,
  uri,
  width,
  height,
  onPhotoUriChange,
  ...rest
}) => {
  const { registerField, defaultValue, fieldName, error } = useField(
    name || uuid(),
  );

  const [photoUri, setPhotoUri] = useState<Photo>(defaultValue);

  useEffect(() => {
    if (!name) {
      return;
    }

    registerField<Photo>({
      name: fieldName,
      getValue() {
        return photoUri;
      },
      setValue(_ref, newValue) {
        setPhotoUri(newValue);
      },
      clearValue(_ref, newValue) {
        setPhotoUri(newValue);
      },
    });
  }, [fieldName, registerField, photoUri]);

  useEffect(() => {
    setPhotoUri(uri);
  }, [uri]);

  const handleLaunchCamera = useCallback(() => {
    launchCamera({ mediaType: 'photo' }, ({ uri: newUri }) => {
      setPhotoUri(newUri);

      if (onPhotoUriChange) {
        onPhotoUriChange(newUri);
      }
    });
  }, [onPhotoUriChange]);

  const handleLaunchLibrary = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      ({ uri: newUri }) => {
        setPhotoUri(newUri);

        if (onPhotoUriChange) {
          onPhotoUriChange(newUri);
        }
      },
    );
  }, [onPhotoUriChange]);

  const titleContainerHeight = useMemo(() => {
    if (title.length >= 56) {
      return 72;
    }

    if (title.length >= 48) {
      return 64;
    }

    if (title.length >= 40) {
      return 56;
    }

    if (title.length >= 32) {
      return 48;
    }

    if (title.length >= 24) {
      return 40;
    }

    return 32;
  }, [title]);

  return (
    <OptionsMenu
      customButton={
        <Container width={width} height={height} isError={!!error} {...rest}>
          <Photo source={{ uri: photoUri }} />

          <TitleContainer height={titleContainerHeight}>
            <Title>{title}</Title>
          </TitleContainer>
        </Container>
      }
      destructiveIndex={2}
      options={['Camera', 'Galeria', 'Cancelar']}
      actions={[handleLaunchCamera, handleLaunchLibrary]}
    />
  );
};

export default PhotoCard;
