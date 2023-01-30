import React, { useState, useEffect, useRef } from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView, Keyboard, Platform, Linking, Alert } from 'react-native';
import { API_URL } from "@env";
import { DetailData } from '../ApiData/interface';
import axios from 'axios';
import AddModal from '../Components/Modal/DetailModals/AddModal';
import EditModal from '../Components/Modal/DetailModals/EditModal';
import DeleteModal from '../Components/Modal/DetailModals/DeleteModal';
import styled from 'styled-components/native';
import CompanyList from '../Components/CompanyList';
import AddInfoList from '../Components/AddInfoList';

let profileIconPath = require('../Assets/Icons/basic-profile.jpg');
let addIconPath = require('../Assets/Icons/baseline_add_circle_black_24dp.png');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DetailsScreen = (Props: any) => {
  const { route } = Props;
  const {params} = route;
  const {contentInfo} = params;
  const [addInfoList, setAddInfoList] = useState<Array<DetailData>>([]);
  const [companyList, setCompanyList] = useState<Array<DetailData>>([]);
  const [titleValue, setTitleValue] = useState<string>('');
  const [contentValue, setContentValue] = useState<string>('');
  const [isKeyboardActivate, setIsKeyboardActivate] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [subEditData, setSubEditData] = useState<Array<DetailData>>([]);
  const [subDeleteData, setSubDeleteData] = useState<Array<DetailData>>([]);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [companyInfoModalOpen, setCompanyInfoModalOpen] = useState<boolean>(false);
  
  // 전화번호 전화 -> - 제거 
  const splitPhoneNumber = contentInfo.phoneNumber.split('-').join('');

  useEffect(() => {
    const keyboardWillShow = (e:any) => {
      setIsKeyboardActivate(true);
      if (Platform.OS === "ios") {
        setKeyboardHeight(e.endCoordinates.height);
      }
    };
    const keyboardWillHide = () => {
      setIsKeyboardActivate(false);
      if (Platform.OS === "ios") {
        setKeyboardHeight(0);
      }
    };
    if (Platform.OS === "android") {
      Keyboard.addListener("keyboardDidShow", keyboardWillShow);
      Keyboard.addListener("keyboardDidHide", keyboardWillHide);
    } else if (Platform.OS === "ios") {
      Keyboard.addListener("keyboardWillShow", keyboardWillShow);
      Keyboard.addListener("keyboardWillHide", keyboardWillHide);
    }

    // return () => {
    //   if (Platform.OS === "android") {
    //     Keyboard.removeListener("keyboardDidShow", keyboardWillShow);
    //     Keyboard.removeListener("keyboardDidHide", keyboardWillHide);
    //   } else if (Platform.OS === "ios") {
    //     Keyboard.removeListener("keyboardWillShow", keyboardWillShow);
    //     Keyboard.removeListener("keyboardWillHide", keyboardWillHide);
    //   }
    // };
  }, [])

  const keyboardOnHeight = keyboardHeight;
  
  const scrollViewRef = useRef<ScrollView>(null);

  const getDetails = async () => {
    const res = await axios.get(`${API_URL}/detail/all/${contentInfo.userNo}`);
    setAddInfoList(res.data);
  }
  const getCompany = async () => {
    const res = await axios.get(`${API_URL}/detail/companyAll/${contentInfo.userNo}`);
    setCompanyList(res.data);
  }

  const onPressTouch = () => {
    scrollViewRef.current?.scrollTo({ animated: true, y: + 9999 })
   }

  useEffect(() => {
    if (isKeyboardActivate === true) {
       setTimeout(() => {
        onPressTouch()
       }, 100) 
    }
  })

  useEffect(() => {
    getDetails();
    getCompany();
  }, [])

  const title = titleValue;
  const content = contentValue;
  const userNo = contentInfo.userNo;
  const classification = "company"
  const DetailAddSubmit = async() => {
    Alert.alert(
      `${title}를 생성하시겠습니까?`,
      "",
      [
        {
          text: "완료",
          onPress: () => {
            axios.post(`${API_URL}/detail/add`, {userNo, title, content});
            setAddModalOpen(false);
            setTitleValue('');
            setContentValue('');
            setTimeout(() => {
              getDetails();
            }, 100)
          },
        },
        { text: "취소", onPress: () => console.log("정보생성 취소!!") },          
      ],
      { cancelable: false }
  );
   }
   const CompanyAddSubmit = async() => {
    Alert.alert(
      `${title}를 생성하시겠습니까?`,
      "",
      [
        {
          text: "완료",
          onPress: () => {
            axios.post(`${API_URL}/detail/add`, {userNo, title, content, classification});
            setCompanyInfoModalOpen(false);
            setTitleValue('');
            setContentValue('');
            setTimeout(() => {
              getCompany();
            }, 100)
          },
        },
        { text: "취소", onPress: () => console.log("정보생성 취소!!") },          
      ],
      { cancelable: false }
  );
   }

   const hideKeyboard = () => {
    Keyboard.dismiss()
   };
  
  return (
    <SafeAreaView style={styles.container}>
      <EditModal
        editModalOpen={editModalOpen} 
        setEditModalOpen={setEditModalOpen}
        subEditData={subEditData}
        setSubEditdata={setSubEditData}
        getDetails={getDetails}
        getCompany={getCompany}
      />
      <DeleteModal 
        setDeleteModalOpen={setDeleteModalOpen}
        subDeleteData={subDeleteData}
        deleteModalOpen={deleteModalOpen}
        getDetails={getDetails}
        getCompany={getCompany}
      />
      <ScrollView 
        style={styles.scrollStyle}
        ref={scrollViewRef}
      >
        <View style={styles.imageWrap}>
          <Image 
            style={styles.profileImage}
            source={profileIconPath}
          />
          <Text style={styles.userName}>{contentInfo.name}</Text>
        </View>
        <TouchableOpacity 
          style={styles.phoneNumberWrap}
          onPress={() => {Linking.openURL(`tel:${splitPhoneNumber}`)}}
        >
          <Text style={styles.contentTitle}>전화번호</Text>
          <Text style={styles.content}>{contentInfo.phoneNumber}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.phoneNumberWrap} onPress={hideKeyboard}>
          <Text style={styles.contentTitle}>이메일</Text>
          <Text style={styles.content}>
            {contentInfo?.email?.length > 0 || contentInfo?.email === !null ? 
              <>{contentInfo.email}</> 
              : 
              <>입력된 이메일이 없습니다.</>
            }
          </Text>
        </TouchableOpacity>
        
        <View>
          <CompanyList 
            companyList={companyList}
            setEditModalOpen={setEditModalOpen}
            setSubEditData={setSubEditData}
            setDeleteModalOpen={setDeleteModalOpen}
            setSubDeleteData={setSubDeleteData}
          />
          
          {/* =====================회사정보 모달======================= */}
        {companyInfoModalOpen === true ?
          <AddModal 
            setCompanyInfoModalOpen={setCompanyInfoModalOpen}
            titleValue={titleValue} 
            setTitleValue={setTitleValue}
            contentValue={contentValue}
            setContentValue={setContentValue}
          />
          :
          null
        }
        {companyInfoModalOpen === false ?
          <TouchableOpacity 
            style={styles.addContentWrap}
            onPress={() => {
              setCompanyInfoModalOpen(true);
            }}  
          >
            <Image 
              style={styles.addImage}
              source={addIconPath}
            />
          </TouchableOpacity>
          :
          <View style={styles.addContentWrap}>
            <View style={styles.btnWrap}>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={CompanyAddSubmit}
              >
                <Text 
                  style={styles.btnText}
                >
                  완료
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.addBtn}
                onPress={() => {
                  setCompanyInfoModalOpen(false);
                  setTitleValue('');
                  setContentValue('');
                }}
              >
                <Text style={styles.btnText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        </View>

        {companyInfoModalOpen === true ?
          <View style={{height: keyboardOnHeight - 250}}></View>
          :
          null
        }
        <AddInfoList
          addInfoList={addInfoList} 
          setAddInfoList={setAddInfoList}
          setEditModalOpen={setEditModalOpen}
          setSubEditData={setSubEditData}
          setDeleteModalOpen={setDeleteModalOpen}
          setSubDeleteData={setSubDeleteData}
        />
        {addModalOpen === true ?
        <AddModal 
          setAddModalOpen={setAddModalOpen}
          titleValue={titleValue} 
          setTitleValue={setTitleValue}
          contentValue={contentValue}
          setContentValue={setContentValue}
        />
        :
        null
        }
        {addModalOpen === false ?
          <TouchableOpacity 
            style={styles.addContentWrap}
            onPress={() => {
              setAddModalOpen(true);
            }}  
          >
            <Image 
              style={styles.addImage}
              source={addIconPath}
            />
          </TouchableOpacity>
          :
          <View style={styles.addContentWrap}>
            <View style={styles.btnWrap}>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={DetailAddSubmit}
              >
                <Text 
                  style={styles.btnText}
                >
                  완료
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.addBtn}
                onPress={() => {
                  setAddModalOpen(false);
                  setTitleValue('');
                  setContentValue('');
                }}
              >
                <Text style={styles.btnText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        }

        {addModalOpen === true ?
          <View style={{height: keyboardOnHeight}}></View>
          :
          null
        }
      </ScrollView>

      <View style={styles.footerStyle}>
        <TouchableOpacity>
          {/* <Text>gd</Text>    */}
        </TouchableOpacity> 
      </View>
    </SafeAreaView>
  );
};

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
export default DetailsScreen;