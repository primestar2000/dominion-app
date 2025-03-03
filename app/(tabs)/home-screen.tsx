import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  image: string;
}

interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
}

const HomeScreen: React.FC = () => {
  // Mock data - Replace with actual data from your backend
  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Sunday Service',
      date: 'Sunday, Feb 25',
      time: '10:00 AM',
      image: 'https://www.dummyimg.in/placeholder?bg_image_url=https://images.pexels.com/photos/853151/pexels-photo-853151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '2',
      title: 'Youth Group Meeting',
      date: 'Wednesday, Feb 28',
      time: '6:30 PM',
      image: 'https://via.placeholder.com/200x150',
    },
  ];

  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Easter Service Schedule',
      description: 'Join us for special Easter services and activities.',
      date: 'Today',
    },
    {
      id: '2',
      title: 'Community Outreach',
      description: 'Volunteer opportunity this weekend at local shelter.',
      date: 'Yesterday',
    },
  ];

  const QuickActionButton: React.FC<{
    icon: string;
    label: string;
    onPress: () => void;
  }> = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={styles.quickActionIcon}>
        <Ionicons name={icon as any} size={24} color="#4A90E2" />
      </View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.churchName}>Dominion Chapel Int'l Church</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <QuickActionButton icon="calendar-outline" label="Events" onPress={() => {}} />
          <QuickActionButton icon="heart-outline" label="Give" onPress={() => {}} />
          <QuickActionButton icon="book-outline" label="Sermons" onPress={() => {}} />
          <QuickActionButton icon="people-outline" label="Groups" onPress={() => {}} />
        </View>

        {/* Live Stream Banner */}
        <TouchableOpacity style={styles.liveStreamBanner}>
          <View style={styles.liveTag}>
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <Text style={styles.liveStreamTitle}>Sunday Service</Text>
          <Text style={styles.liveStreamSubtitle}>Join us now</Text>
          <Ionicons name="play-circle" size={40} color="#fff" style={styles.playIcon} />
        </TouchableOpacity>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {upcomingEvents.map((event) => (
              <TouchableOpacity key={event.id} style={styles.eventCard}>
                <Image source={{ uri: event.image }} style={styles.eventImage} />
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDate}>{event.date}</Text>
                  <Text style={styles.eventTime}>{event.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Announcements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Announcements</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>
          {announcements.map((announcement) => (
            <TouchableOpacity key={announcement.id} style={styles.announcementCard}>
              <View style={styles.announcementContent}>
                <Text style={styles.announcementTitle}>{announcement.title}</Text>
                <Text style={styles.announcementDescription} numberOfLines={2}>
                  {announcement.description}
                </Text>
              </View>
              <Text style={styles.announcementDate}>{announcement.date}</Text>
            </TouchableOpacity>
          ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  churchName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  profileButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  quickAction: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    color: '#333',
  },
  liveStreamBanner: {
    margin: 20,
    height: 150,
    backgroundColor: '#4A90E2',
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
  },
  liveTag: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  liveText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  liveStreamTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
  },
  liveStreamSubtitle: {
    color: '#fff',
    fontSize: 16,
  },
  playIcon: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  seeAllButton: {
    color: '#4A90E2',
    fontSize: 14,
  },
  eventCard: {
    width: 200,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  eventInfo: {
    padding: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
  },
  announcementCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  announcementContent: {
    flex: 1,
    marginRight: 10,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  announcementDescription: {
    fontSize: 14,
    color: '#666',
  },
  announcementDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default HomeScreen;