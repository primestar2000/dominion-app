import React, { useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Alert 
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { StudyNavigatorParamList } from '@/src/navigations/study-navigation'
import { StudyType } from '@/utils/study-types'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { 
  BookOpen, 
  Calendar, 
  Edit, 
  Trash2, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react-native'


import UpdateStudyModal from '@/src/screens/app/study/update-study-modal'
import deleteStudyThunk from '@/redux/app/delete-study-thunk'
import { ResponceMessageType } from '@/utils/other-types'

const StudyDetailsTab = ({ docData }: { docData: StudyType }) => {
  const { goBack } = useNavigation<NavigationProp<StudyNavigatorParamList>>()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(store => store.auth)
  const [showUpdateStudyModal, setShowUpdateStudyModal] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    bibleTexts: false,
    introduction: false
  })

  const handleDeleteStudy = () => {
    Alert.alert(
      'Confirm Delete', 
      'Are you sure you want to delete this study? All related weeks will also be deleted.',
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

  const toggleSection = (section: 'bibleTexts' | 'introduction') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const renderBibleTexts = () => {
    const textsToShow = expandedSections.bibleTexts 
      ? docData.bible_text 
      : docData.bible_text.slice(0, 2)

    return (
      <View style={styles.sectionContainer}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => toggleSection('bibleTexts')}
        >
          <View style={styles.sectionTitleContainer}>
            <BookOpen color="#2b7cda" size={24} />
            <Text style={styles.sectionTitle}>Bible Texts</Text>
          </View>
          {docData.bible_text.length > 2 && (
            <View style={styles.expandIcon}>
              {expandedSections.bibleTexts ? <ChevronUp color="#2b7cda" /> : <ChevronDown color="#2b7cda" />}
            </View>
          )}
        </TouchableOpacity>

        {textsToShow.map((text, index) => (
          <View key={index} style={styles.bibleTextContainer}>
            <Text style={styles.bibleTextScripture}>{text.scripture}</Text>
            <Text style={styles.bibleTextContent}>{text.content}</Text>
          </View>
        ))}

        {!expandedSections.bibleTexts && docData.bible_text.length > 2 && (
          <Text style={styles.moreIndicator}>
            +{docData.bible_text.length - 2} more Bible texts
          </Text>
        )}
      </View>
    )
  }

  const renderIntroduction = () => {
    const isLongIntro = docData.introduction.length > 200
    const displayIntro = expandedSections.introduction 
      ? docData.introduction 
      : `${docData.introduction.slice(0, 200)}${isLongIntro ? '...' : ''}`

    return (
      <View style={styles.sectionContainer}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => toggleSection('introduction')}
        >
          <View style={styles.sectionTitleContainer}>
            <BookOpen color="#2b7cda" size={24} />
            <Text style={styles.sectionTitle}>Introduction</Text>
          </View>
          {isLongIntro && (
            <View style={styles.expandIcon}>
              {expandedSections.introduction ? <ChevronUp color="#2b7cda" /> : <ChevronDown color="#2b7cda" />}
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.introductionText}>{displayIntro}</Text>
      </View>
    )
  }

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={['#2b7cda', '#4299e1']}
          style={styles.gradientBackground}
        />
        <Text style={styles.studyTitle}>{docData.title}</Text>
        
        <View style={styles.studyMetaContainer}>
          <View style={styles.metaItem}>
            <Calendar color="white" size={20} />
            <Text style={styles.metaText}>{docData.month}</Text>
          </View>
        </View>
      </View>

      {renderBibleTexts()}
      {renderIntroduction()}

      {user?.role === "admin" && (
        <View style={styles.adminActionsContainer}>
          <TouchableOpacity 
            style={styles.adminActionButton}
            onPress={() => setShowUpdateStudyModal(true)}
          >
            <Edit color="#2b7cda" size={20} />
            <Text style={styles.adminActionButtonText}>Edit Study</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.adminActionButton, styles.deleteButton]}
            onPress={handleDeleteStudy}
          >
            <Trash2 color="#e53e3e" size={20} />
            <Text style={[styles.adminActionButtonText, styles.deleteButtonText]}>Delete Study</Text>
          </TouchableOpacity>
        </View>
      )}

      {showUpdateStudyModal && (
        <UpdateStudyModal 
          study={docData} 
          onClose={() => setShowUpdateStudyModal(false)} 
        />
      )}
    </ScrollView>
  )
}

export default StudyDetailsTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fa',
  },
  headerContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  studyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 12,
  },
  studyMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  metaText: {
    color: 'white',
    fontSize: 14,
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
  },
  expandIcon: {
    padding: 8,
  },
  bibleTextContainer: {
    marginBottom: 12,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#2b7cda',
  },
  bibleTextScripture: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2b7cda',
    marginBottom: 4,
  },
  bibleTextContent: {
    fontSize: 15,
    color: '#4a5568',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  moreIndicator: {
    textAlign: 'center',
    color: '#718096',
    marginTop: 8,
  },
  introductionText: {
    fontSize: 15,
    color: '#4a5568',
    lineHeight: 22,
  },
  adminActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 24,
  },
  adminActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 8,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: '#e53e3e',
  },
  adminActionButtonText: {
    color: '#2b7cda',
    fontWeight: '600',
  },
  deleteButtonText: {
    color: '#e53e3e',
  },
})