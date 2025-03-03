import { StyleSheet, Text, View } from 'react-native'
import React, { Suspense } from 'react'
import { ActivityIndicator } from 'react-native';
import { studyData } from '@/utils/data';
import CurrentStudyMain from '@/components/currentStudyMain';
import { useLocalSearchParams } from 'expo-router';



const CurrentStudy = () => {
    const { study } = useLocalSearchParams(); 
    const studyData = JSON.parse(study as string);
  return (
    <View style={styles.frame}>
      {/* <Text>{}</Text> */}
      <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
        {/* <CurrentStudyMain navigation={navigation} docData={docData} /> */}
        <CurrentStudyMain  docData={studyData} />
      </Suspense>
    </View>
  )
}

export default CurrentStudy

const styles = StyleSheet.create({
    frame:{
        flex: 1
    }
})