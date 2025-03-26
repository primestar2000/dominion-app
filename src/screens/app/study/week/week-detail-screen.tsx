// app/(tabs)/(bible-study)/[week].tsx
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  StatusBar,
  FlatList
} from 'react-native';
import { useLocalSearchParams, useRouter, Link, Stack } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { studyData2 } from '@/utils/data';
import { MainPoint, StudyType, SubPoint } from '@/utils/study-types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StudyNavigatorParamList } from '@/src/navigations/study-navigation';
import { useAppSelector } from '@/redux/hooks';
import StudyWeek from '@/components/StudyWeek';


const WeekDetailScreen = ({route}:{route: any}) => {
  const { week, studyId, index } = route.params;
  // const router = useRouter();
  const {navigate, goBack} = useNavigation<NavigationProp<StudyNavigatorParamList>>();
  const allWeeks = useAppSelector(store => store.studies.weeks)
  const weekIndex = Number(index) || 0;
  const StudyWeeks = allWeeks.filter(item => item.bible_study_id === studyId);
  const weekData = StudyWeeks[weekIndex];
  
  // Expandable sections state
  const [expandedPoints, setExpandedPoints] = useState<{[key: number]: boolean}>({});
  const [expandedSubPoints, setExpandedSubPoints] = useState<{[key: string]: boolean}>({});
  
  useEffect(()=>{
    console.log(weekIndex)
  })
  // Toggle main point expansion
  const toggleMainPoint = (index: number) => {
    setExpandedPoints(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  // Toggle sub point expansion
  const toggleSubPoint = (mainIndex: number, subIndex: number) => {
    const key = `${mainIndex}-${subIndex}`;
    setExpandedSubPoints(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Render main point item
  const renderMainPoint = (point: MainPoint, index: number) => {
    const isExpanded = expandedPoints[index] || false;
    
    return (
      <View style={styles.mainPointContainer} key={index}>
        <TouchableOpacity 
          style={styles.mainPointHeader} 
          onPress={() => toggleMainPoint(index)}
        >
          <Text style={styles.mainPointTitle}>{point.title}</Text>
          <Ionicons 
            name={isExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#3D5AF1" 
          />
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.mainPointContent}>
            {point.text && <Text style={styles.mainPointText}>{point.text}</Text>}
            
            {point.points && point.points.map((subPoint, subIndex) => 
              renderSubPoint(subPoint, index, subIndex)
            )}
          </View>
        )}
      </View>
    );
  };
  
  // Render sub point item
  const renderSubPoint = (subPoint: SubPoint, mainIndex: number, subIndex: number) => {
    const key = `${mainIndex}-${subIndex}`;
    const isExpanded = expandedSubPoints[key] || false;
    
    return (
      <View style={styles.subPointContainer} key={key}>
        <TouchableOpacity 
          style={styles.subPointHeader} 
          onPress={() => toggleSubPoint(mainIndex, subIndex)}
        >
          <Text style={styles.subPointTitle}>{subPoint.title}</Text>
          {subPoint.sub_points && subPoint.sub_points.length > 0 && (
            <Ionicons 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={16} 
              color="#666" 
            />
          )}
        </TouchableOpacity>
        
        {subPoint.text && <Text style={styles.subPointText}>{subPoint.text}</Text>}
        
        {isExpanded && subPoint.sub_points && (
          <View style={styles.subPointsList}>
            {subPoint.sub_points.map((point, i) => (
              <View style={styles.subPointItem} key={i}>
                <View style={styles.bulletPoint} />
                <Text style={styles.subPointItemText}>{point}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  // Function to navigate to next or previous week
  const navigateToWeek = (offset: number) => {
    const newIndex = weekIndex + offset;
    if (newIndex >= 0 && newIndex < StudyWeeks.length) {
      navigate('studyWeekDetailScreen', {week: week, studyId: studyId, index: newIndex})
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{weekData.title}</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Week Title */}
        <View style={styles.weekTitleContainer}>
          <Text style={styles.weekTitle}>{weekData.title}</Text>
        </View>
        
        {/* Week Task */}
        {weekData.task && (
          <View style={styles.taskContainer}>
            <Text style={styles.taskLabel}>This Week's Task:</Text>
            <Text style={styles.taskText}>{weekData.task}</Text>
          </View>
        )}
        
        {/* Key Scriptures */}
        <View style={styles.scriptureContainer}>
          <Text style={styles.sectionTitle}>Key Scriptures</Text>
          {weekData.scriptures.map((item, index) => (
            <View style={styles.scriptureCard} key={index}>
              <Text style={styles.scripture}>{item.scripture}</Text>
              <Text style={styles.scriptureContent}>"{item.content}"</Text>
            </View>
          ))}
        </View>
        
        {/* Main Points */}
        <View style={styles.mainPointsContainer}>
          <Text style={styles.sectionTitle}>Main Points</Text>
          {weekData.main_points.map((point, index) => 
            renderMainPoint(point, index)
          )}
        </View>
        
        {/* Week Navigation */}
        <View style={styles.weekNavigation}>
          <TouchableOpacity 
            style={[styles.navButton, weekIndex === 0 && styles.disabledNavButton]}
            onPress={() => navigateToWeek(-1)}
            disabled={weekIndex === 0}
          >
            <Ionicons name="arrow-back" size={16} color={weekIndex === 0 ? "#CCC" : "#3D5AF1"} />
            <Text style={[styles.navButtonText, weekIndex === 0 && styles.disabledNavButtonText]}>Previous Week</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navButton, weekIndex === StudyWeeks.length - 1 && styles.disabledNavButton]}
            onPress={() => navigateToWeek(1)}
            disabled={weekIndex === StudyWeeks.length - 1}
          >
            <Text style={[styles.navButtonText, weekIndex === StudyWeeks.length - 1 && styles.disabledNavButtonText]}>Next Week</Text>
            <Ionicons name="arrow-forward" size={16} color={weekIndex === StudyWeeks.length - 1 ? "#CCC" : "#3D5AF1"} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  weekTitleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  weekTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  taskContainer: {
    backgroundColor: '#EEF2FF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  taskLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3D5AF1',
    marginBottom: 8,
  },
  taskText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  scriptureContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  scriptureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  scripture: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3D5AF1',
    marginBottom: 8,
  },
  scriptureContent: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  mainPointsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  mainPointContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  mainPointHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0,
  },
  mainPointTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  mainPointContent: {
    padding: 16,
    paddingTop: 0,
  },
  mainPointText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 16,
  },
  subPointContainer: {
    marginBottom: 12,
    backgroundColor: '#F5F7FF',
    borderRadius: 8,
    padding: 12,
  },
  subPointHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subPointTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  subPointText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 8,
  },
  subPointsList: {
    marginTop: 8,
  },
  subPointItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3D5AF1',
    marginTop: 7,
    marginRight: 8,
  },
  subPointItemText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    flex: 1,
  },
  weekNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F7FF',
    borderRadius: 8,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3D5AF1',
    marginHorizontal: 8,
  },
  disabledNavButton: {
    backgroundColor: '#F1F1F1',
  },
  disabledNavButtonText: {
    color: '#CCC',
  },
});

export default  WeekDetailScreen;