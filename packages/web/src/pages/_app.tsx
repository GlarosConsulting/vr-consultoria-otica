import { AppProps } from 'next/app';
import React from 'react';

import '../components/Sidebar/custom.css';
import AppProvider from '@/context';
import ThemeContainer from '@/context/theme/ThemeContainer';
import 'react-datepicker/dist/react-datepicker.css';
import '@/components/DatePicker/module.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeContainer>
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  </ThemeContainer>
);

export default MyApp;
