import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text,
  View, 
  Button, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  NativeSyntheticEvent, 
  TextInputChangeEventData 
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
// 아까 HomeStackNavigator 에서 export 해줬던 타입들을 가지고 온다.
import {
  HomeScreens,
  HomeStackParamList,
} from '../Navigators/HomeStackNavigators';
import ListView from '../Components/ListView';
import type { ContactData } from "../ApiData/interface";
import axios from 'axios';
import { ScrollView } from "react-native-gesture-handler";
import styled from 'styled-components';
import AddModal from '../Components/AddModal';

// MainScreen 에 필요한 파라미터들을 StackNavigationProp 으로 타입 명시해준다.
type MainScreenNavigationProps = StackNavigationProp<
  HomeStackParamList, // navigators/HomeStackNavigators/index.tsx 에서 지정했던RJT 
  HomeScreens.Main // enum 으로 지정했던 타입 중 Main 에 해당하는 부분
>;
// MainScreenProps 에 대한 인터페이스 지정
// 인터페이스: 객체의 타입을 정의할 수 있게 하는 것
interface MainScreenProps {
  navigation: MainScreenNavigationProps; // 네비게이션 속서에 대한 타입으로 방금 지정해주었던 MainScreenNavigationProps 을 지정
}
const MainScreen: React.FunctionComponent<MainScreenProps> = props => {
  const {navigation, addModal} = props;
  type ContactData = { name: string; phonenumber: string; email: string};
  const [userList, setUserList] = useState<Array<ContactData>>([]);
  const [filterSearch, setFilterSearch] = useState('');
  const getUserList = async () => {
  // 주말에 리덕스로 적용하기~~
  const res = await axios.get('http://localhost:8080/contact/all');
    setUserList(res.data);
  }
  useEffect(() => {
    getUserList();
  }, []);
  const searchNameHandler = (e:any) => {
    e.preventDefault();
    setFilterSearch(e.nativeEvent.text);
  }
  
  // MainScreenProps 에 navigation 이 있으니까 비구조화 할당으로 꺼내쓸 수 있음
  return (

    <SafeAreaView >

        <AddModal 
          addModal={props.addModal}
          setAddModal={props.setAddModal}
        />

        <UserSearch 
              placeholder='이름을 입력해주세요.'
              value={filterSearch}
              onChange={searchNameHandler}
        /> 
        <View>             
            {userList.filter((searchData) => 
              filterSearch == '' 
              ? true 
              : (searchData.name
                ? searchData.name.includes(
                  filterSearch,
                )
              : false) ||
              (searchData.name
                ? searchData.name.includes(
                  filterSearch,
                )
              : false),
              ) 
              .map((content, i) => {
                return (
                  <TouchableOpacity onPress={() => navigation.navigate(HomeScreens.Details, {content})}>
                    <ScrollWrap navigation={navigation}>
                        <Title>{content.name}</Title>
                        <Phonenumber>{content.phonenumber}</Phonenumber>
                        {/* <Text>{content.email}</Text> */}
                    </ScrollWrap>
                    </TouchableOpacity>
                )
            })}
        </View>
    </SafeAreaView>
  );
};

const UserSearch = styled.TextInput`
  border-width: 1px;
  padding: 10px;
  border-color: #ccc;
  margin-bottom: 20px;
`

const ScrollWrap = styled.ScrollView`
    margin-bottom: 10px;
    border-bottom-width: 1;
    border-color: #ccc;
    padding-bottom: 5px;
`

const Title = styled.Text`
    font-size: 16px;
    font-weight: 600;
    align-items: flex-end;
    padding: 0 10px;
    margin-bottom: 3px;
`;

const Phonenumber = styled.Text`
    font-size:16px;
    font-weight: 600;
    align-items: flex-end;
    padding: 0 10px;
`;
export default MainScreen;
