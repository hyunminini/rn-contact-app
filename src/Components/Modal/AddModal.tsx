import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Dimensions, TextInput, Image, StyleSheet, ScrollView, Alert } from "react-native";
import styled from "styled-components/native";
import Modal from 'react-native-modal';
import axios from "axios";
import { API_URL } from "@env";
import { useMutation, useQuery, useQueryClient } from "react-query";

let profileIconPath = require('../../Assets/Icons/basic-profile.jpg');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddModal = (Props: any): React.ReactElement => {
   const { setAddModal } = Props;
   const [nameValue, setNameValue] = useState<String>('');
   const [phoneNumberValue, setPhoneNumberValue] = useState<String>('');
   const [emailValue, setEmailValue] = useState<String>('');
   
   const name = nameValue;
   const phoneNumber = phoneNumberValue;
   const email = emailValue;

   const nameHandleChange = (e:any) => {
    setNameValue(e.nativeEvent.text);
   }
   const phoneNumberHandleChange = (e:any) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.nativeEvent.text)) {
        setPhoneNumberValue(e.nativeEvent.text);
    }
  }

  const mutationAdd = useMutation({
    mutationFn: async (newUser) => {
        await  axios.post(`${API_URL}/contact/add`, {name, phoneNumber, email});
    }
  });
  
   const emailHandleChange = (e:any) => {
    setEmailValue(e.nativeEvent.text);
   }

   const addSubmit = async() => {
    Alert.alert(
        `${name}님을 생성하시겠습니까?`,
        "",
        [
          {
            text: "완료",
            onPress: () => {
                // axios.post(`${API_URL}/contact/add`, {name, phoneNumber, email});
                mutationAdd.mutate()
                setTimeout(() => {
                    setAddModal(false);
                }, 50)
            },
          },
          { text: "취소", onPress: () => console.log("연락처 생성 취소!!") },          
        ],
        { cancelable: false }
    );

   }

  useEffect(() => {
    if (phoneNumberValue.length === 10) {
        setPhoneNumberValue(phoneNumberValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phoneNumberValue.length === 13) {
        setPhoneNumberValue(phoneNumberValue.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [phoneNumberValue]);

    return (
        <StyledSafeAreaView>
            <Modal
                isVisible={Props.addModal}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                style={{ justifyContent: "center", alignItems: "center" }}
            >
                <AddModalContainer>
                    <ButtonWrap>
                        <StyledButton onPress={() => {
                            Props.setAddModal(false);
                        }}>
                            <ButtonText>취소</ButtonText>
                        </StyledButton>
                        <AddTitle>새로운 연락처</AddTitle>
                        <StyledButton>
                            <ButtonText onPress={addSubmit}>완료</ButtonText>
                        </StyledButton>
                    </ButtonWrap>
                    <ScrollView>
                    <AddImg>
                        <Image 
                            style={{width: 150, height: 150, borderRadius: 9999}}
                            source={profileIconPath}
                        />
                    </AddImg>
                    
                    <View style={styles.InputBoxWrap}>
                        <InputBox 
                            placeholder='이름을 입력해주세요.'
                            type='text'
                            onChange={nameHandleChange}
                            value={nameValue}
                            autoFocus={true}
                            required
                         />
                        <InputBox 
                            placeholder='전화번호를 입력해주세요.'
                            type='tel' 
                            onChange={phoneNumberHandleChange} 
                            onkeypress='return checkNumber(event)'
                            value={phoneNumberValue}
                            required
                         />
                        <InputBox 
                            placeholder='이메일을 입력해주세요.'
                            type='email'
                            pattern=".+@douzone\.com"
                            onChange={emailHandleChange}
                            value={emailValue}
                         />
                    </View>
                    </ScrollView>
                </AddModalContainer>
            </Modal>
        </StyledSafeAreaView>
    );
};

const styles = StyleSheet.create({
    addTitle: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    InputBoxWrap: {
        width: windowWidth,
        marginTop: 35,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
})

const StyledSafeAreaView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const AddModalContainer = styled.View`
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: -20;
    margin: 0;
    padding: 0;
    background-color: rgba(255, 255, 255, 1);
    height: ${ windowHeight - 50}px;
    background-color: #e9e9e9;
`

const ButtonWrap = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

const StyledButton = styled.TouchableOpacity`
    justify-content: center;
`;

const ButtonText = styled.Text`
    font-size: 16px;
    padding: 15px;
    color: #666;
`

const AddTitle = styled.Text`
    font-size: 16px;
    padding: 15px;
    color: #333;
    font-weight: 600;
`

const AddImg = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`
const InputBox = styled.TextInput`
    border-color: #ccc;
    border-width: 0.5px;
    background-color: #fff;
    padding: 15px 15px 15px 15px;
`

export default AddModal;




