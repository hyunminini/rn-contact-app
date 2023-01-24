import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  Text,
  View, 
  TouchableOpacity, 
  Image,
  Dimensions
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
// 아까 HomeStackNavigator 에서 export 해줬던 타입들을 가지고 온다.
import { HomeScreens, HomeStackParamList } from '../Navigators/HomeStackNavigators';
import type { ContactData } from "../ApiData/interface";
import axios from 'axios';
import styled from 'styled-components';
import AddModal from '../Components/AddModal';
import EditModal from '../Components/EditModal';
import DeleteModal from '../Components/DeleteModal';

let deleteIconPath = require('../Assets/Icons/outline_delete_black_48dp.png');
let editIconPath = require('../Assets/Icons/outline_edit_black_24dp.png');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
  type EditDatas = { userNo: number; name: string; phonenumber: string; email: string, status: string, deleteTime: string }
  type ContactData = { userNo: number; name: string; phonenumber: string; email: string, status: string, deleteTime: string};
  
  const {navigation} = props;
  const [userList, setUserList] = useState<Array<ContactData>>([]);
  const [filterSearch, setFilterSearch] = useState<String>('');
  const [editModal, setEditModal] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState<Array<ContactData>>([]);
  const [editData, setEditData] = useState<Array<EditDatas>>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const getUserList = async () => {
  // 주말에 리덕스로 적용하기~~
  const res = await axios.get('http://172.30.1.92:8080/contact/all');
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
        <EditModal 
          editModal={editModal}
          setEditModal={setEditModal}
          editData={editData}
          setEditData={setEditData}
          getUserList={getUserList}
        />
        <DeleteModal 
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          selectUser={selectUser}
          getUserList={getUserList}
        />
        <UserSearch 
              placeholder='이름을 입력해주세요.'
              value={filterSearch}
              onChange={searchNameHandler}
        /> 
        <ConTactScrollView>             
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
              .map((content, key) => {
                return (       
                    <ContactContainer navigation={navigation}>
                      <TouchableOpacity onPress={() => navigation.navigate(HomeScreens.Details, {content})}>
                        <ContactData>
                          <View>
                            <Title>{content.name}</Title>
                            <Phonenumber>{content.phoneNumber}</Phonenumber>
                          </View>
                          <ContactButtonContainer>
                            <TouchableOpacity 
                              style={{marginRight: 3}}
                              onPress={() => {setEditModal(true), setEditData(content)}}
                            >
                              <Image 
                                style={{width: 25, height: 25}}
                                source={editIconPath}
                              />
                            </TouchableOpacity>

                            <TouchableOpacity               
                               onPress={(e:any) => {
                                setDeleteModal(true);
                                setSelectUser(content);
                                // deleteSubmit();    
                              }}
                            >
                              <Image 
                                style={{width: 25, height: 25}}
                                source={deleteIconPath}
                              />
                            </TouchableOpacity>
                          </ContactButtonContainer>
                        </ContactData>
                      </TouchableOpacity>
                    </ContactContainer>  
                )
            })}
        </ConTactScrollView>
        <ContactFooter> 
          {/* <FooterContent>00개의 연락처</FooterContent> */}
          <FooterContent onPress={() => navigation.navigate(HomeScreens.DeleteList)}>연락처 삭제목록</FooterContent>
        </ContactFooter>
    </SafeAreaView>
  );
};

const UserSearch = styled.TextInput`
  border-width: 1px;
  padding: 20px 15px 20px 15px;
  margin-left: -6px;
  border-color: #ccc;
`

const ContactContainer = styled.ScrollView`
    border-bottom-width: 1;
    border-color: #ccc;
    padding: 15px 10px 15px 10px;
`
const ConTactScrollView = styled.ScrollView`
    height: ${({height}) => windowHeight - 230}px;
`

const ContactData = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const Title = styled.Text`
    font-size: 16px;
    font-weight: 600;
    align-items: flex-end;
    padding-bottom: 3px;
`;

const Phonenumber = styled.Text`
    font-size:16px;
    font-weight: 600;
    align-items: flex-end;
`;

const ContactButtonContainer = styled.View`
    flex-direction: row;
`
const ContactFooter = styled.View`
  flex-direction: row;
  background-color: #e9e9e9;
  border-top-width: 1px;
  border-color: #ccc;
  justify-content: center;
  height: ${({height}) => windowHeight};
`

const FooterContent = styled.Text`
  font-size: 16px;
  padding: 15px;
  flex-direction: row;
`
export default MainScreen;
