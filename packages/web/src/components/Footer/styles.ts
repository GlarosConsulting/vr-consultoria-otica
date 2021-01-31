import { Flex, DefaultTheme } from '@chakra-ui/core';
import styled from '@emotion/styled';

interface IContainerProps {
  theme: DefaultTheme;
}

export const Container = styled(Flex)<IContainerProps>`
  --base-color: ${props => props.theme.colors.gray[500]};

  background: linear-gradient(45deg, #2a4365, #fff);
`;
