import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackNavigatoer from '../Navigators/HomeStackNavigators';

const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <HomeStackNavigatoer />
    </NavigationContainer>
  );
}

export default ApplicationNavigator;