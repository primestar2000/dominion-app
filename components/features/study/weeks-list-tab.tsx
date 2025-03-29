import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  Alert, 
  FlatList 
} from 'react-native'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { StudyType, WeekType, WeekTypeRequest } from '@/utils/study-types'


import CreateBibleStudyWeekModal from '@/src/screens/app/study/week/createStudyWeekModal'
import UpdateWeekModal from '@/src/screens/app/study/week/update-week-modal'
import { supabase } from '@/utils/lib/superbase'
import { databaseTables } from '@/constants/db-tables'
import { deleteAndUpdateWeekState } from '@/redux/app/study-slice'
import CreateStudyWeekThunk from '@/redux/app/create-week-thunk'
import retrieveWeeksThunk from '@/redux/app/retrieve-weeks-thunk'
import { ResponceMessageType } from '@/utils/other-types'
import DefaultButton from '@/components/DefaultButton'
import StudyWeek from '@/components/StudyWeek'
import SectionLoader from '@/components/section-loader'
import FloatableButton from '@/components/FloatableButton'
import { PlusIcon } from 'lucide-react-native'

const StudyWeeksTab = ({ docData }: { docData: StudyType }) => {
  const [showCreateWeekModal, setShowCreateWeekModal] = useState(false)
  const [showUpdateWeekModal, setShowUpdateWeekModal] = useState(false)
  const [weekToBeUpdated, setWeekTobeUpdated] = useState<WeekType | undefined>()
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

  const handleEditWeek = (weekId: string) => {
    const weekToBeEdit = weeks.find(item => item.id === weekId);
    setWeekTobeUpdated(weekToBeEdit)
    if (weekToBeEdit) {
      setShowUpdateWeekModal(true);
    }
  }

  const deleteWeek = async (weekId: string) => {
    try {
      const {data, error} = await supabase.from(databaseTables.bibleStudyWeeks).delete().eq('id', weekId);
      if (error) {
        Alert.alert(error.message);
      }
      else {
        dispatch(deleteAndUpdateWeekState(weekId));
        Alert.alert('Deleted successfully');
      }
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  }

  const handleDeleteWeek = (weekId: string) => {
    Alert.alert(
      'Delete Week',
      'Are you sure you want to delete this week?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteWeek(weekId),
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
      {user?.role === "admin" && (
        <View style={styles.addWeekButtonContainer}>
          {/* <DefaultButton 
            onPress={() => setShowCreateWeekModal(true)} 
            title={'Add Week'} 
          /> */}
        </View>
      )}

      <View style={styles.weeksContainer}>
        {/* <Text style={styles.sectionTitle}>Available Weeks</Text> */}
        
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
      
      {(showUpdateWeekModal && weekToBeUpdated) && (
        <UpdateWeekModal 
          studyWeek={weekToBeUpdated}
          onCloseModal={() => setShowUpdateWeekModal(false)} 
        />
      )}
      <FloatableButton icon={<PlusIcon  color={'blue'} />} onPress={() => setShowCreateWeekModal(true)}  />
    </View>
  )
}

export default StudyWeeksTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addWeekButtonContainer: {
    marginBottom: 16,
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