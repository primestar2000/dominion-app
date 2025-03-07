import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';

type SermonDetailProps = {
        title: string;
        speaker: string;
        date: string;
        duration: string;
        description: string;
        videoThumbnail?: any;
        audioThumbnail?: any;
        videoLink?: string;
        audioLink: string;
        tags: string[];
        views: number;
        isNew?: boolean;
        fileSize?: {
          video?: string;
          audio: string;
        };
};

const SermonDetailScreen = () => {
  const { data } = useLocalSearchParams(); 
      const sermon:SermonDetailProps = JSON.parse(data as string);

  const handlePlay = () => {
    // Logic to play the sermon (video or audio)
    // This could involve navigation to a player screen or opening a media player
    console.log(`Playing ${sermon.videoLink || sermon.audioLink}`);
  };

  useEffect(()=>{
    console.log(sermon)
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image 
          source={sermon.videoThumbnail || sermon.audioThumbnail} 
          style={styles.thumbnail} 
        />
        
        <View style={styles.detailsContainer}>
          <Text style={styles.speaker}>{sermon.speaker}</Text>
          <Text style={styles.date}>{sermon.date}</Text>
          <Text style={styles.duration}>{sermon.duration}</Text>
          <Text style={styles.description}>{sermon.description}</Text>
          
          <View style={styles.tagsContainer}>
            {/* {sermon.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))} */}
          </View>

          <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
            <Ionicons name="play-circle" size={30} color="white" />
            <Text style={styles.playButtonText}>Play Sermon</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    padding: 15,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  speaker: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  duration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    backgroundColor: '#6A0572',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6A0572',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    justifyContent: 'center',
  },
  playButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default SermonDetailScreen;