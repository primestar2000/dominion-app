import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  FlatList,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Types
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
}

interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
}

interface AudioItem {
  id: string;
  title: string;
  speaker?: string;
  coverArt: string;
  duration: string;
  category: string;
}

interface DevotionalItem {
  id: string;
  title: string;
  verse: string;
  image: string;
}

// Sample Data
const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Sunday Worship Service',
    date: 'Mar 9, 2025',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    image: 'https://th.bing.com/th/id/OIP.GedOjI-9_9ua0vEQ7zPp7AHaE7?rs=1&pid=ImgDetMain',
  },
  {
    id: '2',
    title: 'Youth Group Meeting',
    date: 'Mar 12, 2025',
    time: '6:30 PM',
    location: 'Youth Center',
    image: 'www.dominionchapelinternationalchurches.co.uk/wp-content/uploads/2022/07/6-1024x1024.png',
  },
  {
    id: '3',
    title: 'Prayer & Worship Night',
    date: 'Mar 15, 2025',
    time: '7:00 PM',
    location: 'Chapel',
    image: 'https://cdn.pixabay.com/photo/2017/08/05/21/57/people-2585962_960_720.jpg',
  },
];

const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Easter Service Schedule',
    description: 'Join us for special Easter services on April 20th at 8:00 AM, 10:00 AM, and 12:00 PM.',
    date: 'Mar 7, 2025',
    image: 'https://cdn.pixabay.com/photo/2017/09/04/09/38/crosses-2713356_960_720.jpg',
  },
  {
    id: '2',
    title: 'Volunteer Opportunities',
    description: 'We need volunteers for our upcoming community outreach event on March 22nd.',
    date: 'Mar 6, 2025',
    image: 'https://cdn.pixabay.com/photo/2017/09/08/18/46/volunteers-2729695_960_720.jpg',
  },
];

const recentAudio: AudioItem[] = [
  {
    id: '1',
    title: 'The Power of Prayer',
    speaker: 'Pastor Michael Johnson',
    coverArt: 'https://via.placeholder.com/300x300',
    duration: '36:45',
    category: 'sermons',
  },
  {
    id: '2',
    title: 'How Great Is Our God (Live)',
    speaker: 'Worship Team',
    coverArt: 'https://via.placeholder.com/300x300',
    duration: '8:22',
    category: 'worship',
  },
];

const todayDevotional: DevotionalItem = {
  id: '1',
  title: 'Finding Strength in Faith',
  verse: 'Isaiah 40:31',
  image: 'https://cdn.pixabay.com/photo/2022/03/25/23/47/bible-7092020_960_720.jpg',
};

