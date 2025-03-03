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
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

// Get device dimensions for responsive design
const { width } = Dimensions.get('window');

// Types
type EventCategory = 'all' | 'worship' | 'youth' | 'community' | 'bible';

type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: EventCategory;
  image: any;
  isFeatured?: boolean;
};

const ChurchEventsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mock event data
  const [events] = useState<EventItem[]>([
    {
      id: '1',
      title: 'Sunday Worship Service',
      date: 'Mar 3, 2025',
      time: '10:00 AM - 12:00 PM',
      location: 'Main Sanctuary',
      description: 'Join us for our weekly worship service with Pastor Michael Johnson. This week\'s sermon is "Finding Peace in Troubled Times".',
      category: 'worship',
      image: require('../../assets/images/1.jpg'),
      isFeatured: true,
    },
    {
      id: '2',
      title: 'Youth Group Meeting',
      date: 'Mar 5, 2025',
      time: '6:30 PM - 8:00 PM',
      location: 'Youth Center',
      description: 'All teens are welcome to join our midweek youth group for games, worship, and Bible discussion.',
      category: 'youth',
      image: require('../../assets/images/2.jpg'),
    },
    {
      id: '3',
      title: 'Bible Study: Book of Romans',
      date: 'Mar 7, 2025',
      time: '7:00 PM - 8:30 PM',
      location: 'Fellowship Hall',
      description: 'An in-depth study of the Book of Romans led by Elder Sarah Williams. Open to all knowledge levels.',
      category: 'bible',
      image: require('../../assets/images/2.jpg'),
    },
    {
      id: '4',
      title: 'Community Outreach: Food Drive',
      date: 'Mar 8, 2025',
      time: '9:00 AM - 1:00 PM',
      location: 'Church Parking Lot',
      description: 'Help us collect non-perishable food items for the local food bank. Volunteers needed!',
      category: 'community',
      image: require('../../assets/images/3.jpg'),
      isFeatured: true,
    },
    {
      id: '5',
      title: 'Prayer Breakfast',
      date: 'Mar 10, 2025',
      time: '7:30 AM - 9:00 AM',
      location: 'Church Cafeteria',
      description: 'Start your week with fellowship and prayer. Breakfast will be served. All are welcome.',
      category: 'worship',
      image: require('../../assets/images/1.jpg'),
    },
    {
      id: '6',
      title: 'Children\'s Ministry Volunteer Meeting',
      date: 'Mar 11, 2025',
      time: '6:00 PM - 7:00 PM',
      location: 'Children\'s Wing',
      description: 'Training session for all current and new children\'s ministry volunteers.',
      category: 'community',
      image: require('../../assets/images/1.jpg'),
    },
    {
      id: '7',
      title: 'Young Adults Bible Study',
      date: 'Mar 12, 2025',
      time: '7:00 PM - 9:00 PM',
      location: 'Coffee Shop Area',
      description: 'Bible study and discussion focused on applying faith in everyday life for adults 18-30.',
      category: 'bible',
      image: require('../../assets/images/1.jpg'),
    },
    {
      id: '8',
      title: 'Wednesday Night Worship',
      date: 'Mar 12, 2025',
      time: '7:00 PM - 8:30 PM',
      location: 'Main Sanctuary',
      description: 'Midweek worship service with contemporary music and a message from Pastor David.',
      category: 'worship',
      image: require('../../assets/images/1.jpg'),
    },
  ]);

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
  const renderEventCard = ({ item }: { item: EventItem }) => (
    <TouchableOpacity style={styles.eventCard}>
      <Image source={item.image} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <TouchableOpacity style={styles.saveButton}>
            <Ionicons name="bookmark-outline" size={22} color="#6A0572" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.eventMetaContainer}>
          <View style={styles.eventMeta}>
            <Ionicons name="calendar-outline" size={16} color="#6A0572" />
            <Text style={styles.eventMetaText}>{item.date}</Text>
          </View>
          <View style={styles.eventMeta}>
            <Ionicons name="time-outline" size={16} color="#6A0572" />
            <Text style={styles.eventMetaText}>{item.time}</Text>
          </View>
          <View style={styles.eventMeta}>
            <Ionicons name="location-outline" size={16} color="#6A0572" />
            <Text style={styles.eventMetaText}>{item.location}</Text>
          </View>
        </View>
        
        <Text style={styles.eventDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.eventCardFooter}>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreInfoButton}>
            <Text style={styles.moreInfoButtonText}>Details</Text>
            <Ionicons name="chevron-forward" size={16} color="#6A0572" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#6A0572', '#AB83A1']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Events</Text>
          </View>
          
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
                  <Image source={event.image} style={styles.featuredEventImage} />
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
      
      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#888" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar" size={24} color="#6A0572" />
          <Text style={[styles.navText, styles.activeNavText]}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="book-outline" size={24} color="#888" />
          <Text style={styles.navText}>Bible</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people-outline" size={24} color="#888" />
          <Text style={styles.navText}>Groups</Text>
        </TouchableOpacity>
      </View>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    marginRight: 10,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 15,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    padding: 5,
  },
  eventMetaContainer: {
    marginBottom: 10,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventMetaText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  eventCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  registerButton: {
    backgroundColor: '#6A0572',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  moreInfoButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreInfoButtonText: {
    color: '#6A0572',
    fontWeight: '500',
    marginRight: 5,
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