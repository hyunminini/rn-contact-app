import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import type { ContactData } from "../ApiData/interface";
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import styled from 'styled-components';

const ListView = () => {
    const [userList, setUserList] = useState<Array<ContactData>>([]);

    const getUserList = async () => {
        // 주말에 리덕스로 적용하기~~
        const res = await axios.get('http://localhost:8080/contact/all');
        setUserList(res.data);
      }

      useEffect(() => {
        getUserList();
      }, []);

    return (
        <View> 
            {userList.map((content, i) => {
                return (
                    <ScrollWrap>
                        <Title>{content.name}</Title>
                        <Phonenumber>{content.phonenumber}</Phonenumber>
                        {/* <Text>{content.email}</Text> */}
                    </ScrollWrap>
                )
            })}
        </View>
    );
}

const ScrollWrap = styled.ScrollView`
    margin-bottom: 10px;
    border-bottom-width: 1;
    border-color: #ccc;
    padding-bottom: 5px;
`

const Title = styled.Text`
    font-size: 16px;
    font-weight: 600;
    align-items: flex-end;
    padding: 0 10px;
    margin-bottom: 3px;
`;

const Phonenumber = styled.Text`
    font-size:16px;
    font-weight: 600;
    align-items: flex-end;
    padding: 0 10px;
`;


export default ListView;