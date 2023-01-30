import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Dimensions, TextInput, Image, StyleSheet, ScrollView, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components";
import Modal from 'react-native-modal';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getBottomSpace } from 'react-native-iphone-x-helper'
import axios from "axios";
let profileIconPath = require('../../Assets/Icons/basic-profile.jpg');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddModal = (Props: any): React.ReactElement => {

    const titleHandleChange = (e:any) => {
        Props.setTitleValue(e.nativeEvent.text)
    };
    const contentHandleChange = (e:any) => {
        Props.setContentValue(e.nativeEvent.text)
    };

    return (
        <SafeAreaView>
            <View style={styles.addWrap}>
                <View style={styles.addAlign}>
                    <Text>제목</Text>
                    <TextInput
                        style={styles.inputStyle} 
                        placeholder="제목을 입력해주세요."
                        value={Props.titleValue}
                        onChange={titleHandleChange}
                        autoFocus={true}
                    />
                </View>
                <View style={styles.addAlign}>
                    <Text>내용</Text>
                    <TextInput 
                        style={styles.inputStyle} 
                        placeholder="내용을 입력해주세요."
                        value={Props.contentValue}
                        onChange={contentHandleChange}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    avoid: {
        flex: 1,
    },
    addWrap: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#fff",
        marginTop: 15,
        width: windowWidth - 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
      },
    inputStyle: {
        // borderLeftWidth: 1,
        // borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingLeft: 10,
        // marginLeft: 10,
        
    },
    addAlign: {
        flexDirection: 'row',
        paddingVertical: 10,
        flexGrow: 1,
        // borderBottomWidth: 1,
        borderColor: "#ccc",
    }
    
})



export default AddModal;




