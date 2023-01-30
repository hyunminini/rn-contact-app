import React from "react";
import {Alert, Dimensions } from "react-native";
import styled from "styled-components/native";
import Modal from 'react-native-modal';
import axios from "axios";
import { API_URL } from "@env";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DeleteModal = (Props: any): React.ReactElement => {

    const detailNo = Props.subDeleteData.detailNo;
    const title = Props.subDeleteData.title;

    const deleteSubmit = () => {   
        Alert.alert(
            `${title}를 삭제하시겠습니까?`,
            "삭제 후 복구 불가능합니다.",
            [
              {
                text: "완료",
                onPress: () => {
                  axios.delete(`${API_URL}/detail/delete/${detailNo}`);
                  setTimeout(() => {
                    Props.getDetails();
                    Props.getCompany();
                }, 100)
            
                Props.setDeleteModalOpen(false)
                },
              },
              { text: "취소", onPress: () => console.log("정보삭제 취소!!") },          
            ],
            { cancelable: false }
        ); 
  }   


    return (
        <StyledSafeAreaView>
            <Modal 
                isVisible={Props.deleteModalOpen}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                backdropOpacity={0.4}
                onBackdropPress={() => {
                    Props.setDeleteModalOpen(false)
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
                            {Props.subDeleteData.title} 삭제
                        </ButtonText>
                    </StyledButton>
                    <StyledButton 
                        onPress={() => {
                            Props.setDeleteModalOpen(false)
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

export default DeleteModal;




