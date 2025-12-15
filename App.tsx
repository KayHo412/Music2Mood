import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import MainScreen from './screens/MainScreen';
import AppTabNavigator from './screens/AppTabNavigator';

const AppWrapper = () => {
  const { isLoggedIn } = useAppContext();
  return isLoggedIn ? <AppTabNavigator /> : <MainScreen />;
};

export default function App() {
  return (
    <AppProvider>
      <AppWrapper />
    </AppProvider>
  );
}
