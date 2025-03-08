// app/media.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  TextInput,
  StatusBar
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Types for our data
type VideoCategory = 'all' | 'sermons' | 'worship' | 'events' | 'testimonies';

interface VideoItem {
  id: string;
  title: string;
  speaker?: string;
  thumbnail: string;
  duration: string;
  date: string;
  category: VideoCategory;
  views: number;
}

// Sample data
const videoData: VideoItem[] = [
  {
    id: '1',
    title: 'Finding Peace in Troubled Times',
    speaker: 'Pastor Michael Johnson',
    thumbnail: 'https://via.placeholder.com/300x200',
    duration: '42:18',
    date: 'Mar 3, 2025',
    category: 'sermons',
    views: 1240,
  },
  {
    id: '2',
    title: 'Sunday Worship - Amazing Grace',
    speaker: 'Worship Team',
    thumbnail: 'https://via.placeholder.com/300x200',
    duration: '16:45',
    date: 'Mar 3, 2025',
    category: 'worship',
    views: 890,
  },
  {
    id: '3',
    title: 'How Prayer Changed My Life',
    speaker: 'Sarah Williams',
    thumbnail: 'https://via.placeholder.com/300x200',
    duration: '08:22',
    date: 'Feb 28, 2025',
    category: 'testimonies',
    views: 562,
  },
  {
    id: '4',
    title: 'Youth Conference Highlights',
    thumbnail: 'https://via.placeholder.com/300x200',
    duration: '12:05',
    date: 'Feb 25, 2025',
    category: 'events',
    views: 738,
  },
  {
    id: '5',
    title: 'The Power of Community',
    speaker: 'Pastor Michael Johnson',
    thumbnail: 'https://via.placeholder.com/300x200',
    duration: '38:51',
    date: 'Feb 24, 2025',
    category: 'sermons',
    views: 1182,
  },
  {
    id: '6',
    title: 'Easter Service Planning',
    thumbnail: 'https://via.placeholder.com/300x200',
    duration: '05:12',
    date: 'Feb 22, 2025',
    category: 'events',
    views: 347,
  },
];

export default function MediaScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('all');
  
  // Filter videos based on search and category
  const filteredVideos = videoData.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (video.speaker && video.speaker.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || video.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Render a single video item
  const renderVideoItem = ({ item }: { item: VideoItem }) => (
    <Link href={{pathname: '/(tabs)/(media)/(video)/[video]', params: {video: item.id}}} asChild>
      <TouchableOpacity style={styles.videoCard}>
        <View style={styles.thumbnailContainer}>
          <Image 
            source={{ uri: item.thumbnail }} 
            style={styles.thumbnail} 
            resizeMode="cover"
          />
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
          <View style={styles.playButton}>
            <Ionicons name="play" size={20} color="white" />
          </View>
        </View>
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
          {item.speaker && <Text style={styles.videoSpeaker}>{item.speaker}</Text>}
          <View style={styles.videoMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color="#666" />
              <Text style={styles.metaText}>{item.date}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="eye-outline" size={14} color="#666" />
              <Text style={styles.metaText}>{item.views}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  // Render category pills
  const renderCategoryPill = (category: VideoCategory, label: string) => (
    <TouchableOpacity 
      style={[
        styles.categoryPill, 
        activeCategory === category && styles.activeCategoryPill
      ]}
      onPress={() => setActiveCategory(category)}
    >
      <Text 
        style={[
          styles.categoryText, 
          activeCategory === category && styles.activeCategoryText
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Media</Text>
        <View style={{flexDirection: 'row', gap: 15}}>
          <Link asChild href={{pathname: "/(tabs)/(media)/(video)/create"}}>
          <TouchableOpacity>
            <MaterialIcons name='add' size={30} />
          </TouchableOpacity>
          </Link>
          <Link  href={{pathname: "/(tabs)/(media)/(audio)"}} asChild>
            <TouchableOpacity style={styles.headerIconButton}>
            {/* <Ionicons name="notifications-outline" size={24} color="#333" /> */}
            <Text style={styles.headerButtonText}>Audio</Text>
            </TouchableOpacity>
        </Link>
        </View>
        
      </View>
    
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search sermons, worship, events..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            { id: 'all', label: 'All' },
            { id: 'sermons', label: 'Sermons' },
            { id: 'worship', label: 'Worship' },
            { id: 'events', label: 'Events' },
            { id: 'testimonies', label: 'Testimonies' },
          ]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => renderCategoryPill(item.id as VideoCategory, item.label)}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      
      {/* Video List */}
      <FlatList
        data={filteredVideos}
        keyExtractor={item => item.id}
        renderItem={renderVideoItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.videoList}
      />
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  headerIconButton: {
    padding: 5,
    paddingHorizontal: 10,
    borderColor: '#3D5AF1',
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 15,
  },
  headerButtonText: {
    color: '#3D5AF1',
    fontSize: 14,
    fontWeight: '800',

  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 12,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    marginTop: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EFEFEF',
    marginRight: 10,
  },
  activeCategoryPill: {
    backgroundColor: '#3D5AF1',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  videoList: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  videoCard: {
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
  thumbnailContainer: {
    width: 120,
    height: 90,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  durationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  videoSpeaker: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  }
});