// app/announcement/[id].tsx - Announcement detail screen
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// import { format } from 'date-fns';
import { AnnouncementType } from '@/utils/announcement-type';
import { useTheme } from '@/context/theme-context';
import { announcementDataFAke } from '@/utils/data';

export default function AnnouncementDetailScreen() {
  const {announcement: id} = useLocalSearchParams();
//   const [announcementData, setAnnouncementData] = useState<AnnouncementType | null>(announcementDataFAke[0]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const announcementData =   announcementDataFAke.find(item => item.id == id);
  useEffect(() => {
    // setAnnouncementData(newItem)
    // const loadAnnouncementDetails = async () => {
    //   try {
    //     const data = await fetchAnnouncementById(id);
    //     setAnnouncement(data);
    //   } catch (error) {
    //     console.error('Failed to fetch announcement details:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // loadAnnouncementDetails();
  }, [id]);

  const handleOpenCalendar = () => {
    // In a real app, this would add the event to the device calendar
    alert('This would add the event to your calendar');
  };

  const handleOpenMap = () => {
    // In a real app, this would open the location in maps
    if (announcementData?.location) {
      Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(announcementData.location)}`);
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.backgroundColor }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (!announcementData) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.errorText, { color: theme.textColor }]}>
          Announcement not found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      contentContainerStyle={styles.contentContainer}
    >
      {announcementData.imageUrl && (
        <Image 
          source={{ uri: announcementData.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
      )}
      
      <Text style={[styles.title, { color: theme.textColor }]}>
        {announcementData.title}
      </Text>
      
      <View style={styles.metaContainer}>
        <Text style={[styles.date, { color: theme.secondaryText }]}>
          {/* {format(new Date(announcementData.date), 'EEEE, MMMM dd, yyyy')} */}
          {announcementData.time ? ` • ${announcementData.time}` : ''}
        </Text>
      </View>
      
      {announcementData.category && (
        <View style={[styles.categoryPill, { backgroundColor: getCategoryColor(announcementData.category, theme).light }]}>
          <Text style={[styles.categoryText, { color: getCategoryColor(announcementData.category, theme).dark }]}>
            {announcementData.category}
          </Text>
        </View>
      )}
      
      <Text style={[styles.content, { color: theme.textColor }]}>
        {announcementData.content}
      </Text>
      
      {(announcementData.eventDate || announcementData.location) && (
        <View style={[styles.eventDetailsContainer, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.eventDetailsTitle, { color: theme.textColor }]}>
            Event Details
          </Text>
          
          {announcementData.eventDate && (
            <View style={styles.eventDetailRow}>
              <View style={styles.eventDetailIconContainer}>
                <Text style={styles.eventDetailIcon}>📅</Text>
              </View>
              <View style={styles.eventDetailContent}>
                <Text style={[styles.eventDetailLabel, { color: theme.secondaryText }]}>
                  Date & Time
                </Text>
                <Text style={[styles.eventDetailText, { color: theme.textColor }]}>
                  {/* {format(new Date(announcementData.eventDate), 'EEEE, MMMM dd, yyyy')} */}
                  {announcementData.time ? ` • ${announcementData.time}` : ''}
                </Text>
                <TouchableOpacity 
                  style={[styles.eventActionButton, { backgroundColor: theme.primary }]}
                  onPress={handleOpenCalendar}
                >
                  <Text style={styles.eventActionButtonText}>Add to Calendar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
          {announcementData.location && (
            <View style={styles.eventDetailRow}>
              <View style={styles.eventDetailIconContainer}>
                <Text style={styles.eventDetailIcon}>📍</Text>
              </View>
              <View style={styles.eventDetailContent}>
                <Text style={[styles.eventDetailLabel, { color: theme.secondaryText }]}>
                  Location
                </Text>
                <Text style={[styles.eventDetailText, { color: theme.textColor }]}>
                  {announcementData.location}
                </Text>
                <TouchableOpacity 
                  style={[styles.eventActionButton, { backgroundColor: theme.primary }]}
                  onPress={handleOpenMap}
                >
                  <Text style={styles.eventActionButtonText}>Open in Maps</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
      
      {announcementData.contactPerson && (
        <View style={[styles.contactContainer, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.contactTitle, { color: theme.textColor }]}>
            For more information:
          </Text>
          <Text style={[styles.contactName, { color: theme.textColor }]}>
            {announcementData.contactPerson}
          </Text>
          {announcementData.contactEmail && (
            <TouchableOpacity onPress={() => Linking.openURL(`mailto:${announcementData.contactEmail}`)}>
              <Text style={[styles.contactEmail, { color: theme.primary }]}>
                {announcementData.contactEmail}
              </Text>
            </TouchableOpacity>
          )}
          {announcementData.contactPhone && (
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${announcementData.contactPhone}`)}>
              <Text style={[styles.contactPhone, { color: theme.primary }]}>
                {announcementData.contactPhone}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ScrollView>
  );
}

function getCategoryColor(category: string, theme: any) {
  const categories: Record<string, {light: string, dark: string}> = {
    'Worship': {light: '#E6F0FF', dark: '#0D6EFD'},
    'Event': {light: '#E6FFF0', dark: '#0EA47F'},
    'Service': {light: '#FFF0E6', dark: '#FD7E14'},
    'Youth': {light: '#F0E6FF', dark: '#7048E8'},
    'Mission': {light: '#FFE6E6', dark: '#DC3545'},
    'Prayer': {light: '#FFFFCC', dark: '#6B5A00'},
    'Community': {light: '#E6FFFA', dark: '#20C997'},
  };
  
  return categories[category] || {light: theme.accentLight, dark: theme.primary};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  metaContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  date: {
    fontSize: 14,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  eventDetailsContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  eventDetailRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  eventDetailIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  eventDetailIcon: {
    fontSize: 24,
  },
  eventDetailContent: {
    flex: 1,
  },
  eventDetailLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  eventDetailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  eventActionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  eventActionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  contactContainer: {
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactEmail: {
    fontSize: 14,
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});
