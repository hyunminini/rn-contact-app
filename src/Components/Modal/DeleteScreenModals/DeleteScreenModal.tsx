import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, View, Text, Alert, TouchableOpacity, Dimensions, TextInput, Pressable } from "react-native";
import styled from "styled-components/native";
import Modal from 'react-native-modal';
import axios from "axios";
import { API_URL } from "@env";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DeleteScreenModal = (Props: any): React.ReactElement =>  {
    const userNo = Props.selectDelUser.userNo;
    const completDeletionSubmit = () => {
        Alert.alert(
            `${Props.selectDelUser.name}님을 삭제하시겠습니까?`,
            "삭제 후 복구가 불가능합니다.",
            [
              {
                text: "완료",
                onPress: () => {
                    axios.delete(`${API_URL}/contact/delete/${Props.selectDelUser.userNo}`);
                    setTimeout(() => {
                        Props.getDeleteList();
                    }, 200)
                    Props.setDeleteScreenModal(false)
                },
              },
              { text: "취소", onPress: () => console.log("완전삭제 취소!!") },          
            ],
            { cancelable: false }
        );    
    }
    const restorationSubmit = () => {
        Alert.alert(
            `${Props.selectDelUser.name}님을 복구하시겠습니까?`,
            "연락처 목록으로 이동합니다.",
            [
              {
                text: "완료",
                onPress: () => {
                    axios.put(`${API_URL}/contact/delete/Restoration/${Props.selectDelUser.userNo}`, {userNo});
                    setTimeout(() => {
                        Props.getDeleteList();
                    }, 200)
                    Props.setDeleteScreenModal(false)
                },
              },
              { text: "취소", onPress: () => console.log("완전삭제 취소!!") },          
            ],
            { cancelable: false }
        );
        }   

    return (
        <StyledSafeAreaView>
            <Modal 
                isVisible={Props.deleteScreenModal}
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
                        <ButtonText onPress={completDeletionSubmit}>
                            연락처 삭제
                        </ButtonText>
                    </StyledButton>
                    <StyledButton onPress={restorationSubmit}>
                        <ButtonText>
                            연락처 복구
                        </ButtonText>
                    </StyledButton>
                    <StyledButton 
                        onPress={() => {
                            Props.setDeleteScreenModal(false)
                        }}
                    >
                        <ButtonText>취소</ButtonText>
                    </StyledButton>
                </ButtonWrap>
            </Modal>
        </StyledSafeAreaView>
  
    )
}
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
    width: ${windowWidth - 30}px;
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

export default DeleteScreenModal;