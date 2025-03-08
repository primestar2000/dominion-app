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

// Types for our data
// interface SubPoint {
//   title?: string;
//   text?: string;
//   sub_points?: string[];
// }

// interface MainPoint {
//   title: string;
//   text?: string;
//   points?: SubPoint[];
// }

// interface Week {
//   title: string;
//   task?: string;
//   main_points: MainPoint[];
// }

// interface Scripture {
//   scripture: string;
//   content: string;
// }

// interface Study {
//   title: string;
//   text: Scripture[];
//   introduction: string;
//   weeks: Week[];
// }

// // Sample data
// const studyData: Study = {
//   title: "Faith in Action: The Book of James",
//   text: [
//     {
//       scripture: "James 1:2-4",
//       content: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete, not lacking anything."
//     },
//     {
//       scripture: "James 1:22",
//       content: "Do not merely listen to the word, and so deceive yourselves. Do what it says."
//     }
//   ],
//   introduction: "James, a servant of God and of the Lord Jesus Christ, writes to the twelve tribes scattered among the nations. This practical book focuses on living out our faith through actions and addresses how authentic faith behaves in daily life.",
//   weeks: [
//     {
//       title: "Week 1: Faith and Trials",
//       task: "Read James chapter 1 and reflect on how trials shape our faith.",
//       main_points: [
//         {
//           title: "Finding Joy in Trials",
//           text: "James calls us to consider trials as opportunities for joy and growth.",
//           points: [
//             {
//               title: "The Purpose of Trials",
//               text: "Trials test our faith and develop perseverance.",
//               sub_points: [
//                 "Trials reveal what we truly believe",
//                 "Trials strengthen our character",
//                 "Trials prepare us for greater service"
//               ]
//             },
//             {
//               title: "The Outcome of Perseverance",
//               text: "Maturity and completeness come through enduring challenges.",
//               sub_points: [
//                 "Spiritual maturity",
//                 "Emotional stability",
//                 "Deeper relationship with God"
//               ]
//             }
//           ]
//         },
//         {
//           title: "Wisdom for the Journey",
//           text: "God generously gives wisdom to those who ask in faith.",
//           points: [
//             {
//               title: "How to Ask for Wisdom",
//               text: "Ask with confidence and without doubting.",
//               sub_points: [
//                 "Believe that God wants to give wisdom",
//                 "Trust God's timing and methods",
//                 "Apply the wisdom you receive"
//               ]
//             }
//           ]
//         },
//         {
//           title: "Being Doers of the Word",
//           text: "James emphasizes the importance of not just hearing but doing.",
//           points: [
//             {
//               title: "The Danger of Self-Deception",
//               text: "Merely listening without acting is spiritual self-deception.",
//               sub_points: [
//                 "Knowledge without application is fruitless",
//                 "True blessing comes through action",
//                 "Our actions demonstrate what we truly believe"
//               ]
//             }
//           ]
//         }
//       ]
//     },
//     {
//       title: "Week 2: Faith and Partiality",
//       task: "Read James chapter 2 and examine how favoritism contradicts the gospel.",
//       main_points: [
//         {
//           title: "Favoritism Forbidden",
//           text: "Showing partiality contradicts faith in Christ."
//         },
//         {
//           title: "The Royal Law of Love",
//           text: "Loving your neighbor fulfills God's law."
//         }
//       ]
//     }
//   ]
// };

const WeekDetailScreen = () => {
  const { week, studyId, index } = useLocalSearchParams();
  const router = useRouter();
  const weekIndex = Number(index) || 0;
  const currentStudy = studyData2.find(item => item.id === studyId) as StudyType;
  const weekData = currentStudy.weeks[weekIndex];
  
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
    if (newIndex >= 0 && newIndex < currentStudy.weeks.length) {
      router.push({
        pathname: `/(tabs)/(study)/(week)/[week]`,
        params: {week: week, studyId: studyId, index: newIndex}
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack  screenOptions={{title: 'hi', headerStyle: {
        backgroundColor: "white"
      }}} />
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentStudy.title}</Text>
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
          {currentStudy.text.map((item, index) => (
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
            style={[styles.navButton, weekIndex === currentStudy.weeks.length - 1 && styles.disabledNavButton]}
            onPress={() => navigateToWeek(1)}
            disabled={weekIndex === currentStudy.weeks.length - 1}
          >
            <Text style={[styles.navButtonText, weekIndex === currentStudy.weeks.length - 1 && styles.disabledNavButtonText]}>Next Week</Text>
            <Ionicons name="arrow-forward" size={16} color={weekIndex === currentStudy.weeks.length - 1 ? "#CCC" : "#3D5AF1"} />
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