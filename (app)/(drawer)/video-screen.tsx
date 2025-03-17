import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
  Platform,
  Dimensions,
  Text // Added Text import
} from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

interface SermonVideoDetailProps {
  route: {
    params: {
      videoId: string;
    };
  };
  navigation: any;
}

interface SermonData {
  id: string;
  title: string;
  pastor: string;
  date: string;
  duration: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  series: string;
  verses: string[];
  downloads: number;
  views: number;
}

const SermonVideoDetail: React.FC<SermonVideoDetailProps> = ({ route, navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const video = React.useRef(null);

  // Mock data - replace with your API call
  const sermonData: SermonData = {
    id: '1',
    title: 'Finding Peace in Troubled Times',
    pastor: 'Pastor John Smith',
    date: 'February 22, 2025',
    duration: '45:30',
    description: `In this powerful message, Pastor John Smith explores the profound meaning of finding inner peace during life's most challenging moments. Drawing from Scripture and personal experiences, he shares practical insights on maintaining faith and hope when facing adversity.

    Key points covered in this sermon include:
    • Understanding God's presence in difficult times
    • Practical steps to maintain spiritual peace
    • The role of community in supporting each other
    • Biblical examples of overcoming adversity

    This message is part of our "Peace That Passes Understanding" series, exploring themes of faith, hope, and divine comfort in modern times.`,
    videoUrl: 'https://example.com/sermon-video.mp4',
    thumbnailUrl: 'https://example.com/thumbnail.jpg',
    series: 'Peace That Passes Understanding',
    verses: ['Philippians 4:7', 'John 14:27', 'Isaiah 26:3'],
    downloads: 156,
    views: 1289,
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Watch "${sermonData.title}" by ${sermonData.pastor} at our church.`,
        url: sermonData.videoUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async () => {
    const filename = sermonData.title.replace(/\s+/g, '-').toLowerCase() + '.mp4';
    const downloadPath = `${FileSystem.documentDirectory}${filename}`;

    try {
      const download = FileSystem.createDownloadResumable(
        sermonData.videoUrl,
        downloadPath,
        {}
      );
      const result = await download.downloadAsync();
      console.log('Downloaded to:', result?.uri);
    } catch (error) {
      console.error(error);
    }
  };

  // Fixed video playback status handling
  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {  // Type guard for loaded status
      setIsPlaying(status.isPlaying);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Video Player */}
        <View style={styles.videoContainer}>
          <Video
            ref={video}
            style={styles.video}
            source={{ uri: sermonData.videoUrl }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping={false}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />
        </View>

        {/* Rest of the component remains the same, but now Text components will work correctly */}
        {/* ... */}
         {/* Title Section */}
         <View style={styles.titleSection}>
          <Text style={styles.title}>{sermonData.title}</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.pastor}>{sermonData.pastor}</Text>
            <Text style={styles.date}>{sermonData.date}</Text>
            <Text style={styles.duration}>{sermonData.duration}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setIsLiked(!isLiked)}
          >
            <Ionicons 
              name={isLiked ? "heart" : "heart-outline"} 
              size={24} 
              color={isLiked ? "#ff4444" : "#666"} 
            />
            <Text style={styles.actionText}>Like</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Ionicons name="share-outline" size={24} color="#666" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleDownload}
          >
            <Ionicons name="download-outline" size={24} color="#666" />
            <Text style={styles.actionText}>Download</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionText} numberOfLines={showFullDescription ? undefined : 3}>
            {sermonData.description}
          </Text>
          <TouchableOpacity 
            onPress={() => setShowFullDescription(!showFullDescription)}
            style={styles.showMoreButton}
          >
            <Text style={styles.showMoreText}>
              {showFullDescription ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bible Verses */}
        <View style={styles.versesSection}>
          <Text style={styles.sectionTitle}>Referenced Verses</Text>
          {sermonData.verses.map((verse, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.verseItem}
              onPress={() => navigation.navigate('BibleReader', { verse })}
            >
              <Text style={styles.verseText}>{verse}</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Series Info */}
        <View style={styles.seriesSection}>
          <Text style={styles.sectionTitle}>From the Series</Text>
          <TouchableOpacity 
            style={styles.seriesButton}
            onPress={() => navigation.navigate('SermonSeries', { series: sermonData.series })}
          >
            <Text style={styles.seriesText}>{sermonData.series}</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Ionicons name="eye-outline" size={20} color="#666" />
            <Text style={styles.statText}>{sermonData.views} views</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="download-outline" size={20} color="#666" />
            <Text style={styles.statText}>{sermonData.downloads} downloads</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  titleSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  pastor: {
    fontSize: 16,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  duration: {
    fontSize: 14,
    color: '#888',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  descriptionSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  showMoreButton: {
    marginTop: 8,
  },
  showMoreText: {
    color: '#2f5fce',
    fontSize: 14,
    fontWeight: '500',
  },
  versesSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  verseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  verseText: {
    fontSize: 16,
    color: '#2f5fce',
  },
  seriesSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  seriesButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  seriesText: {
    fontSize: 16,
    color: '#333',
  },
  statsSection: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 14,
    color: '#666',
  },
});

export default SermonVideoDetail;