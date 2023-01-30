import React, { useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../Screens/MainScreen';
import DetailsScreen from '../Screens/DetailsScreen'; 
import DeleteListScreen from '../Screens/DeleteListScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

let addIconPath = require('../Assets/Icons/outline_add_black_24dp.png');

export enum HomeScreens {
  Main = '연락처',
  Details = '연락처 상세보기',
  DeleteList = '연락처 삭제목록',
}
const HomeStack = createStackNavigator<HomeStackParamList>();
const HomeStackNavigator: React.FunctionComponent = (Props:any) => {
const { appTheme, setAppTheme } = Props;
const [addModal, setAddModal] = useState<boolean>(false);

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name={HomeScreens.Main} 
        component={({navigation}) => 
          <MainScreen 
            addModal={addModal} 
            setAddModal={setAddModal}
            navigation={navigation}
            appTheme={appTheme}
            setAppTheme={setAppTheme}
          />}
        options={{ 
          headerStyle: {
            backgroundColor: appTheme.color.header
          },
          headerTitleStyle: {
            color: appTheme.color.text,
            fontWeight: "600",
            fontSize: 18,
          },
          headerRight: ({onPress}) => (
            <TouchableOpacity onPress={() => setAddModal(true)}>
              <AddImage 
                  source={addIconPath}
              />
            </TouchableOpacity>
          )
        }}
      />
      <HomeStack.Screen 
        name={HomeScreens.Details}
        component={DetailsScreen}
      />
      
      <HomeStack.Screen 
        name={HomeScreens.DeleteList}
        component={DeleteListScreen}
      />
    </HomeStack.Navigator>
  );
};

const AddImage = styled.Image`
  tintColor: ${({ theme }) => theme.color.icon};
  width: 30px;
  height: 30px;
  margin-right: 5px;

`

export default HomeStackNavigator;