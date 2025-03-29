import React, { useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { StudyNavigatorParamList } from '@/src/navigations/study-navigation'
import { StudyType } from '@/utils/study-types'
import { useAppSelector } from '@/redux/hooks'
import StudyDetailsTab from './features/study/study-detail-tab'
import StudyWeeksTab from './features/study/weeks-list-tab'
import { Ionicons } from '@expo/vector-icons'
import { truncateText } from '@/utils/helper-functions'



const CurrentStudyMain = ({ docData }: { docData: StudyType }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'weeks'>('details')
  const { user } = useAppSelector(store => store.auth)
  const {navigate, goBack} = useNavigation<NavigationProp<StudyNavigatorParamList>>();

  const renderTab = () => {
    switch(activeTab) {
      case 'details':
        return <StudyDetailsTab docData={docData} />
      case 'weeks':
        return <StudyWeeksTab docData={docData} />
      default:
        return null
    }
  }

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{truncateText(activeTab === 'details' ? 'Study Details' : 'Study Weeks', 20)}</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'details' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('details')}
        >
          <Text style={[
            styles.tabButtonText, 
            activeTab === 'details' && styles.activeTabButtonText
          ]}>
            Study Details
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'weeks' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('weeks')}
        >
          <Text style={[
            styles.tabButtonText, 
            activeTab === 'weeks' && styles.activeTabButtonText
          ]}>
            Study Weeks
          </Text>
        </TouchableOpacity>
      </View>

      {/* Active Tab Content */}
      <View style={styles.tabContent}>
        {renderTab()}
      </View>
    </View>
  )
}

export default CurrentStudyMain

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: "white",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#2b7cda',
  },
  tabButtonText: {
    color: '#718096',
    fontWeight: '600',
  },
  activeTabButtonText: {
    color: 'white',
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
})