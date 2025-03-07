import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Animated
} from 'react-native';
import { Link, useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

// Get the screen dimensions
const { width } = Dimensions.get('window');

// Audio item type definition
interface AudioItem {
  id: string;
  title: string;
  speaker?: string;
  coverArt: string;
  duration: string;
  date: string;
  category: string;
  plays: number;
  description?: string;
}

export default function AudioPlayerScreen() {
  const params = useLocalSearchParams();
  const { id } = params;
  
  // State variables
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0.3); // 0 to 1
  const [currentTime, setCurrentTime] = useState('12:21');
  const [isFavorite, setIsFavorite] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  
  // Sample data for the selected audio
  const audioItem: AudioItem = {
    id: '1',
    title: 'The Power of Prayer',
    speaker: 'Pastor Michael Johnson',
    coverArt: 'https://th.bing.com/th/id/OIP.sxir1viop5kxykFa3D8yIAHaEK?rs=1&pid=ImgDetMain',
    duration: '36:45',
    date: 'Mar 5, 2025',
    category: 'sermons',
    plays: 1568,
    description: 'In this powerful message, Pastor Michael explores the transformative impact of prayer in our daily lives. Learn how to develop a consistent prayer life and experience the presence of God in new ways. This sermon includes practical steps for making prayer a cornerstone of your spiritual journey.',
  };
  
  // Simulated progress update
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 0.01;
          if (newProgress >= 1) {
            clearInterval(interval);
            setIsPlaying(false);
            return 1;
          }
          
          // Update current time based on progress
          const totalSeconds = timeStringToSeconds(audioItem.duration);
          const currentSeconds = Math.floor(totalSeconds * newProgress);
          setCurrentTime(formatTime(currentSeconds));
          
          return newProgress;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  // Convert time string (MM:SS) to seconds
  const timeStringToSeconds = (timeString: string) => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
  };
  
  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  // Toggle play/pause
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Skip backward 15 seconds
  const skipBackward = () => {
    setProgress(prev => Math.max(0, prev - 0.05));
  };
  
  // Skip forward 15 seconds
  const skipForward = () => {
    setProgress(prev => Math.min(1, prev + 0.05));
  };
  
  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  // Cycle through playback speeds
  const cyclePlaybackSpeed = () => {
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };
  
  // Related content
  const relatedContent = [
    {
      id: '6',
      title: 'Faith In Action',
      speaker: 'Pastor Michael Johnson',
      coverArt: 'https://via.placeholder.com/300x300',
      duration: '41:08',
    },
    {
      id: '7',
      title: 'Bible Study: Psalms of Comfort',
      speaker: 'Elder James Wilson',
      coverArt: 'https://via.placeholder.com/300x300',
      duration: '32:50',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen 
        options={{
          headerTitle: "",
          headerShown: true,
          headerShadowVisible: false,
        //   headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#F9F9F9',
          }
        }}
      />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cover Art */}
        <View style={styles.coverArtContainer}>
          <Image 
            source={audioItem.coverArt ? { uri: audioItem.coverArt }: require("assets/images/headphone.png")} 
            style={styles.coverArt}
            resizeMode="cover"
          />
        </View>
        
        {/* Audio Info */}
        <View style={styles.audioInfo}>
          <Text style={styles.audioTitle}>{audioItem.title}</Text>
          <Text style={styles.audioSpeaker}>{audioItem.speaker}</Text>
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color="#666" />
              <Text style={styles.metaText}>{audioItem.date}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="headset-outline" size={14} color="#666" />
              <Text style={styles.metaText}>{audioItem.plays} plays</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="pricetag-outline" size={14} color="#666" />
              <Text style={styles.metaText}>{audioItem.category}</Text>
            </View>
          </View>
        </View>
        
        {/* Player Controls */}
        <View style={styles.playerControls}>
          {/* Slider */}
          <View style={styles.progressContainer}>
            <Slider
              style={styles.progressBar}
              minimumValue={0}
              maximumValue={1}
              value={progress}
              minimumTrackTintColor="#3D5AF1"
              maximumTrackTintColor="#EFEFEF"
              thumbTintColor="#3D5AF1"
              onValueChange={setProgress}
            />
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{currentTime}</Text>
              <Text style={styles.timeText}>{audioItem.duration}</Text>
            </View>
          </View>
          
          {/* Main Controls */}
          <View style={styles.mainControls}>
            <TouchableOpacity onPress={skipBackward} style={styles.controlButton}>
              <Ionicons name="play-back" size={24} color="#333" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={togglePlayback} style={styles.playPauseButton}>
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={32} 
                color="white" 
              />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={skipForward} style={styles.controlButton}>
              <Ionicons name="play-forward" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          {/* Extra Controls */}
          <View style={styles.extraControls}>
            <TouchableOpacity style={styles.extraControlButton} onPress={toggleFavorite}>
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={24} 
                color={isFavorite ? "#FF4B4B" : "#666"} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.extraControlButton} onPress={cyclePlaybackSpeed}>
              <View style={styles.speedButton}>
                <Text style={styles.speedText}>{playbackSpeed}x</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.extraControlButton}>
              <Ionicons name="share-outline" size={24} color="#666" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.extraControlButton}>
              <Ionicons name="download-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Description */}
        {audioItem.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{audioItem.description}</Text>
          </View>
        )}
        
        {/* Related Content */}
        <View style={styles.relatedContainer}>
          <Text style={styles.sectionTitle}>You May Also Like</Text>
          
          {relatedContent.map(item => (
            <Link key={item.id} href={`/audio/${item.id}`} asChild>
              <TouchableOpacity style={styles.relatedCard}>
                <Image 
                  source={{ uri: item.coverArt }} 
                  style={styles.relatedCoverArt} 
                  resizeMode="cover"
                />
                <View style={styles.relatedInfo}>
                  <Text style={styles.relatedTitle} numberOfLines={2}>{item.title}</Text>
                  {item.speaker && <Text style={styles.relatedSpeaker}>{item.speaker}</Text>}
                  <View style={styles.relatedMeta}>
                    <Ionicons name="time-outline" size={14} color="#666" />
                    <Text style={styles.metaText}>{item.duration}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.relatedPlayButton}>
                  <Ionicons name="play" size={18} color="white" />
                </TouchableOpacity>
              </TouchableOpacity>
            </Link>
          ))}
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
  scrollContent: {
    paddingBottom: 40,
  },
  coverArtContainer: {
    width: width,
    height: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  coverArt: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  audioInfo: {
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  audioTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 6,
  },
  audioSpeaker: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  playerControls: {
    paddingHorizontal: 24,
    marginTop: 30,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  mainControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  controlButton: {
    padding: 12,
  },
  playPauseButton: {
    backgroundColor: '#3D5AF1',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    shadowColor: '#3D5AF1',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  extraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  extraControlButton: {
    padding: 10,
  },
  speedButton: {
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  speedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  descriptionContainer: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  },
  relatedContainer: {
    paddingHorizontal: 24,
  },
  relatedCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  relatedCoverArt: {
    width: 70,
    height: 70,
    borderRadius: 8,
    margin: 12,
  },
  relatedInfo: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 12,
    justifyContent: 'center',
  },
  relatedTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  relatedSpeaker: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  relatedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  relatedPlayButton: {
    backgroundColor: '#3D5AF1',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 12,
  },
});