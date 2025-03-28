import { StyleSheet, Text, View, Pressable, Alert, Modal } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { WeekType } from '@/utils/study-types'
import { StudyNavigatorParamList } from '@/src/navigations/study-navigation'
import { useAppSelector } from '@/redux/hooks'
import UpdateWeekModal from '../src/screens/app/study/week/update-week-modal'

interface StudyWeekType extends WeekType {
  studyId: string
  index: number
}

interface Props {
  data: StudyWeekType
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

const StudyWeek = ({ data, onEdit, onDelete }: Props) => {
  const { navigate } = useNavigation<NavigationProp<StudyNavigatorParamList>>()
  const [modalisOpen, setModalIsOpen] = useState(false)
  const {user} = useAppSelector( store => store.auth)


  const handleEdit = () => {
    if (onEdit) onEdit(data.id)
    // setModalIsOpen(true);
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Week",
      `Are you sure you want to delete "${data.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          onPress: () => onDelete && onDelete(data.id),
          style: "destructive" 
        }
      ]
    )
  }

  const handleStart = () => {
    navigate('studyWeekDetailScreen', {
      week: data.id,
      studyId: data.studyId,
      index: data.index
    })
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f7f9fc', '#ffffff']}
        style={styles.gradientBackground}
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>{data.title}</Text>
        {
            user?.role === "admin" &&
        <View style={styles.actionButtons}>
          <Pressable 
            onPress={handleEdit}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.iconButtonPressed
            ]}
          >
            <MaterialIcons name="edit" size={20} color="#5c6bc0" />
          </Pressable>
          
          <Pressable 
            onPress={handleDelete}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.iconButtonPressed
            ]}
          >
            <MaterialIcons name="delete-outline" size={20} color="#ef5350" />
          </Pressable>
        </View>
        }
      </View>

      <View style={styles.divider} />
      
      <View style={styles.content}>
        <View style={styles.mainContentSection}>
          <Text style={styles.taskText}>{data.task}</Text>
          <View style={styles.pointsContainer}>
            <MaterialCommunityIcons name="lightbulb-outline" size={16} color="#2b7cda" />
            <Text style={styles.pointsText}>
              {data.main_points.length} learning points
            </Text>
          </View>
        </View>

        <Pressable 
          onPress={handleStart}
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.startButtonPressed
          ]}
        >
          <Text style={styles.startText}>Start</Text>
          <MaterialIcons name="chevron-right" size={20} color="#ffffff" />
        </Pressable>
      </View>
      {/* {
        modalisOpen &&
        <UpdateWeekModal studyWeek={data}  onCloseModal={()=>{setModalIsOpen(false)}}  />
      } */}
    </View>
  )
}

export default StudyWeek

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2e3a59',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(230, 236, 245, 0.7)',
  },
  iconButtonPressed: {
    backgroundColor: 'rgba(210, 216, 225, 0.9)',
  },
  divider: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'rgba(43, 124, 218, 0.1)',
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  mainContentSection: {
    flex: 1,
    marginRight: 8,
  },
  taskText: {
    fontSize: 14,
    color: '#4f566b',
    marginBottom: 8,
    lineHeight: 20,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    marginLeft: 6,
    color: '#2b7cda',
    fontWeight: '600',
    fontSize: 13,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2b7cda',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'center',
  },
  startButtonPressed: {
    backgroundColor: '#1e5ea6',
  },
  startText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
})