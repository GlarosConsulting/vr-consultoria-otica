import React, { createContext, useCallback, useContext, useState } from 'react';

import * as ScreenOrientation from 'expo-screen-orientation';

type Navigate = {
  <RouteName extends string>(
    ...args: [RouteName] | [RouteName, object | undefined]
  ): void;
  <RouteName extends string>(
    route:
      | {
          key: string;
          params?: object | undefined;
        }
      | {
          name: RouteName;
          key?: string | undefined;
          params: object | undefined;
        },
  ): void;
};

interface IMaximizedChartContextData {
  content?: React.ReactNode;
  setMaximizedChartContent(newContent: React.ReactNode): void;
  navigateToMaximizedChart(navigate: Navigate): void;
}

const MaximizedChartContext = createContext<IMaximizedChartContextData>(
  {} as IMaximizedChartContextData,
);

export const MaximizedChartProvider: React.FC = ({ children }) => {
  const [content, setContent] = useState<React.ReactNode>();

  const setMaximizedChartContent = useCallback(
    (newContent: React.ReactNode) => {
      setContent(newContent);
    },
    [],
  );

  const navigateToMaximizedChart = useCallback(async (navigate: Navigate) => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT,
    );

    navigate('MaximizedChart');
  }, []);

  return (
    <MaximizedChartContext.Provider
      value={{
        content,
        setMaximizedChartContent,
        navigateToMaximizedChart,
      }}
    >
      {children}
    </MaximizedChartContext.Provider>
  );
};

export function useMaximizedChart(): IMaximizedChartContextData {
  const context = useContext(MaximizedChartContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}
