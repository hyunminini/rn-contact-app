import React, { useState, useEffect } from 'react';
import { 
    Text,
    View, 
    TouchableOpacity, 
    Image,
    Dimensions
  } from 'react-native';
import styled from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let settingIconPath = require('../Assets/Icons/outline_settings_black_24dp.png');

const DeleteUserList = (Props:any) => {
    const {
        deleteList, 
        filterSearch,
        setDeleteScreenModal,
        setSelectDelUser,
    } = Props;
    return (
        <>
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
                <ContactContainer>
                  <TouchableOpacity>
                    <ContactData>
                      <View>
                        <Title>{content.name}</Title>
                        <Phonenumber>{content.phoneNumber}</Phonenumber>
                        <Text>삭제ID: </Text>
                        <Text>삭제시간: {content.deleteTime}</Text>
                      </View>
                      <View>
                        <TouchableOpacity  onPress={() => {
                          setDeleteScreenModal(true);
                          setSelectDelUser(content);
                        }}>
                        <Image 
                                style={{width: 20, height: 20, marginTop: -38, opacity: 0.3}}
                                source={settingIconPath}
                              />
                        </TouchableOpacity>
                      </View>
                    </ContactData>
                  </TouchableOpacity>
                </ContactContainer>  
            )
        })}
        </>
    );
}

const ContactContainer = styled.ScrollView`
    border-color: #ccc;
    border-bottom-width: 1px;
    padding: 15px 10px 15px 10px;
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

export default DeleteUserList;