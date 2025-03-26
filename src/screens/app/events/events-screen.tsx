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
  FlatList
} from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Get the screen dimensions
const { width } = Dimensions.get('window');

// Event type definitions
export type EventCategory = 'all' | 'worship' | 'youth' | 'community' | 'bible';
export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  description: string;
  category?: EventCategory;
  image?: any;
  isFeatured?: boolean;
};

export default function EventsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventItem[]>([]);
  
  // Sample event data
  const sampleEvents: EventItem[] = [
    {
      id: '1',
      title: 'Sunday Worship Service',
      date: 'Mar 23, 2025',
      time: '10:00 AM - 12:00 PM',
      location: 'Main Sanctuary',
      description: 'Join us for our weekly worship service with praise, prayer, and a powerful message from Pastor Michael Johnson.',
      category: 'worship',
      image: 'https://via.placeholder.com/500x300',
      isFeatured: true,
    },
    {
      id: '2',
      title: 'Youth Night',
      date: 'Mar 26, 2025',
      time: '6:30 PM - 8:30 PM',
      location: 'Youth Center',
      description: 'A night of fun, fellowship, and spiritual growth for teens and young adults.',
      category: 'youth',
      image: 'https://via.placeholder.com/500x300',
      isFeatured: false,
    },
    {
      id: '3',
      title: 'Community Food Drive',
      date: 'Mar 28, 2025',
      time: '9:00 AM - 1:00 PM',
      location: 'Church Parking Lot',
      description: 'Help us serve our community by donating non-perishable food items. Volunteers needed!',
      category: 'community',
      image: 'https://via.placeholder.com/500x300',
      isFeatured: true,
    },
    {
      id: '4',
      title: 'Bible Study: Book of Romans',
      date: 'Mar 25, 2025',
      time: '7:00 PM - 8:30 PM',
      location: 'Fellowship Hall',
      description: 'An in-depth study of the Book of Romans led by Elder James Wilson. Bring your Bible and notebook.',
      category: 'bible',
      image: 'https://via.placeholder.com/500x300',
      isFeatured: false,
    },
    {
      id: '5',
      title: 'Prayer Breakfast',
      date: 'Mar 29, 2025',
      time: '8:00 AM - 9:30 AM',
      location: 'Fellowship Hall',
      description: 'Start your weekend with prayer and fellowship. Breakfast will be provided.',
      category: 'worship',
      image: 'https://via.placeholder.com/500x300',
      isFeatured: false,
    },
    {
      id: '6',
      title: 'Children\'s Ministry Workshop',
      date: 'Apr 2, 2025',
      time: '6:00 PM - 8:00 PM',
      location: 'Children\'s Wing',
      description: 'Training session for current and new children\'s ministry volunteers.',
      category: 'community',
      image: 'https://via.placeholder.com/500x300',
      isFeatured: false,
    },
  ];
  
  // Initialize events
  useEffect(() => {
    setEvents(sampleEvents);
    setFilteredEvents(sampleEvents);
  }, []);
  
  // Filter events by category
  const filterEvents = (category: EventCategory) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === category));
    }
  };
  
  // Calculate days remaining until event
  const getDaysRemaining = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    
    // Reset the time component to get accurate day difference
    eventDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day left';
    if (diffDays > 0) return `${diffDays} days left`;
    return 'Past event';
  };
  
  // Navigate to event details
  const goToEventDetails = (id: string) => {
    router.push(`/events/${id}`);
  };
  
  // Render category pill
  const renderCategoryPill = (category: EventCategory, label: string) => (
    <TouchableOpacity
      style={[
        styles.categoryPill,
        selectedCategory === category && styles.categoryPillActive
      ]}
      onPress={() => filterEvents(category)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category && styles.categoryTextActive
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
  
  // Render featured event
  const renderFeaturedEvent = ({ item }: { item: EventItem }) => (
    <TouchableOpacity
      style={styles.featuredCard}
      onPress={() => goToEventDetails(item.id)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.featuredImage}
        resizeMode="cover"
      />
      <View style={styles.featuredOverlay}>
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredBadgeText}>Featured</Text>
        </View>
      </View>
      <View style={styles.featuredContent}>
        <Text style={styles.featuredTitle}>{item.title}</Text>
        <View style={styles.featuredMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={14} color="#FFF" />
            <Text style={styles.featuredMetaText}>{item.date}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color="#FFF" />
            <Text style={styles.featuredMetaText}>{item.time}</Text>
          </View>
        </View>
        <View style={styles.daysRemainingBadge}>
          <Text style={styles.daysRemainingText}>{getDaysRemaining(item.date)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render regular event item
  const renderEventItem = ({ item }: { item: EventItem }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => goToEventDetails(item.id)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.eventImage}
        resizeMode="cover"
      />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle} numberOfLines={2}>{item.title}</Text>
        
        <View style={styles.eventMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={14} color="#666" />
            <Text style={styles.metaText}>{item.date}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.metaText}>{item.time}</Text>
          </View>
        </View>
        
        {item.location && (
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.metaText} numberOfLines={1}>{item.location}</Text>
          </View>
        )}
        
        <View style={styles.eventFooter}>
          {item.category && (
            <View style={[styles.categoryTag, getCategoryStyle(item.category)]}>
              <Text style={styles.categoryTagText}>{getCategoryLabel(item.category)}</Text>
            </View>
          )}
          <Text style={styles.daysText}>{getDaysRemaining(item.date)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  // Get category label
  const getCategoryLabel = (category: EventCategory): string => {
    switch(category) {
      case 'worship': return 'Worship';
      case 'youth': return 'Youth';
      case 'community': return 'Community';
      case 'bible': return 'Bible Study';
      default: return 'General';
    }
  };
  
  // Get category style
  const getCategoryStyle = (category: EventCategory) => {
    switch(category) {
      case 'worship': return styles.categoryWorship;
      case 'youth': return styles.categoryYouth;
      case 'community': return styles.categoryCommunity;
      case 'bible': return styles.categoryBible;
      default: return {};
    }
  };
  
  // Featured events
  const featuredEvents = filteredEvents.filter(event => event.isFeatured);
  
  // Regular events (non-featured)
  const regularEvents = filteredEvents.filter(event => !event.isFeatured);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {renderCategoryPill('all', 'All Events')}
          {renderCategoryPill('worship', 'Worship')}
          {renderCategoryPill('youth', 'Youth')}
          {renderCategoryPill('community', 'Community')}
          {renderCategoryPill('bible', 'Bible Study')}
        </ScrollView>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Events</Text>
            <FlatList
              data={featuredEvents}
              renderItem={renderFeaturedEvent}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
              snapToInterval={width - 48}
              decelerationRate="fast"
              pagingEnabled
            />
          </View>
        )}
        
        {/* Upcoming Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {regularEvents.length > 0 ? (
            regularEvents.map(event => (
              <View key={event.id}>
                {renderEventItem({ item: event })}
              </View>
            ))
          ) : (
            <View style={styles.noEventsContainer}>
              <Ionicons name="calendar-outline" size={48} color="#CCC" />
              <Text style={styles.noEventsText}>No events in this category</Text>
            </View>
          )}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  categoriesContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    backgroundColor: '#FFFFFF',
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#EFEFEF',
  },
  categoryPillActive: {
    backgroundColor: '#3D5AF1',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  featuredList: {
    paddingRight: 24,
  },
  featuredCard: {
    width: width - 48,
    height: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF4B4B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  featuredBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  featuredMeta: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  featuredMetaText: {
    fontSize: 12,
    color: '#FFF',
    marginLeft: 4,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  daysRemainingBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#3D5AF1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderTopLeftRadius: 12,
  },
  daysRemainingText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  eventCard: {
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
  eventImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  eventContent: {
    flex: 1,
    padding: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  eventMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#EFEFEF',
  },
  categoryTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
  },
  categoryWorship: {
    backgroundColor: '#E3F2FD',
  },
  categoryYouth: {
    backgroundColor: '#F9FBE7',
  },
  categoryCommunity: {
    backgroundColor: '#E8F5E9',
  },
  categoryBible: {
    backgroundColor: '#F3E5F5',
  },
  daysText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3D5AF1',
  },
  noEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noEventsText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
});