import React, { useState } from 'react';
// 필요한 모듈과 스크린 tsx 를 불러온다.
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../Screens/MainScreen'; // 메인스크린
import DetailsScreen, {DetailsParams} from '../Screens/DetailsScreen'; // 디테일스크린(주가정보)
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';
import AddModal from '../Components/AddModal';

// Home Screen 에서 필요한 스택은 2개 - 즐겨찾기, 디테일

// 1. 필요한 스크린에 대해 enum 타입을 정의한다. (리듀서에서 액션타입을 지정해주는 것 처럼)
export enum HomeScreens {
  Main = '연락처',
  Details = 'Details',
}

// 2. 각 스크린 마다 필요한 파라미터 타입 정의 
export type HomeStackParamList = {
  Main: undefined; // Main 스크린은 아무런 파라미터도 필요 없음
  Details: DetailsParams; // Details 스크린은 DetailsParams 라는 지정 타입의 파라미터가 필요함 => DetailsScreen 에서 지정할 것임.
};

// 3. 방금 만든 타입을 createStackNavigator 메소드 앞에 지정해주서 HomeStack 네비게이터 객체를 만들어줌.
const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FunctionComponent = () => {

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
          />}
        options={{ // Navigation Header 에 다른 컴포넌트 보여주기 !!
          headerRight: ({onPress}) => (
            <TouchableOpacity onPress={() => setAddModal(true)}>
              <AddUser>+ Add</AddUser>
            </TouchableOpacity>
          )
        }}
      />
      {/* <Drawer.Screen name={`Home`} component={({navigation})=><Home name={name} setName={setName} navigation={navigation}/>}/> */}
      <HomeStack.Screen 
        name={HomeScreens.Details}
        component={DetailsScreen}
      />
    </HomeStack.Navigator>
  );
};

const AddUser = styled.Text`
  font-size: 16px;
  padding: 0 10px;
`


export default HomeStackNavigator;