import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView, 
    Text,
    View, 
    TouchableOpacity, 
    Image,
    Dimensions
  } from 'react-native';
import {
  HomeScreens,
  HomeStackParamList,
} from '../Navigators/HomeStackNavigators';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import styled from 'styled-components';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type DeleteListScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  HomeScreens.Details
>;

// DetailsScreen Props 의 타입들을 지정. (리액트에서 proptypes 지정하는 것 처럼)
interface DeleteListScreenProps {
  route: {params: DeleteListParams}; // 루트의 파라미터로 방금 지정해준 DetailsParams 타입이 온다.
  navigation: DeleteListScreenNavigationProps;
}

const DeleteListScreen: React.FunctionComponent<DeleteListScreenProps> = props => {
  const {navigation, route} = props;
  const {params} = route;
  type DeleteData = { userNo: number; name: string; phonenumber: string; email: string, status: string, deleteTime: string};
  const [deleteList, setDeletelist] = useState<Array<DeleteData>>([]);
  const [filterSearch, setFilterSearch] = useState<String>('');

  const getDeleteList = async () => {
    const res = await axios.get('http://172.30.1.92:8080/contact/delete/all');
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

    <UserSearch 
          placeholder='이름을 입력해주세요.'
          value={filterSearch}
          onChange={searchNameHandler}
    /> 
    <ConTactScrollView>             
        {deleteList.filter((searchData) => 
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
                        <Text>삭제ID: </Text>
                        <Text>삭제시간: {content.deleteTime}</Text>
                      </View>
                      <ContactButtonContainer>
                        <TouchableOpacity 
                          style={{marginRight: 3}}
                          onPress={() => {setEditModal(true), setEditData(content)}}
                        >
             
                        </TouchableOpacity>
                      </ContactButtonContainer>
                    </ContactData>
                  </TouchableOpacity>
                </ContactContainer>  
            )
        })}
    </ConTactScrollView>
    <ContactFooter> 
      <FooterContent>30일 후에 완전 삭제됩니다.</FooterContent>
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
export default DeleteListScreen;