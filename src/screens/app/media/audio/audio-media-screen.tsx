// app/audio.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  TextInput,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Types for our data
type AudioCategory = 'all' | 'sermons' | 'worship' | 'podcasts' | 'bible-studies' | 'prayer';

interface AudioItem {
  id: string;
  title: string;
  speaker?: string;
  coverArt: string;
  duration: string;
  date: string;
  category: AudioCategory;
  plays: number;
  isFeatured?: boolean;
}

// Sample data
const audioData: AudioItem[] = [
  {
    id: '1',
    title: 'The Power of Prayer',
    speaker: 'Pastor Michael Johnson',
    coverArt: 'https://via.placeholder.com/300x300',
    duration: '36:45',
    date: 'Mar 5, 2025',
    category: 'sermons',
    plays: 1568,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'How Great Is Our God (Live)',
    speaker: 'Worship Team',
    coverArt: 'https://via.placeholder.com/300x300',
    duration: '8:22',
    date: 'Mar 5, 2025',
    category: 'worship',
    plays: 2341,
  },
  {
    id: '3',
    title: 'Daily Devotional - Matthew 5',
    speaker: 'Sarah Williams',
    coverArt: 'https://via.placeholder.com/300x300',
    duration: '12:05',
    date: 'Mar 4, 2025',
    category: 'bible-studies',
    plays: 728,
  },
  {
    id: '4',
    title: 'Church Growth Weekly Podcast',
    speaker: 'Pastor David & Lisa Chen',
    coverArt: 'https://via.placeholder.com/300x300',
    duration: '45:33',
    date: 'Mar 3, 2025',
    category: 'podcasts',
    plays: 896,
  },
  {
    id: '5',
    title: 'Morning Prayer Session',
    speaker: 'Prayer Team',
    coverArt: 'https://via.placeholder.com/300x300',
    duration: '24:17',
    date: 'Mar 2, 2025',
    category: 'prayer',
    plays: 654,
  },
  {
    id: '6',
    title: 'Faith In Action',
    speaker: 'Pastor Michael Johnson',
    coverArt: 'https://via.placeholder.com/300x300',
    duration: '41:08',
    date: 'Mar 1, 2025',
    category: 'sermons',
    plays: 1423,
  },
  {
    id: '7',
    title: 'Bible Study: Psalms of Comfort',
    speaker: 'Elder James Wilson',
    coverArt: 'https://via.placeholder.com/300x300',
    duration: '32:50',
    date: 'Feb 28, 2025',
    category: 'bible-studies',
    plays: 745,
  },
];

const AudioScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<AudioCategory>('all');
  const router = useRouter()
  
  // Filter audio items based on search and category
  const filteredAudio = audioData.filter(audio => {
    const matchesSearch = audio.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (audio.speaker && audio.speaker.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || audio.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Get featured items
  const featuredAudio = audioData.filter(audio => audio.isFeatured);

  // Render a featured audio item
  const renderFeaturedItem = ({ item }: { item: AudioItem }) => (
    <Link href={`/audio/${item.id}`} asChild>
      <TouchableOpacity style={styles.featuredCard}>
        <Image 
          source={{ uri: item.coverArt }} 
          style={styles.featuredCoverArt} 
          resizeMode="cover"
        />
        <View style={styles.featuredOverlay}>
          <View style={styles.featuredPlayButton}>
            <Ionicons name="play" size={28} color="white" />
          </View>
          <View style={styles.featuredTextContainer}>
            <Text style={styles.featuredBadge}>FEATURED</Text>
            <Text style={styles.featuredTitle} numberOfLines={2}>{item.title}</Text>
            {item.speaker && <Text style={styles.featuredSpeaker}>{item.speaker}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  // Render a single audio item
  const renderAudioItem = ({ item }: { item: AudioItem }) => (
    <Link href={{pathname: "/(tabs)/(media)/(audio)/[audio]",params: {audio: item.id}}} asChild>
      <TouchableOpacity style={styles.audioCard}>
        <Image 
          source={{ uri: item.coverArt }} 
          style={styles.coverArt} 
          resizeMode="cover"
        />
        <View style={styles.audioInfo}>
          <Text style={styles.audioTitle} numberOfLines={2}>{item.title}</Text>
          {item.speaker && <Text style={styles.audioSpeaker}>{item.speaker}</Text>}
          <View style={styles.audioMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.metaText}>{item.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="headset-outline" size={14} color="#666" />
              <Text style={styles.metaText}>{item.plays}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play" size={24} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );

  // Render category pills
  const renderCategoryPill = (category: AudioCategory, label: string) => (
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
        <Text style={styles.headerTitle}>Audio</Text>
        <View style={{flexDirection: 'row', gap: 15}}>
          <Link asChild href={{pathname: "/(tabs)/(media)/(audio)/create"}}>
          <TouchableOpacity>
            <MaterialIcons name='add' size={30} />
          </TouchableOpacity>
          </Link>
          <Link href={{pathname: "/(tabs)/(media)/(video)"}} asChild>
          <TouchableOpacity style={styles.headerIconButton}>
            {/* <Ionicons name="options-outline" size={24} color="#333" /> */}
            <Text style={styles.headerButtonText}>Video</Text>
          </TouchableOpacity>
          </Link>
        </View>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search sermons, worship, studies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Main Content */}
      <FlatList
        data={filteredAudio}
        keyExtractor={item => item.id}
        renderItem={renderAudioItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.audioList}
        ListHeaderComponent={
          <>
            {/* Featured Section */}
            {featuredAudio.length > 0 && searchQuery === '' && activeCategory === 'all' && (
              <View style={styles.featuredSection}>
                <Text style={styles.sectionTitle}>Featured</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={featuredAudio}
                  keyExtractor={item => `featured-${item.id}`}
                  renderItem={renderFeaturedItem}
                  contentContainerStyle={styles.featuredList}
                />
              </View>
            )}
            
            {/* Categories */}
            <View style={styles.categoriesContainer}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={[
                  { id: 'all', label: 'All' },
                  { id: 'sermons', label: 'Sermons' },
                  { id: 'worship', label: 'Worship' },
                  { id: 'podcasts', label: 'Podcasts' },
                  { id: 'bible-studies', label: 'Bible Studies' },
                  { id: 'prayer', label: 'Prayer' },
                ]}
                keyExtractor={item => item.id}
                renderItem={({ item }) => renderCategoryPill(item.id as AudioCategory, item.label)}
                contentContainerStyle={styles.categoriesList}
              />
            </View>
            
            {/* Audio List Section */}
            <Text style={styles.sectionTitle}>
              {activeCategory === 'all' ? 'Recent Audio' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace('-', ' ')}`}
            </Text>
          </>
        }
      />
      {/* Mini Player (fixed at bottom) */}
      <View style={styles.miniPlayer}>
        <Image 
          source={{ uri: 'https://th.bing.com/th/id/OIP.sxir1viop5kxykFa3D8yIAHaEK?rs=1&pid=ImgDetMain' }} 
          style={styles.miniPlayerArt} 
        />
        <View style={styles.miniPlayerInfo}>
          <Text style={styles.miniPlayerTitle} numberOfLines={1}>The Power of Prayer</Text>
          <Text style={styles.miniPlayerSpeaker} numberOfLines={1}>Pastor Michael Johnson</Text>
        </View>
        <View style={styles.miniPlayerControls}>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="play-skip-back" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playPauseButton}>
            <Ionicons name="pause" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="play-skip-forward" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
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
  featuredSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginLeft: 20,
    marginBottom: 16,
    marginTop: 20,
  },
  featuredList: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  featuredCard: {
    width: 300,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
    position: 'relative',
  },
  featuredCoverArt: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'space-between',
    padding: 16,
  },
  featuredPlayButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(61, 90, 241, 0.8)',
    borderRadius: 30,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredTextContainer: {
    
  },
  featuredBadge: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 8,
    backgroundColor: 'rgba(61, 90, 241, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  featuredTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  featuredSpeaker: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.9,
  },
  categoriesContainer: {
    marginTop: 16,
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
  audioList: {
    paddingBottom: 100, // Extra space for mini player
  },
  audioCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  coverArt: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 12,
  },
  audioInfo: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 12,
    justifyContent: 'center',
  },
  audioTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  audioSpeaker: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  audioMeta: {
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
  },
  playButton: {
    backgroundColor: '#3D5AF1',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 12,
  },
  miniPlayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  miniPlayerArt: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  miniPlayerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  miniPlayerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  miniPlayerSpeaker: {
    fontSize: 12,
    color: '#666',
  },
  miniPlayerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
  },
  playPauseButton: {
    backgroundColor: '#3D5AF1',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});

export default AudioScreen