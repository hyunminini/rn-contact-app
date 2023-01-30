import React, { useState, useEffect } from 'react';
import { 
  TouchableOpacity, 
  Dimensions,
  Text,
} from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
import type { ContactData, EditData } from '../ApiData/interface';
import { HomeScreens } from '../Navigators/HomeStackNavigators';
import axios, { AxiosError } from 'axios';
import styled from 'styled-components/native';
import AddModal from '../Components/Modal/AddModal';
import EditModal from '../Components/Modal/EditModal';
import DeleteModal from '../Components/Modal/DeleteModal';
import { API_URL } from "@env";
import { dark, light } from '../Styles/theme';
import UserList from '../Components/UserList';
import { NetworkInfo } from 'react-native-network-info'
import { useQuery } from 'react-query';
import { useUsers } from '../ApiData/ContactApi/userData';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// type MainScreenNavigationProps = StackNavigationProp<
//   HomeStackParamList, 
//   HomeScreens.Main 
// >;

// interface MainScreenProps {
//   navigation: MainScreenNavigationProps;
// }

const MainScreen = (Props:any) => {  
  const {
    navigation, 
    setAppTheme, 
    appTheme, 
    addModal, 
    setAddModal
  } = Props;
  const [userList, setUserList] = useState<Array<ContactData>>([]);
  const [filterSearch, setFilterSearch] = useState<String>('');
  const [editModal, setEditModal] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState<Array<ContactData>>([]);
  const [editData, setEditData] = useState<Array<EditData>>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  
  const getUsers = async () => {
    const res = await axios.get(`${API_URL}/contact/all`);
    setUserList(res.data);
  }
  
  useEffect(() => {
    getUsers();
  }, []);

  const searchNameHandler = (e:any) => {
    e.preventDefault();
    setFilterSearch(e.nativeEvent.text);
  }

  useEffect(() => {
    NetworkInfo.getIPAddress().then(ipAddress => {
      console.log(ipAddress);
    });
  }, [])
  
  return (
    <Container>
        <AddModal 
          addModal={addModal}
          setAddModal={setAddModal}
        />
        <EditModal 
          editModal={editModal}
          setEditModal={setEditModal}
          editData={editData}
          setEditData={setEditData}
          getUsers={getUsers}
        />
        <DeleteModal 
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          selectUser={selectUser}
          getUsers={getUsers}
        />
        <UserSearch 
              placeholder='이름을 입력해주세요.'
              value={filterSearch}
              onChange={searchNameHandler}
        /> 
        <ContactScrollView>
          <UserList
            userList={userList}
            filterSearch={filterSearch}
            navigation={navigation}
            setEditModal={setEditModal}
            setEditData={setEditData}
            setDeleteModal={setDeleteModal}
            setSelectUser={setSelectUser}
          />   
        </ContactScrollView>
        <ContactFooter> 
          {appTheme.color.bg === "#f0f0f0" ? 
            <TouchableOpacity onPress={() => setAppTheme(dark)}>
              <FooterContent>다크모드 진행중..</FooterContent>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => setAppTheme(light)}>
              <FooterContent>라이트 모드</FooterContent>
            </TouchableOpacity>
          }
          <FooterContent onPress={() => navigation.navigate(HomeScreens.DeleteList)}>연락처 삭제목록</FooterContent>
        </ContactFooter>
    </Container>
  );
};


const Container = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.color.bg};
`

const UserSearch = styled.TextInput.attrs({
  placeholderTextColor: "#cccccc",
  fontWeight: '600'
})`
  font-size: 15px;
  color: ${({ theme }) => theme.color.text};
  border-bottom-width: 1px;
  border-top-width: 1px;
  padding: 20px 15px 20px 15px;
  margin-left: -6px;
  border-color: ${({ theme }) => theme.color.border};
`


const ContactScrollView = styled.ScrollView`
    height: ${windowHeight - 230}px;
`

const ContactData = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const ContactFooter = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.color.header};
  border-top-width: 1px;
  border-color: #ccc;
  justify-content: center;
  height: ${windowHeight - 230}px ;
`

const FooterContent = styled.Text`
  font-size: 16px;
  padding: 15px;
  flex-direction: row;
`
export default MainScreen;
