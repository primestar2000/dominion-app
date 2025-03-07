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
  FlatList
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatableButton from '@/components/FloatableButton';
import { useRouter } from 'expo-router';
import { EventCategory, EventItem } from '@/utils/event-types';
import renderEventCard from '@/components/features/events/event-card2';
import { eventsDataTest } from '@/utils/data';

// Get device dimensions for responsive design
const { width } = Dimensions.get('window');

// Types




const ChurchEventsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();
  // Mock event data
  const [events] = useState<EventItem[]>(eventsDataTest);

  // Filter events based on selected category and search query
  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && (searchQuery === '' || matchesSearch);
  });

  // Get featured events
  const featuredEvents = events.filter(event => event.isFeatured);

  // Categories for filter tabs
  const categories = [
    { id: 'all', name: 'All Events', icon: 'calendar' },
    { id: 'worship', name: 'Worship', icon: 'church' },
    { id: 'youth', name: 'Youth', icon: 'child' },
    { id: 'community', name: 'Community', icon: 'users' },
    { id: 'bible', name: 'Bible Study', icon: 'book' },
  ];

  // Render event card
  

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
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#6A0572" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search events..."
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
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Events Section */}
        {featuredEvents.length > 0 && searchQuery === '' && selectedCategory === 'all' && (
          <View style={styles.featuredContainer}>
            <Text style={styles.sectionTitle}>Featured Events</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredScrollContainer}
            >
              {featuredEvents.map(event => (
                <TouchableOpacity key={event.id} style={styles.featuredEventCard}>
                  <Image source={{uri:event.image}} style={styles.featuredEventImage} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.featuredEventGradient}
                  >
                    <View style={styles.featuredEventContent}>
                      <Text style={styles.featuredEventTitle}>{event.title}</Text>
                      <View style={styles.featuredEventMeta}>
                        <Ionicons name="calendar-outline" size={14} color="white" />
                        <Text style={styles.featuredEventMetaText}>{event.date}</Text>
                      </View>
                      <View style={styles.featuredEventBadge}>
                        <Text style={styles.featuredEventBadgeText}>Featured</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
              onPress={() => setSelectedCategory(category.id as EventCategory)}
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

        {/* Events List */}
        <View style={styles.eventsListContainer}>
          {filteredEvents.length > 0 ? (
            <FlatList
              data={filteredEvents}
              renderItem={renderEventCard}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.eventsList}
            />
          ) : (
            <View style={styles.noEventsContainer}>
              <Ionicons name="calendar" size={60} color="#DDD" />
              <Text style={styles.noEventsText}>No events found</Text>
              <Text style={styles.noEventsSubtext}>
                Try adjusting your search or filters
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
        <FloatableButton
        icon={<MaterialIcons name='add' size={30} color={"blue"} />}
        onPress={() => {router.navigate('/(tabs)/(events)/create')}}
    
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
  featuredScrollContainer: {
    paddingBottom: 15,
  },
  featuredEventCard: {
    width: width * 0.8,
    height: 180,
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  featuredEventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredEventGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 15,
  },
  featuredEventContent: {
    width: '100%',
  },
  featuredEventTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  featuredEventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredEventMetaText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
  featuredEventBadge: {
    position: 'absolute',
    top: -60,
    right: 0,
    backgroundColor: '#FF6B6B',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  featuredEventBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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
  eventsListContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  eventsList: {
    paddingBottom: 20,
  },
 
 
  noEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  noEventsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 15,
  },
  noEventsSubtext: {
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

export default ChurchEventsScreen;