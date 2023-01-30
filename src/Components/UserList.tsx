import React, { useState, useEffect } from 'react';
import { Link } from '@react-navigation/native';
import { useUsers } from '../ApiData/ContactApi/userData';
import { 
  View, 
  TouchableOpacity, 
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HomeScreens } from '../Navigators/HomeStackNavigators';
import axios, { AxiosError } from 'axios';
import styled from 'styled-components/native';

let deleteIconPath = require('../Assets/Icons/outline_delete_black_48dp.png');
let editIconPath = require('../Assets/Icons/outline_edit_black_24dp.png');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserList = (Props:any) => {
    const {
        userList, 
        setEditModal, 
        filterSearch, 
        navigation, 
        setEditData, 
        setDeleteModal, 
        setSelectUser, 
    } = Props;

    // const onSuccess = (data:any) => {
    //   console.log("Data")
    // };

    // const onError = (error:any) => {
    //   console.log("Data Fetching Fail..", error);
    // };

    // const { isLoading, data, isError, error, refetch } = useUsers({
    //   onSuccess,
    //   onError,
    // });

    // if (isLoading) return <Text>Loading...!!</Text>;
    // if (isError) return <Text>Error...!!</Text>;

    return (
        <>
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
              .map((contentInfo, key) => {
                return (       
                    <ContactContainer navigation={navigation} key={key} >
                      <TouchableOpacity onPress={() => navigation.navigate(HomeScreens.Details, {contentInfo})}>
                        <ContactData>
                          <View>
                            <Title>{contentInfo.name}</Title>
                            <Phonenumber>{contentInfo.phoneNumber}</Phonenumber>
                          </View>
                          <ContactButtonContainer>
                            <TouchableOpacity 
                              style={{marginRight: 3}}
                              onPress={() => {setEditModal(true), setEditData(contentInfo)}}
                            >
                              <IconImage 
                                source={editIconPath}
                              />
                            </TouchableOpacity>

                            <TouchableOpacity               
                               onPress={(e:any) => {
                                setDeleteModal(true);
                                setSelectUser(contentInfo);  
                              }}
                            >
                            <IconImage 
                                source={deleteIconPath}
                             />
                            </TouchableOpacity>
                          </ContactButtonContainer>
                        </ContactData>
                      </TouchableOpacity>
                    </ContactContainer>  
                )
            })}
        </>
    );
}

const IconImage = styled.Image`
  tintColor: ${({ theme }) => theme.color.icon};
  width: 25px;
  height: 25px;
`


const ContactContainer = styled.ScrollView`
    border-bottom-width: 1px;
    border-color: #ccc;
    padding: 15px 10px 15px 10px;
`

const ContactData = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const Title = styled.Text`
    color: ${({ theme }) => theme.color.text};
    font-size: 16px;
    font-weight: 600;
    align-items: flex-end;
    padding-bottom: 3px;
`;

const Phonenumber = styled.Text`
    color: ${({ theme }) => theme.color.text};
    font-size:16px;
    font-weight: 600;
    align-items: flex-end;
`;

const ContactButtonContainer = styled.View`
    flex-direction: row;
`

export default UserList;