import React, { useState, useEffect } from "react";
import { Alert, Dimensions, Image } from "react-native";
import styled from "styled-components/native";
import Modal from 'react-native-modal';
import axios from "axios";
import { API_URL } from "@env";

let profileIconPath = require('../../../Assets/Icons/basic-profile.jpg');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditModals = (Props: any): React.ReactElement => {
    const {
        subEditData,
        editModalOpen,
        getDetails,
        getCompany,
        setEditModalOpen,
    } = Props;

    useEffect(() => {
        setEditTitle(subEditData.title);
        setEditContent(subEditData.content);
    }, [editModalOpen]);

    const [editTitle, setEditTitle] = useState<String>('');
    const [editContent, setEditContent] = useState<String>('');

    const title = editTitle
    const content = editContent;
    const detailNo = subEditData.detailNo;

    const editTitleHandler = (e:any) => {
        e.preventDefault();
        setEditTitle(e.nativeEvent.text);
    }
    const editContentHandler = (e:any) => {
        e.preventDefault();
        setEditContent(e.nativeEvent.text);
    }
    const editSubmit = async() => {
        Alert.alert(
            `${title}를 수정하시겠습니까?`,
            "",
            [
              {
                text: "완료",
                onPress: () => {
                    axios.put(`${API_URL}/detail/${subEditData.detailNo}`, {detailNo, title, content});
                    setTimeout(() => {
                        getDetails();
                        getCompany();
                    }, 100)
                    setEditModalOpen(false)
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
                isVisible={editModalOpen}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                style={{ justifyContent: "center", alignItems: "center" }}
            >
                <EditModalContainer>
                    <ButtonWrap>
                        <StyledButton onPress={() => {
                            setEditModalOpen(false);
                        }}>
                            <ButtonText>취소</ButtonText>
                        </StyledButton>
                        <EditTitle>추가정보 수정</EditTitle>
                        <StyledButton onPress={editSubmit}>
                            <ButtonText>완료</ButtonText>
                        </StyledButton>
                    </ButtonWrap>
                    <EditImg>
                        <Image 
                            style={{width: 150, height: 150, borderRadius: 9999}}
                            source={profileIconPath}
                        />
                    </EditImg>
                    
                    <InputBoxWrap>
                        <InputBox 
                            placeholder='제목을 입력해주세요.'
                            type='text'
                            defaultValue={editTitle}
                            onChange={editTitleHandler}
                            autoFocus={true}
                            required
                         />
                        <InputBox 
                            placeholder='내용을 입력해주세요.'
                            type='text'
                            onChange={editContentHandler}
                            defaultValue={editContent} 
                            onkeypress='return checkNumber(event)'
                            required
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
    height: ${windowHeight - 50}px;
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




