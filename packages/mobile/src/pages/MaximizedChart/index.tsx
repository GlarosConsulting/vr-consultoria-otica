import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

import Header from '../../components/Header';
import { useMaximizedChart } from '../../hooks/maximized-chart';

import { Container } from './styles';

const MaximizedChart: React.FC = () => {
  const { goBack, addListener } = useNavigation();

  const { content, setMaximizedChartContent } = useMaximizedChart();

  useEffect(() => {
    function onBlurScreenCallback(event: any) {
      if (event.target?.includes('MaximizedChart')) {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP,
        );

        setMaximizedChartContent(undefined);
      }
    }

    addListener('blur', onBlurScreenCallback);
  }, []);

  return (
    <>
      <Header>
        <TouchableOpacity onPress={() => goBack()}>
          <Feather name="arrow-left" size={32} color="#333" />
        </TouchableOpacity>
      </Header>

      <Container
        contentContainerStyle={{ paddingBottom: getStatusBarHeight() + 96 }}
      >
        {content}
      </Container>
    </>
  );
};

export default MaximizedChart;
