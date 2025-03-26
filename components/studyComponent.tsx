// import { StyleSheet, Text, View, Pressable } from 'react-native';
// import React, { useEffect } from 'react';
// import Entypo from '@expo/vector-icons/Entypo';
// import { studyDataProp } from '@/utils/data';
// import { TouchableOpacity } from 'react-native';
// import { Link } from 'expo-router';
// import { StudyType } from '@/utils/study-types';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { StudyNavigatorParamList } from '@/src/navigations/study-navigation';

// const StudyComponent = ({ data }: { data: StudyType }) => {
//     const {navigate} = useNavigation<NavigationProp<StudyNavigatorParamList>>();
//   return (
//     // <Link href={{
//     //     pathname: '/(tabs)/(study)/[study]',
//     //     params: {study: data.id}
//     // }} asChild>
//     <TouchableOpacity onPress={()=>{navigate("currentStudy", {study: data.id})}} style={styles.frame}>
//       <Text style={styles.title}>{data.title}</Text>
//       <Text style={styles.content}>{data.bible_text[0].scripture}</Text>
//       <View style={styles.bottomCont}>
//         <View style={styles.bottomLeftCont}>
//           <Entypo name='calendar' color={'#007BFF'} size={20} />
//           <Text style={styles.timeTitle}>{data.month}</Text>
//         </View>
//         <Pressable 
//           onPress={() => {}} 
//           style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
//         >
//           <Text style={styles.buttonLabel}>Start Study</Text>
//         </Pressable>
//       </View>
//     </TouchableOpacity>
//     // </Link>
//   );
// };

// export default StudyComponent;

// const styles = StyleSheet.create({
//   frame: {
//     width: '100%',
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 5,
//     marginVertical: 8,
//   },
//   title: {
//     fontWeight: '700',
//     fontSize: 15,
//     marginBottom: 6,
//     color: '#333',
//     textTransform: 'uppercase',
//   },
//   content: {
//     fontSize: 12,
//     color: '#555',
//     marginVertical: 4,
//     lineHeight: 22,
//   },
//   timeTitle: {
//     fontWeight: '600',
//     color: '#007BFF',
//     fontSize: 14,
//   },
//   button: {
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     backgroundColor: '#007BFF',
//     borderRadius: 24,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#007BFF',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   buttonPressed: {
//     backgroundColor: '#0056b3',
//   },
//   buttonLabel: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   bottomCont: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 12,
//   },
//   bottomLeftCont: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },
// });


import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StudyType } from '@/utils/study-types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StudyNavigatorParamList } from '@/src/navigations/study-navigation';

// Define the Scripture type that was referenced in StudyType
interface Scripture {
  verse: string;
  text: string;
}


interface StudyItemProps {
  study: StudyType;
  onPress?: (study: StudyType) => void;
}
const StudyComponent = ({ study, onPress }: StudyItemProps) => {
  const {navigate} = useNavigation<NavigationProp<StudyNavigatorParamList>>();
  
  // Get the first verse for display
  const primaryVerse = study.bible_text && study.bible_text.length > 0 
    ? study.bible_text[0].scripture 
    : 'No verse available';
  
  // Count the total number of verses
  const verseCount = study.bible_text ? study.bible_text.length : 0;
  
  // Format the introduction for preview (limit to 80 characters)
  const introPreview = study.introduction.length > 80 
    ? `${study.introduction.substring(0, 80)}...` 
    : study.introduction;
  

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={()=>{navigate("currentStudy", {study: study.id})}}
      activeOpacity={0.7}
    >
      <View style={styles.studyItem}>
        {/* Left: Month badge */}
        <View style={styles.monthBadge}>
          <Text style={styles.monthText}>{study.month.substring(0, 3)}</Text>
        </View>
        
        {/* Middle: Study content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={1}>{study.title}</Text>
          <Text style={styles.verseReference} numberOfLines={1}>{primaryVerse}</Text>
          <Text style={styles.introText} numberOfLines={2}>{introPreview}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="book-outline" size={14} color="#777" />
              <Text style={styles.statText}>{verseCount} verse{verseCount !== 1 ? 's' : ''}</Text>
            </View>
          </View>
        </View>
        
        {/* Right: Chevron */}
        <View style={styles.chevronContainer}>
          <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

// // A component to display a list of studies with a section header
// export const StudySection = ({ title, studies, onStudyPress }: { 
//   title: string; 
//   studies: StudyType[];
//   onStudyPress?: (study: StudyType) => void;
// }) => {
//   return (
//     <View style={styles.section}>
//       <Text style={styles.sectionTitle}>{title}</Text>
//       {studies.map((study) => (
//         <StudyComponent 
//           key={study.id} 
//           study={study} 
//           onPress={onStudyPress} 
//         />
//       ))}
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  studyItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  monthBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  monthText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3D5AF1',
    textTransform: 'uppercase',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  verseReference: {
    fontSize: 14,
    color: '#3D5AF1',
    fontWeight: '600',
    marginBottom: 6,
  },
  introText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: '#777',
    marginLeft: 4,
  },
  chevronContainer: {
    marginLeft: 8,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
});

export default StudyComponent 