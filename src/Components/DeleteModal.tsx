import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Dimensions, TextInput, Pressable } from "react-native";
import styled from "styled-components";
import Modal from 'react-native-modal';
import axios from "axios";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DeleteModal = (Props: any): React.ReactElement => {

    const deleteSubmit = () => {
    const userNo = Props.selectUser.userNo;
    const name = Props.selectUser.name;
    const phoneNumber = Props.selectUser.phoneNumber;
    const status = "F";
    
    axios.put(`http://172.30.1.92:8080/contact/delete/${Props.selectUser.userNo}`, {userNo, name, phoneNumber, status});

    setTimeout(() => {
        Props.getUserList();
    }, 200)

    Props.setDeleteModal(false)
  }   

    return (
        <StyledSafeAreaView>
            <Modal 
                isVisible={Props.deleteModal}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                backdropOpacity={0.4}
                onBackdropPress={() => {
                    Props.setDeleteModal(false)
                }}
                style={{ 
                    justifyContent: "center", 
                    alignItems: "center",
                }}
            >
                <ButtonWrap>
                    <StyledButton>
                        <ButtonText
                            onPress={deleteSubmit}
                        >
                            연락처 삭제
                        </ButtonText>
                    </StyledButton>
                    <StyledButton 
                        onPress={() => {
                            Props.setDeleteModal(false)
                        }}
                    >
                        <ButtonText>취소</ButtonText>
                    </StyledButton>
                </ButtonWrap>
            </Modal>
        </StyledSafeAreaView>
    );
};

const StyledSafeAreaView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const ButtonWrap = styled.View`
    flex-direction: column;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    
`

const StyledButton = styled.TouchableOpacity`
    justify-content: center;
    background-color: #fff;
    width: ${({width}) => windowWidth - 30}px;
    border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
`;

const ButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    padding: 15px;
    color: #666;
    text-align: center;
`

export default DeleteModal;




