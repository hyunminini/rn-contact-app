import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView, 
    Dimensions
  } from 'react-native';
import axios from 'axios';
import styled from 'styled-components/native';
import { DeleteData } from '../ApiData/interface';
import DeleteScreenModal from '../Components/Modal/DeleteScreenModals/DeleteScreenModal';
import { API_URL } from "@env";
import DeleteUserList from '../Components/DeleteUserList';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DeleteListScreen = (Props:any) => {
  const {route} = Props;
  const [deleteList, setDeletelist] = useState<Array<DeleteData>>([]);
  const [filterSearch, setFilterSearch] = useState<String>('');
  const [deleteScreenModal, setDeleteScreenModal] = useState<boolean>(false);
  const [selectDelUser, setSelectDelUser] = useState<Array<DeleteData>>([]);
 
  const getDeleteList = async () => {
    const res = await axios.get(`${API_URL}/contact/delete/all`);
    setDeletelist(res.data);
  }

  const searchNameHandler = (e:any) => {
    e.preventDefault();
    setFilterSearch(e.nativeEvent.text);
  }
  
  useEffect(() => {
    getDeleteList();
  }, []);

  return (
    <SafeAreaView >
      <DeleteScreenModal 
        deleteScreenModal={deleteScreenModal}
        setDeleteScreenModal={setDeleteScreenModal}
        selectDelUser={selectDelUser}
        setSelectDelUser={setSelectDelUser}
        getDeleteList={getDeleteList}
      />
      <UserSearch 
          placeholder='이름을 입력해주세요.'
          value={filterSearch}
          onChange={searchNameHandler}
      /> 
    <ConTactScrollView>  
        <DeleteUserList 
          deleteList={deleteList}
          filterSearch={filterSearch}
          setDeleteScreenModal={setDeleteScreenModal}
          setSelectDelUser={setSelectDelUser}
        />           
    </ConTactScrollView>
    <ContactFooter> 
      <FooterContent>일주일 경과되면 삭제됩니다.</FooterContent>
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

const ConTactScrollView = styled.ScrollView`
    height: ${windowHeight - 230}px;
`

const ContactFooter = styled.View`
  flex-direction: row;
  background-color: #e9e9e9;
  border-top-width: 1px;
  border-color: #ccc;
  justify-content: center;
  height: ${windowHeight};
`

const FooterContent = styled.Text`
  font-size: 16px;
  padding: 15px;
  flex-direction: row;
`
export default DeleteListScreen;