export default function HomeScreen() {
  // Render upcoming event item
  const renderEventItem = ({ item }: { item: Event }) => (
    <Link href={`/events/${item.id}`} asChild>
      <TouchableOpacity style={styles.eventCard}>
        <Image source={{ uri: item.image }} style={styles.eventImage} />
        <View style={styles.eventOverlay}>
          <View style={styles.eventInfo}>
            <Text style={styles.eventDate}>{item.date} • {item.time}</Text>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <View style={styles.eventLocation}>
              <Ionicons name="location-outline" size={14} color="#FFFFFF" />
              <Text style={styles.eventLocationText}>{item.location}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  // Render announcement item
  const renderAnnouncementItem = ({ item }: { item: Announcement }) => (
    <TouchableOpacity style={styles.announcementCard}>
      {item.image && <Image source={{ uri: item.image }} style={styles.announcementImage} />}
      <View style={styles.announcementContent}>
        <Text style={styles.announcementTitle}>{item.title}</Text>
        <Text style={styles.announcementDescription} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.announcementDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render audio item
  const renderAudioItem = ({ item }: { item: AudioItem }) => (
    <Link href={`/audio/${item.id}`} asChild>
      <TouchableOpacity style={styles.audioCard}>
        <Image source={{ uri: item.coverArt }} style={styles.audioCoverArt} />
        <View style={styles.audioCardOverlay}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category.toUpperCase()}</Text>
          </View>
          <View style={styles.audioPlayButton}>
            <Ionicons name="play" size={20} color="#FFFFFF" />
          </View>
        </View>
        <Text style={styles.audioTitle} numberOfLines={2}>{item.title}</Text>
        {item.speaker && <Text style={styles.audioSpeaker}>{item.speaker}</Text>}
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.churchName}>Dominion Chapel</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={30} color="#3D5AF1" />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Daily Devotional */}
        <Link href={`/devotionals/${todayDevotional.id}`} asChild>
          <TouchableOpacity style={styles.devotionalCard}>
            <Image source={{ uri: todayDevotional.image }} style={styles.devotionalImage} />
            <View style={styles.devotionalOverlay}>
              <View style={styles.devotionalBadge}>
                <Text style={styles.devotionalBadgeText}>TODAY'S DEVOTIONAL</Text>
              </View>
              <View style={styles.devotionalContent}>
                <Text style={styles.devotionalTitle}>{todayDevotional.title}</Text>
                <Text style={styles.devotionalVerse}>{todayDevotional.verse}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
        
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Link href="/give" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(61, 90, 241, 0.1)' }]}>
                <Ionicons name="heart-outline" size={24} color="#3D5AF1" />
              </View>
              <Text style={styles.actionText}>Give</Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/prayer" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(255, 149, 0, 0.1)' }]}>
                <Ionicons name="chatbubbles-outline" size={24} color="#FF9500" />
              </View>
              <Text style={styles.actionText}>Prayer</Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/connect" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(76, 217, 100, 0.1)' }]}>
                <Ionicons name="people-outline" size={24} color="#4CD964" />
              </View>
              <Text style={styles.actionText}>Connect</Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/bible" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(255, 45, 85, 0.1)' }]}>
                <Ionicons name="book-outline" size={24} color="#FF2D55" />
              </View>
              <Text style={styles.actionText}>Bible</Text>
            </TouchableOpacity>
          </Link>
        </View>
        
        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <Link href="/events" asChild>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          <FlatList
            data={upcomingEvents}
            renderItem={renderEventItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventsList}
          />
        </View>
        
        {/* Announcements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Announcements</Text>
            <Link href="/announcements" asChild>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          {announcements.map(item => (
            <View key={item.id}>
              {renderAnnouncementItem({ item })}
            </View>
          ))}
        </View>
        
        {/* Recent Messages & Worship */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Messages & Worship</Text>
            <Link href="/(tabs)/(media)/(audio)" asChild>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          <FlatList
            data={recentAudio}
            renderItem={renderAudioItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.audioList}
          />
        </View>
        
        {/* Weekly Schedule */}
        <View style={[styles.section, styles.scheduleSection]}>
          <Text style={styles.sectionTitle}>Weekly Schedule</Text>
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>Sunday</Text>
            <View style={styles.scheduleEvents}>
              <Text style={styles.scheduleEvent}>Worship Service - 10:00 AM</Text>
              <Text style={styles.scheduleEvent}>Youth Group - 5:30 PM</Text>
            </View>
          </View>
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>Wednesday</Text>
            <View style={styles.scheduleEvents}>
              <Text style={styles.scheduleEvent}>Bible Study - 7:00 PM</Text>
              <Text style={styles.scheduleEvent}>Prayer Meeting - 8:30 PM</Text>
            </View>
          </View>
        </View>
        
        {/* Footer with space for bottom tabs */}
        <View style={styles.footer} />
      </ScrollView>
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
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  churchName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  profileButton: {
    padding: 5,
  },
  devotionalCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
    marginTop: 10,
  },
  devotionalImage: {
    width: '100%',
    height: '100%',
  },
  devotionalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'space-between',
    padding: 16,
  },
  devotionalBadge: {
    backgroundColor: '#3D5AF1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  devotionalBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  devotionalContent: {
    
  },
  devotionalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  devotionalVerse: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 24,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  section: {
    marginTop: 32,
    marginHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3D5AF1',
    fontWeight: '600',
  },
  eventsList: {
    paddingRight: 20,
  },
  eventCard: {
    width: 300,
    height: 170,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    marginLeft: 0,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  eventOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  eventInfo: {
    padding: 16,
  },
  eventDate: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventLocationText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
  },
  announcementCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  announcementImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  announcementContent: {
    flex: 1,
    justifyContent: 'center',
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  announcementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  announcementDate: {
    fontSize: 12,
    color: '#999',
  },
  audioList: {
    paddingRight: 20,
  },
  audioCard: {
    width: 160,
    marginRight: 16,
  },
  audioCoverArt: {
    width: 160,
    height: 160,
    borderRadius: 12,
    marginBottom: 8,
  },
  audioCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 12,
    justifyContent: 'space-between',
    top: 0,
    left: 0,
    right: 0,
    bottom: 48, // Leave space for text below
  },
  categoryBadge: {
    backgroundColor: 'rgba(61, 90, 241, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  categoryText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  audioPlayButton: {
    backgroundColor: 'rgba(61, 90, 241, 0.8)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  audioTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  audioSpeaker: {
    fontSize: 12,
    color: '#666',
  },
  scheduleSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  scheduleItem: {
    flexDirection: 'row',
    marginTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  scheduleDay: {
    width: 80,
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  scheduleEvents: {
    flex: 1,
  },
  scheduleEvent: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  footer: {
    height: 80, // Space for bottom tabs
  },
});