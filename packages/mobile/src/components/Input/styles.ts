import { Feather } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';

interface IContainerProps {
  isErrored: boolean;
}

export const Container = styled.View<IContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #d2dae2;
  border-radius: 8px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-width: 2px;
      border-color: #c53030;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #312e38;
  font-size: 16px;
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
  color: #312e38;
`;
