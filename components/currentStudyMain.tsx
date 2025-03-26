import { StyleSheet, Text, View, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import StudyWeek from './StudyWeek'
import DefaultButton from './DefaultButton'
import DeleteButton from './delete-button'
import EditButton from './edit-button'
import SectionLoader from './section-loader'
import CreateBibleStudyWeekModal from '@/src/screens/app/study/week/createStudyWeekModal'
import { StudyType, WeekTypeRequest } from '@/utils/study-types'
import { StudyNavigatorParamList } from '@/src/navigations/study-navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import CreateStudyWeekThunk from '@/redux/app/create-week-thunk'
import retrieveWeeksThunk from '@/redux/app/retrieve-weeks-thunk'
import deleteStudyThunk from '@/redux/app/delete-study-thunk'
import { ResponceMessageType } from '@/utils/other-types'

const CurrentStudyMain = ({ docData }: { docData: StudyType }) => {
  const { goBack } = useNavigation<NavigationProp<StudyNavigatorParamList>>()
  const [showCreateWeekModal, setShowCreateWeekModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  
  const dispatch = useAppDispatch()
  const allWeeks = useAppSelector(store => store.studies.weeks)
  const { user } = useAppSelector(store => store.auth)
  
  const weeks = allWeeks.filter(item => item.bible_study_id === docData.id)

  const createWeek = async (formdata: WeekTypeRequest) => {
    setIsLoading(true)
    
    dispatch(CreateStudyWeekThunk({ ...formdata, bible_study_id: docData.id }))
      .then((result) => {
        if (result.meta.requestStatus === "rejected") {
          const message = result.payload as ResponceMessageType
          Alert.alert('Error', message.message)
        }
        if (result.meta.requestStatus === "fulfilled") {
          const message = result.payload as ResponceMessageType
          Alert.alert('Success', message.message)
          setShowCreateWeekModal(false)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const fetchWeeks = async () => {
    setIsFetching(true)
    
    dispatch(retrieveWeeksThunk(docData.id))
      .then((result) => {
        if (result.meta.requestStatus === "rejected") {
          const message = result.payload as ResponceMessageType
          Alert.alert('Error', message.message)
        }
      })
      .finally(() => {
        setIsFetching(false)
      })
  }

  const handleDeleteStudy = () => {
    Alert.alert(
      'Confirm Delete', 
      'Are you sure you want to delete? All related weeks will also be deleted.',
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: deleteStudy,
          style: "destructive",
        },
      ],
      { cancelable: true }
    )
  }

  const deleteStudy = () => {
    dispatch(deleteStudyThunk(docData.id))
      .then((result) => {
        if (result.meta.requestStatus === "rejected") {
          const message = result.payload as ResponceMessageType
          Alert.alert('Error', message.message)
        }
        if (result.meta.requestStatus === "fulfilled") {
          Alert.alert('Success', 'Study deleted successfully')
          goBack()
        }
      })
  }

  const handleEditWeek = (weekId: string) => {
    // Implement edit functionality
    Alert.alert('Edit Week', `Edit week with ID: ${weekId}`)
  }

  const handleDeleteWeek = (weekId: string) => {
    // Implement delete functionality
    Alert.alert(
      'Delete Week',
      'Are you sure you want to delete this week?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => console.log('Delete week with ID:', weekId) 
        }
      ]
    )
  }
  
  useEffect(() => {
    if (weeks.length < 1) {
      fetchWeeks()
    }
  }, [docData.id])

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <LinearGradient
          colors={['#f0f7ff', '#ffffff']}
          style={styles.gradientBackground}
        />
        
        <Text style={styles.headerTitle}>{docData.title}</Text>
        
        <View style={styles.scriptureContainer}>
          <Text style={styles.scriptureText}>
            {docData?.bible_text[0]?.scripture || 'No scripture available'}
          </Text>
        </View>
        
        {user?.role === "admin" && (
          <>
            <DefaultButton 
              onPress={() => setShowCreateWeekModal(true)} 
              title={'Add Week'} 
            />
            
            <View style={styles.actionButtonsContainer}>
              <DeleteButton enableOnlyAdmin={true} onPress={handleDeleteStudy} />
              <EditButton enableOnlyAdmin={true} />
            </View>
          </>
        )}
      </View>

      <View style={styles.weeksContainer}>
        <Text style={styles.sectionTitle}>Available Weeks</Text>
        
        {isFetching ? (
          <View style={styles.loaderContainer}>
            <SectionLoader />
            <Text style={styles.loaderText}>Fetching Study Weeks</Text>
          </View>
        ) : (
          <FlatList 
            data={weeks} 
            renderItem={({ item, index }) => (
              <StudyWeek 
                key={item.id}
                data={{ ...item, studyId: docData.id, index }}
                onEdit={handleEditWeek}
                onDelete={handleDeleteWeek}
              />
            )} 
            refreshing={isFetching}
            onRefresh={fetchWeeks}
            contentContainerStyle={styles.weeksList}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No weeks found</Text>
                {user?.role === "admin" && (
                  <DefaultButton 
                    onPress={() => setShowCreateWeekModal(true)} 
                    title={'Create First Week'} 
                  />
                )}
              </View>
            }
          />
        )}
      </View>

      {showCreateWeekModal && (
        <CreateBibleStudyWeekModal 
          isSubmitting={isLoading} 
          onCreateWeeks={createWeek} 
          onCloseModal={() => setShowCreateWeekModal(false)} 
        />
      )}
    </View>
  )
}

export default CurrentStudyMain

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f7fa',
  },
  headerCard: {
    padding: 20,
    width: '100%',
    borderRadius: 16,
    marginBottom: 20,
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
  headerTitle: {
    fontSize: 22,
    color: '#2b7cda',
    marginBottom: 10,
    fontWeight: '700',
  },
  scriptureContainer: {
    paddingVertical: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: 'rgba(43, 124, 218, 0.3)',
    paddingLeft: 12,
  },
  scriptureText: {
    fontSize: 15,
    color: '#4a5568',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    marginTop: 16,
  },
  weeksContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2d3748',
  },
  weeksList: {
    gap: 12,
    paddingBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loaderText: {
    color: '#718096',
    fontSize: 14,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    marginTop: 12,
  },
  emptyText: {
    color: '#718096',
    fontSize: 16,
    marginBottom: 16,
  },
})