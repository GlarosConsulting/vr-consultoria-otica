import React from 'react';

import { AuthProvider } from './auth';
import { MaximizedChartProvider } from './maximized-chart';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <MaximizedChartProvider>{children}</MaximizedChartProvider>
  </AuthProvider>
);

export default AppProvider;
