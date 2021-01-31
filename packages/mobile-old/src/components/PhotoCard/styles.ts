import { transparentize } from 'polished';
import styled, { css } from 'styled-components/native';

interface IContainerProps {
  width: string | number;
  height: string | number;
  isError?: boolean;
}

export const Container = styled.View<IContainerProps>`
  position: relative;

  background: #eee;
  border-radius: 8px;

  overflow: hidden;

  ${({ width, height }) => css`
    width: ${width || '50px'};
    height: ${height || '50px'};
  `};

  ${({ isError }) =>
    isError &&
    css`
      border-color: #eb5952;
      border-width: 1px;
    `}
`;

export const Photo = styled.Image`
  width: 100%;
  height: 100%;
`;

interface ITitleContainerProps {
  height?: number;
}

export const TitleContainer = styled.View<ITitleContainerProps>`
  position: absolute;
  bottom: 0;

  width: 100%;
  height: ${props => props.height || 32}px;

  background: ${transparentize(0.3, '#ddd')};

  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: #1b1b1b;
  text-align: center;
`;
