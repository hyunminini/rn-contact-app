import React, { useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import {
  NavigationContainer,
} from '@react-navigation/native';
import HomeStackNavigatoer from '../Navigators/HomeStackNavigators';
import styled from 'styled-components/native';
import { dark, light } from '../Styles/theme';
import { ThemeProvider } from 'styled-components';

const ApplicationNavigator = () => {
  const [appTheme, setAppTheme] = useState(light);

  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
      setAppTheme(Appearance.getColorScheme() === "dark" ? dark : light);
    });
    return () => {};
  }, []);


  return (
    <ThemeProvider theme={appTheme}>
      <NavigationContainer>
        <HomeStackNavigatoer 
          setAppTheme={setAppTheme} 
          appTheme={appTheme}
        />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default ApplicationNavigator;