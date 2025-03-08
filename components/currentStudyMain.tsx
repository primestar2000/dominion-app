import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import StudyWeek from './StudyWeek'
import DefaultButton from './DefaultButton'
import { StudyType } from '@/utils/study-types'
import { useRouter } from 'expo-router'

const CurrentStudyMain = ({docData}:{docData:StudyType}) => {
    const router = useRouter();
  return (
    <View style={styles.frame}>
        <View style={styles.headSection}>
            <Text style={styles.headTitle}>{docData.title}</Text>
            <Text style={styles.headText}>{docData?.text[0]?.scripture}</Text>
            {/* <DefaultButton onPress={()=>{navigation.navigate('CreateWeek', {docData})}} title={'Add Week'} /> */}
            <DefaultButton onPress={()=>{router.push({pathname: "/(tabs)/(study)/(week)/create"})}} title={'Add Week'} />
        </View>
        <Text style={styles.avaliableText}>Available Weeks</Text>
        <View style={styles.weeksSection}>
            {
                docData.weeks.map((data, index)=>(
                    <StudyWeek key={index} data={{...data, studyId: docData.id, index}}  />
                ))
            }
        </View>
    </View>
  )
}

export default CurrentStudyMain

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        padding: 10
    },
    headSection: {
        padding: 20,
        width: "100%",
        backgroundColor: "white",
        borderRadius: 20
    }, 
    headTitle:{
        fontSize: 20,
        color: "#2b7cda",
        marginVertical: 5,
        fontWeight: "700"
    },
    headText: {
        fontSize: 14,
        marginVertical: 10
    },
    avaliableText:{
        fontSize: 16,
        marginVertical: 10,
        fontWeight: "600"
    },
    weeksSection: {
        width: "100%",
        gap: 10,
    },
})