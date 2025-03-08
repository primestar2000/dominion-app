import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { WeekType } from '@/utils/study-types';
interface studyWeekType extends WeekType  {
    studyId: string;
    index: number;
}
const StudyWeek = ({data}:{data:studyWeekType}) => {
  return (
    <View style={styles.frame}>
      <Text style={styles.title}>{data.title}</Text>
        <View style={styles.innerCont}>
            <View style={styles.mainContentSection}>
                <Text >{data.task}</Text>
                <Text style={{color: "#2b7cda", fontWeight: '600'}}>{data.main_points.length + ' points'}</Text>
            </View>
            <Link href={{pathname: "/(tabs)/(study)/(week)/[week]", params: {week: data.id, studyId: data.studyId, index: data.index}}} asChild>
            <Pressable style={styles.startButton}>
                <Text style={styles.startText}>Start</Text>
                <MaterialIcons name='chevron-right' size={24} color={"#2b7cda"} />
            </Pressable>
            </Link>
        </View>

    </View>
  )
}

export default StudyWeek

const styles = StyleSheet.create({
    frame: {
        width: "100%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 20
    },
    title: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 10
    },
    innerCont: {
        flexDirection: "row"
    },
    mainContentSection: {
        flex: 1,
        gap: 10
    },
    startText: {
        color: "#2b7cda",
        fontSize: 16,
        fontWeight: "600"
    },
    startButton: {
        alignSelf: "flex-end",
        flexDirection: "row"
    }
})