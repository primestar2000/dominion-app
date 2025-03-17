// app/video/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Share,
  Platform,
  ActivityIndicator 
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// Types
interface VideoData {
  id: string;
  title: string;
  speaker?: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  date: string;
  views: number;
  likes: number;
  category: string;
  tags: string[];
  relatedVideos: RelatedVideo[];
}

interface RelatedVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  speaker?: string;
}

// Mock data for the current video based on ID
const getVideoById = (id: string): VideoData => {
  // In a real app, you'd fetch this data from an API
  return {
    id,
    title: 'Finding Peace in Troubled Times',
    speaker: 'Pastor Michael Johnson',
    description: 'In this sermon, Pastor Michael explores how we can find peace even in the midst of life\'s greatest challenges. Drawing from Scripture and personal experiences, he shares practical steps for maintaining spiritual calm during storms. This message focuses on Philippians 4:6-7 and includes powerful testimonies from church members who found peace in difficult circumstances.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Example video URL
    thumbnail: 'https://via.placeholder.com/1280x720',
    duration: '42:18',
    date: 'Mar 3, 2025',
    views: 1240,
    likes: 342,
    category: 'sermons',
    tags: ['peace', 'faith', 'scripture', 'anxiety'],
    relatedVideos: [
      {
        id: '2',
        title: 'Overcoming Anxiety with Faith',
        thumbnail: 'https://via.placeholder.com/300x200',
        duration: '38:24',
        speaker: 'Pastor Michael Johnson',
      },
      {
        id: '3',
        title: 'Sunday Worship - Amazing Grace',
        thumbnail: 'https://via.placeholder.com/300x200',
        duration: '16:45',
        speaker: 'Worship Team',
      },
      {
        id: '4',
        title: 'The Power of Community',
        thumbnail: 'https://via.placeholder.com/300x200',
        duration: '38:51',
        speaker: 'Pastor Sarah Williams',
      },
    ]
  };
};

 const VideoPlayerScreen = () => {
  const { id } = useLocalSearchParams();
  const videoId = Array.isArray(id) ? id[0] : id || '1';
  const videoData = getVideoById(videoId);
  
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Control visibility timeout
  useEffect(() => {
    if (showControls && !status.paused) {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      
      controlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    
    return () => {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, [showControls, status.paused]);
  
  // Handle orientation changes
  useEffect(() => {
    const lockOrientation = async () => {
      if (isFullscreen) {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } else {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      }
    };
    
    lockOrientation();
    
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, [isFullscreen]);
  
  // Format time for progress display
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Toggle fullscreen mode
  const toggleFullscreen = async () => {
    setIsFullscreen(!isFullscreen);
  };
  
  // Share functionality
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this powerful message: ${videoData.title} by ${videoData.speaker} - Watch it on our church app!`,
        url: 'https://yourchurchapp.com/video/' + videoId,
        title: videoData.title,
      });
    } catch (error) {
      console.error('Error sharing video:', error);
    }
  };
  
  // Navigate to a related video
  const goToRelatedVideo = (relatedId: string) => {
    router.push(`/video/${relatedId}`);
  };
  
  // Format view count
  const formatViews = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <SafeAreaView style={[styles.container, isFullscreen && styles.fullscreenContainer]}>
      <StatusBar style={isFullscreen ? 'light' : 'dark'} />
      
      {/* Video Player */}
      <View style={[styles.videoContainer, isFullscreen && styles.fullscreenVideoContainer]}>
        <TouchableOpacity 
          style={styles.videoTouchable} 
          activeOpacity={1}
          onPress={() => setShowControls(!showControls)}
        >
          <Video
            ref={videoRef}
            style={styles.video}
            source={{ uri: videoData.videoUrl }}
            useNativeControls={false}
            resizeMode={isFullscreen ? ResizeMode.CONTAIN : ResizeMode.COVER}
            isLooping={false}
            onPlaybackStatusUpdate={(newStatus) => {
              setStatus(newStatus);
              if (newStatus.isLoaded && isLoading) {
                setIsLoading(false);
              }
            }}
            onLoadStart={() => setIsLoading(true)}
          />
          
          {/* Loading indicator */}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3D5AF1" />
            </View>
          )}
          
          {/* Custom video controls */}
          {showControls && (
            <View style={styles.videoControls}>
              {/* Top controls */}
              <View style={styles.topControls}>
                {!isFullscreen && (
                  <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="white" />
                  </TouchableOpacity>
                )}
                {isFullscreen && (
                  <Text style={styles.fullscreenTitle} numberOfLines={1}>
                    {videoData.title}
                  </Text>
                )}
              </View>
              
              {/* Center play button */}
              <TouchableOpacity
                style={styles.centerButton}
                onPress={() => {
                  if (status.isPlaying) {
                    videoRef.current?.pauseAsync();
                  } else {
                    videoRef.current?.playAsync();
                  }
                }}
              >
                <Ionicons
                  name={status.isPlaying ? "pause" : "play"}
                  size={40}
                  color="white"
                />
              </TouchableOpacity>
              
              {/* Bottom controls */}
              <View style={styles.bottomControls}>
                {/* Progress bar */}
                <View style={styles.progressContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { 
                        width: status.positionMillis && status.durationMillis 
                          ? `${(status.positionMillis / status.durationMillis) * 100}%` 
                          : '0%' 
                      }
                    ]} 
                  />
                </View>
                
                {/* Time and fullscreen controls */}
                <View style={styles.timeControls}>
                  <Text style={styles.timeText}>
                    {status.positionMillis ? formatTime(status.positionMillis) : '0:00'} / 
                    {status.durationMillis ? formatTime(status.durationMillis) : videoData.duration}
                  </Text>
                  
                  <TouchableOpacity onPress={toggleFullscreen} style={styles.fullscreenButton}>
                    <Ionicons 
                      name={isFullscreen ? "contract" : "expand"} 
                      size={22} 
                      color="white" 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
      
      {/* Video Details - only shown in portrait mode */}
      {!isFullscreen && (
        <ScrollView style={styles.detailsContainer}>
          {/* Title and actions */}
          <View style={styles.titleContainer}>
            <Text style={styles.videoTitle}>{videoData.title}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <Ionicons name="share-social-outline" size={22} color="#333" />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="heart-outline" size={22} color="#333" />
                <Text style={styles.actionText}>Like</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="download-outline" size={22} color="#333" />
                <Text style={styles.actionText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Meta information */}
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="eye-outline" size={16} color="#666" />
              <Text style={styles.metaText}>{formatViews(videoData.views)} views</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.metaText}>{videoData.date}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="heart-outline" size={16} color="#666" />
              <Text style={styles.metaText}>{videoData.likes} likes</Text>
            </View>
          </View>
          
          {/* Speaker info */}
          {videoData.speaker && (
            <View style={styles.speakerContainer}>
              <View style={styles.speakerAvatar}>
                <Text style={styles.speakerInitials}>
                  {videoData.speaker.split(' ').map(name => name[0]).join('')}
                </Text>
              </View>
              <View style={styles.speakerInfo}>
                <Text style={styles.speakerName}>{videoData.speaker}</Text>
                <Text style={styles.speakerRole}>Pastor</Text>
              </View>
              {/* <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity> */}
            </View>
          )}
          
          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{videoData.description}</Text>
          </View>
          
          {/* Tags */}
          <View style={styles.tagsContainer}>
            {videoData.tags.map((tag, index) => (
              <TouchableOpacity key={index} style={styles.tagButton}>
                <Text style={styles.tagText}>#{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Related videos */}
          <View style={styles.relatedContainer}>
            <Text style={styles.sectionTitle}>You May Also Like</Text>
            {videoData.relatedVideos.map((video) => (
              <TouchableOpacity 
                key={video.id} 
                style={styles.relatedVideo}
                onPress={() => goToRelatedVideo(video.id)}
              >
                <View style={styles.relatedThumbnailContainer}>
                  <Ionicons name="play-circle" size={28} color="white" style={styles.relatedPlayIcon} />
                  <Text style={styles.relatedDuration}>{video.duration}</Text>
                </View>
                <View style={styles.relatedInfo}>
                  <Text style={styles.relatedTitle} numberOfLines={2}>{video.title}</Text>
                  {video.speaker && <Text style={styles.relatedSpeaker}>{video.speaker}</Text>}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const videoHeight = width * 9 / 16; // 16:9 aspect ratio

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  fullscreenContainer: {
    backgroundColor: '#000',
  },
  videoContainer: {
    width: '100%',
    height: videoHeight,
    backgroundColor: '#000',
  },
  fullscreenVideoContainer: {
    flex: 1,
    height: '100%',
  },
  videoTouchable: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  videoControls: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  topControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  fullscreenTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    flex: 1,
  },
  centerButton: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    width: '100%',
    marginBottom: 10,
  },
  progressContainer: {
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2.5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3D5AF1',
  },
  timeControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    color: 'white',
    fontSize: 14,
  },
  fullscreenButton: {
    padding: 5,
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    marginBottom: 16,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  speakerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  speakerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3D5AF1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speakerInitials: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  speakerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  speakerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  speakerRole: {
    fontSize: 14,
    color: '#666',
  },
  followButton: {
    backgroundColor: '#3D5AF1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  tagButton: {
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#3D5AF1',
    fontWeight: '500',
  },
  relatedContainer: {
    marginBottom: 30,
  },
  relatedVideo: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  relatedThumbnailContainer: {
    width: 120,
    height: 80,
    backgroundColor: '#eee',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  relatedPlayIcon: {
    position: 'absolute',
  },
  relatedDuration: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    fontSize: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  relatedInfo: {
    flex: 1,
    padding: 12,
  },
  relatedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  relatedSpeaker: {
    fontSize: 12,
    color: '#666',
  },
});

export default VideoPlayerScreen