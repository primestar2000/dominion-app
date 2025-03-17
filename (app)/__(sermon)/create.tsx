import { Button, GestureResponderEvent, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/constants/Colors';
import SubmitButton from '@/components/submit-button';
// import { app } from '../../../firebaseConfig';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CreateVideo = ({onClose}:{onClose:((event: GestureResponderEvent) => void) | undefined}) => {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  
  // const pickFile = async (fileType) => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: fileType == "Images" ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos ,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     if (fileType == "Images") {
        
  //       setImage(result.assets[0].uri);
  //     }else{
  //       setVideo(result.assets[0].uri);

  //     }
  //   }
  // };


  const handleUpload = () => {
    // const storage = getStorage(app);
    // const videoRef = ref(storage, "videoMessages/testVideo.mp4");



  }


  return (
    <View style={styles.frame}>
      <View style={styles.topLayout}>
        <Text style={styles.pageTitle}>Upload Video</Text>
        <TouchableOpacity onPress={onClose}>
          <Entypo name="cross" size={28} color="#565656" />
        </TouchableOpacity>
      </View>

    <ImageBackground source={/*{uri: video ? video : null}*/{}} style={styles.thumbnail}>
      <TouchableOpacity onPress={()=>{/*pickFile("Videos")*/}} style={styles.uploadFrame}>
        <View style={{alignItems: "center", padding: 5, borderRadius: 10}}>
          <FontAwesome name="play-circle" size={35} color="#828181" />
          <Text style={styles.uploadTitleText}>Tap To Upload A Video File</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
    <ImageBackground source={{/*uri: image ? image : null*/}} style={styles.thumbnail}>
      <TouchableOpacity onPress={()=>{/*pickFile("Images")*/}} style={styles.uploadFrame}>
        <View style={{alignItems: "center", padding: 5, borderRadius: 10}}>
          <FontAwesome name="camera" size={30} color="#828181" />
          <Text style={styles.uploadTitleText}>Tap To Upload A Video Thumbnail</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
      <TextInput style={styles.inputField} placeholder='Video Title' />
      <TextInput style={[styles.inputField]} placeholder='Description' />
      {/* <TouchableOpacity onPress={handleUpload} style={styles.submitBtn}>
        <Text style={styles.submitBtnText}>Upload</Text>
      </TouchableOpacity> */}
      <SubmitButton onPress={()=>{}} loading={false} ></SubmitButton>
    </View>
  )
}

export default CreateVideo

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    
  },
  frame: {
    padding: 20,
    flex: 1,
    alignItems: "center"
  },
  topLayout:{
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20
  },
  uploadFrame: {
    width: "100%",
    height: "100%",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d8d8d8",
    alignItems: "center",
    marginBottom: 20
  },
  uploadTitleText: {
    width: 100,
    textAlign: "center",
    lineHeight: 20,
    color: "#5e5e5e",
    margin: 10,
    fontWeight: "900"
  },
  inputField: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d8d8d8",
    marginBottom: 20
  },
  submitBtn: {
    position: "absolute",
    width: "100%",
    margin: "auto",
    bottom: 10,
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'skyblue',
  },
  submitBtnText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold"
  },
  thumbnail: {
    width: "100%",
    height: 120,
    borderRadius: 20,
    marginBottom: 20,
  }
})