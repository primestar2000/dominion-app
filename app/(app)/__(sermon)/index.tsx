import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  StatusBar,
  TextInput,
  Dimensions,
  FlatList,
  Switch
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MediaType, SermonItem } from '@/utils/sermon-types';
import renderSermonCard from '@/components/features/sermon/sermon-card';
import FloatableButton from '@/components/FloatableButton';

const { width } = Dimensions.get('window');

// Types

type SermonCategory = 'all' | 'current' | 'series' | 'topical' | 'guest';



const SermonScreen: React.FC = () => {
  
  const [selectedCategory, setSelectedCategory] = useState<SermonCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mediaType, setMediaType] = useState<MediaType>('audio');
  const router = useRouter();
  // Mock sermon data
  const [sermons] = useState<SermonItem[]>([
    {
      id: '1',
      title: 'Finding Hope in Uncertain Times',
      speaker: 'Pastor Michael Johnson',
      date: 'Feb 25, 2025',
      duration: '45:32',
      series: 'Navigating Life\'s Challenges',
      description: 'In a world full of uncertainty, how can we find true hope and peace? This sermon explores biblical perspectives on maintaining faith during difficult seasons.',
      videoThumbnail: require('../../../assets/images/2.jpg'),
      audioThumbnail: require('../../../assets/images/1.jpg'),
      videoLink: 'path/to/video/sermon1.mp4',
      audioLink: 'path/to/audio/sermon1.mp3',
      tags: ['Hope', 'Faith', 'Encouragement'],
      views: 1245,
      isNew: true,
      fileSize: {
        video: '320 MB',
        audio: '45 MB'
      }
    },
    {
      id: '2',
      title: 'The Power of Forgiveness',
      speaker: 'Elder Sarah Williams',
      date: 'Feb 18, 2025',
      duration: '38:15',
      series: 'Relationships Restored',
      description: 'Discover the transformative power of forgiveness and how it can heal relationships, restore personal peace, and reflect God\'s love.',
      videoThumbnail: require('../../../assets/images/2.jpg'),
      audioThumbnail: require('../../../assets/images/2.jpg'),
      videoLink: 'path/to/video/sermon2.mp4',
      audioLink: 'path/to/audio/sermon2.mp3',
      tags: ['Forgiveness', 'Healing', 'Relationships'],
      views: 987,
      fileSize: {
        video: '275 MB',
        audio: '38 MB'
      }
    },
    // ... more sermon items
  ]);

  // Filter sermons based on category and search
  const filteredSermons = sermons.filter(sermon => {
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'current' && sermon.isNew) ||
      (selectedCategory === 'series' && sermon.series) ||
      (selectedCategory === 'guest' && sermon.speaker.includes('Guest'));
    
    const matchesSearch = sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sermon.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && (searchQuery === '' || matchesSearch);
  });

  // Categories for filter tabs
  const categories = [
    { id: 'all', name: 'All Sermons', icon: 'book-open' },
    { id: 'current', name: 'Current', icon: 'star' },
    { id: 'series', name: 'Series', icon: 'layer-group' },
    { id: 'topical', name: 'Topical', icon: 'tags' },
    { id: 'guest', name: 'Guest', icon: 'users' },
  ];

  // Render sermon card
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
         colors={['blue', 'skyblue']}
         start={[0, 0]}
         end={[1, 1]}
         style={styles.header}
       >
        <View style={styles.headerContent}>
          {/* <View style={styles.titleContainer}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Sermons</Text>
          </View> */}
          
          <View style={styles.searchAndMediaContainer}>
            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={20} color="#6A0572" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search sermons, speakers, topics..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity style={styles.clearButton} onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.mediaTypeToggle}>
              <Text style={styles.mediaTypeLabel}>
                {mediaType === 'video' ? 'Video' : 'Audio'}
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#6A0572" }}
                thumbColor={mediaType === 'audio' ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setMediaType(mediaType === 'video' ? 'audio' : 'video')}
                value={mediaType === 'audio'}
              />
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Sermon Section */}
        {sermons[0] && (
          <View style={styles.featuredContainer}>
            <Text style={styles.sectionTitle}>
              Featured {mediaType === 'video' ? 'Video' : 'Audio'} Sermon
            </Text>
            <TouchableOpacity style={styles.featuredSermonCard}>
              <Image 
                source={mediaType === 'video' ? sermons[0].videoThumbnail : sermons[0].audioThumbnail} 
                style={styles.featuredSermonImage} 
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.featuredSermonGradient}
              >
                <View style={styles.featuredSermonContent}>
                  <Text style={styles.featuredSermonTitle}>
                    {sermons[0].title}
                  </Text>
                  <Text style={styles.featuredSermonSpeaker}>
                    {sermons[0].speaker}
                  </Text>
                  <TouchableOpacity style={styles.featuredPlayButton}>
                    <Ionicons 
                      name={mediaType === 'video' ? "play-circle" : "headset"} 
                      size={50} 
                      color="white" 
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Category Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map(category => (
            <TouchableOpacity 
              key={category.id} 
              style={[
                styles.categoryTab, 
                selectedCategory === category.id && styles.categoryTabActive
              ]}
              onPress={() => setSelectedCategory(category.id as SermonCategory)}
            >
              <FontAwesome5 
                name={category.icon} 
                size={16} 
                color={selectedCategory === category.id ? 'white' : '#6A0572'} 
              />
              <Text 
                style={[
                  styles.categoryTabText, 
                  selectedCategory === category.id && styles.categoryTabTextActive
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sermons List */}
        <View style={styles.sermonsListContainer}>
          {filteredSermons.length > 0 ? (
            <FlatList
              data={filteredSermons}
              renderItem={({item}) => renderSermonCard({item, mediaType})}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.sermonsList}
            />
          ) : (
            <View style={styles.noSermonsContainer}>
              <Ionicons name="book-outline" size={60} color="#DDD" />
              <Text style={styles.noSermonsText}>No sermons found</Text>
              <Text style={styles.noSermonsSubtext}>
                Try adjusting your search or filters
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <FloatableButton
        icon={<MaterialIcons name='add' size={30} color={"blue"} />}
        onPress={() => {router.navigate('/(tabs)/(sermon)/create')}}
    
        />
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
    paddingBottom: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  searchAndMediaContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  mediaTypeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  mediaTypeLabel: {
    color: 'white',
    marginRight: 10,
    fontSize: 14,
  },
  featuredContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featuredSermonCard: {
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  featuredSermonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredSermonGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 15,
  },
  featuredSermonContent: {
    width: '100%',
  },
  featuredSermonTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  featuredSermonSpeaker: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 10,
  },
  featuredPlayButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  categoriesContainer: {
    marginTop: 15,
  },
  categoriesContent: {
    paddingHorizontal: 15,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryTabActive: {
    backgroundColor: '#6A0572',
    borderColor: '#6A0572',
  },
  categoryTabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#6A0572',
  },
  categoryTabTextActive: {
    color: 'white',
  },
  sermonsListContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  sermonsList: {
    paddingBottom: 20,
  },
  
  noSermonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  noSermonsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 15,
  },
  noSermonsSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 3,
    color: '#888',
  },
  activeNavText: {
    color: '#6A0572',
    fontWeight: '600',
  },
});

export default SermonScreen;