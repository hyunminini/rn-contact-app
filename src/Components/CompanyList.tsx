import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components/native';

let deleteIconPath = require('../Assets/Icons/outline_delete_black_48dp.png');
let editIconPath = require('../Assets/Icons/outline_edit_black_24dp.png');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CompanyList = (Props:any) => {
    const { 
        companyList,
        setEditModalOpen,
        setSubEditData,
        setDeleteModalOpen,
        setSubDeleteData,
    } = Props;
    return (
        <>
        <Text style={styles.subInfoTitle}>회사정보</Text>
        {companyList.map((companyContent, key) => {
          return (
            <View style={styles.subContentWrap} key={key}>
              <View>
                <Text style={styles.contentTitle}>{companyContent.title}</Text>
                <Text>{companyContent.content}</Text>
              </View>
              
              <View style={styles.btnWrap}>
                <TouchableOpacity onPress={() => {
                  setEditModalOpen(true), setSubEditData(companyContent)
                }}>
                  <Image 
                    style={{width: 20, height: 20, tintColor: '#b8b8b8'}}
                    source={editIconPath}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  setDeleteModalOpen(true), 
                  setSubDeleteData(companyContent)
                }}>
                  <Image 
                    style={{width: 20, height: 20, tintColor: '#b8b8b8',}}
                    source={deleteIconPath}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )
          })}
        </>
    );
}

const styles = StyleSheet.create({
    void: {
      width: windowWidth - 20,
      flex: 1,
    },
    container: {
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    scrollStyle: {
      height: windowHeight - 170,
    },
    imageWrap: {
      alignItems: 'center',
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 9999,
    },
    userName: {
      fontSize: 22,
      fontWeight: "600",
      marginTop: 10,
      marginBottom: 10,
    },
    phoneNumberWrap: {
      marginTop: 10,
      backgroundColor: "#fff",
      paddingHorizontal: 15,
      paddingVertical: 10,
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
    contentTitle: {
      marginBottom: 5,
    },
    content: {
      fontSize: 16,
      color: "#3668C9",
      fontWeight: "500",
    },
    subInfoTitle: {
      marginTop: 25,
      marginBottom: -5,
      paddingHorizontal: 5,
    },
    subContentWrap: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: "#fff",
      marginTop: 10,
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
    subContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      // borderBottomWidth: 1,
      borderColor: "#e9e9e9",
      paddingVertical: 5
    },
    addContentWrap: {
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
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    addImage: {
      width: 25,
      height: 25,
      tintColor: '#3668C9',
    },
    btnWrap: {
      flexDirection: 'row',
      justifyContent: 'center',
      // backgroundColor: 'red'
    },
    addBtn: {
      paddingHorizontal: 70,
      paddingVertical: 10,
      // borderWidth: 1,
      borderRadius: 10,
      margin: 10,
      backgroundColor: '#3668C9'
    },
    btnText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 14,
    },
    keybordHeight: {
      width: windowWidth - 20,
    },
    InputRow: {
      // flexDirection: 'row',
      paddingVertical: 2,
      // alignItems: 'center',
    },
    InputTitle: {
      fontSize: 16,
    },
    inputStyles: {
      borderWidth: 1,
      padding: 5,
      width: windowWidth - 50,
      borderColor: "#ccc",
    },
    textRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
    },
    companyWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    companyAdd: {
      marginTop: 25,
      marginBottom: -5,
    },
    companyInfoWrap: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: "#fff",
      marginTop: 10,
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
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection: 'column',
    },
    removeIcon: {
      width: 25,
      height: 25,
      tintColor: 'red',
    },
    companyTitleWrap: {
      width: windowWidth - 50,
      borderTopWidth: 1,
      borderColor: "#ccc",
      paddingTop: 5,
      marginTop: 15,
      // backgroundColor: '#ccc',
      flexDirection: 'column',
    },
    companyContent: {
      lineHeight: 23,
      color: "#060606",
    },
    footerStyle: {
      width: windowWidth,
      borderTopWidth: 1,
      borderColor: '#ccc',
    }
  
  });

export default CompanyList;