import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Dimensions, TextInput } from "react-native";
import styled from "styled-components";
import Modal from 'react-native-modal';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import axios from "axios";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditModals = (Props: any): React.ReactElement => {

    useEffect(() => {
        setEditName(Props.editData.name);
        setEditPhoneNumber(Props.editData.phoneNumber);
        setEditEmail(Props.editData.email);
    }, [Props.editModal]);

    const [editName, setEditName] = useState<String>('');
    const [editPhoneNumber, setEditPhoneNumber] = useState<String>('');
    const [editEmail, setEditEmail] = useState<String>('');

    const editSubmit = async() => {
        const userNo = Props.editData.userNo;
        const name = editName;
        const phoneNumber = editPhoneNumber;
        const email = editEmail;
        
        axios.put(`http://172.30.1.92:8080/contact/${Props.editData.userNo}`, {userNo, name, phoneNumber, email});

        setTimeout(() => {
            Props.getUserList();
        }, 200)
        Props.setEditModal(false)
    }  


    const editNameHandler = (e:any) => {
        e.preventDefault();
        setEditName(e.nativeEvent.text);
      }
    
    const editPhoneNumberHandler = (e:any) => {
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(e.nativeEvent.text)) {
            setEditPhoneNumber(e.nativeEvent.text);
        }
    }

    const editEmailHandler = (e:any) => {
        e.preventDefault();
        setEditEmail(e.nativeEvent.text);
    }

    useEffect(() => {
        if (editPhoneNumber) {
            setEditPhoneNumber(editPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (editPhoneNumber) {
            setEditPhoneNumber(editPhoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
      }, [editPhoneNumber]);

    const editClose = () => {
        setEditName('');
        setEditPhoneNumber('');
        setEditEmail('');
        console.log("----")
    }


    return (
        <StyledSafeAreaView>
            <Modal
                isVisible={Props.editModal}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                style={{ justifyContent: "center", alignItems: "center" }}
            >
                <EditModalContainer>
                    <ButtonWrap>
                        <StyledButton onPress={() => {
                            Props.setEditModal(false);
                            editClose()
                        }}>
                            <ButtonText>취소</ButtonText>
                        </StyledButton>
                        <EditTitle>연락처 수정</EditTitle>
                        <StyledButton onPress={editSubmit}>
                            <ButtonText>완료</ButtonText>
                        </StyledButton>
                    </ButtonWrap>
                    <EditImg>
                        <Text>이미지</Text>
                    </EditImg>
                    
                    <InputBoxWrap>
                        <InputBox 
                            placeholder='이름을 입력해주세요.'
                            type='text'
                            autoFocus={true}
                            required
                            onChange={editNameHandler}
                            defaultValue={editName}
                         />
                        <InputBox 
                            placeholder='전화번호를 입력해주세요.'
                            type='tel' 
                            onkeypress='return checkNumber(event)'
                            required
                            onChange={editPhoneNumberHandler}
                            defaultValue={editPhoneNumber}
                         />
                        <InputBox 
                            placeholder='이메일을 입력해주세요.'
                            type='email'
                            pattern=".+@douzone\.com"
                            onChange={editEmailHandler}
                            defaultValue={editEmail}
                         />
                    </InputBoxWrap>
                </EditModalContainer>
            </Modal>
        </StyledSafeAreaView>
    );
};

const StyledSafeAreaView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const EditModalContainer = styled.View`
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: -20px;
    margin: 0;
    padding: 0;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    height: ${({height}) => windowHeight - 50}px;
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

const EditTitle = styled.Text`
    font-size: 16px;
    padding: 15px;
    color: #333;
    font-weight: 600;
`

const EditImg = styled.View`
    width: 140px;
    height: 140px;
    border-radius: 9999px;
    background-color: #b9b9b9;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`
const InputBoxWrap = styled.View`
    background-color: red;
    width: 100%;
    margin-top: 35px;
`

const InputBox = styled.TextInput`
    border-color: #ccc;
    border-width: 0.5px;
    background-color: #fff;
    padding: 15px 20px 15px 20px;
    width: 100%;

`

export default EditModals;




