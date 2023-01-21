import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Dimensions, TextInput } from "react-native";
import styled from "styled-components";
import Modal from 'react-native-modal';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getBottomSpace } from 'react-native-iphone-x-helper'

const AddModal = (Props: any): React.ReactElement => {
   const screenWidth = Dimensions.get('window').width;
   const screenHeight = Dimensions.get('window').height - getStatusBarHeight()- getBottomSpace();

   const [phonenumberValue, setPhonenumberValue] = useState<String>('');
   
   const handleChange = (e:any) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.nativeEvent.text)) {
        setPhonenumberValue(e.nativeEvent.text);
    }
  }

  useEffect(() => {
    if (phonenumberValue.length === 10) {
        setPhonenumberValue(phonenumberValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phonenumberValue.length === 13) {
        setPhonenumberValue(phonenumberValue.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [phonenumberValue]);

  console.log(phonenumberValue);

    return (
        <StyledSafeAreaView>
            <Modal
                isVisible={Props.addModal}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                style={{ justifyContent: "center", alignItems: "center" }}
            >
                <AddModalContainer style={{screenHeight: {screenHeight}}}>
                    <ButtonWrap>
                        <StyledButton onPress={() => {
                            Props.setAddModal(false);
                        }}>
                            <ButtonText>취소</ButtonText>
                        </StyledButton>
                        <AddTitle>새로운 연락처</AddTitle>
                        <StyledButton>
                            <ButtonText>완료</ButtonText>
                        </StyledButton>
                    </ButtonWrap>
                    <AddImg>
                        <Text>이미지</Text>
                    </AddImg>
                    <InputBoxWrap>
                        <InputBox 
                            placeholder='이름을 입력해주세요.'
                            autoFocus={true}
                         />
                        <InputBox 
                            placeholder='전화번호를 입력해주세요.'
                            type="tel" 
                            onChange={handleChange} 
                            onkeypress='return checkNumber(event)'
                            value={phonenumberValue}
                         />
                        <InputBox placeholder='이메일을 입력해주세요.' />
                    </InputBoxWrap>
                </AddModalContainer>
            </Modal>
        </StyledSafeAreaView>
    );
};

const StyledSafeAreaView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const AddModalContainer = styled.View`
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: -20px;
    margin: 0;
    padding: 0;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    height: 760px;
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

export default AddModal;




