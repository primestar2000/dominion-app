// components/AnnouncementCard.tsx
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { format } from 'date-fns';
import { AnnouncementType } from '@/utils/announcement-type';
import { useTheme } from '@/context/theme-context';

interface AnnouncementCardProps {
  announcement: AnnouncementType;
  onPress: () => void;
}

export default function AnnouncementCard({ announcement, onPress }: AnnouncementCardProps) {
  const { theme } = useTheme();

  // Determine category color
  const getCategoryColor = (category: string) => {
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
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.cardBackground }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {announcement.imageUrl && (
        <Image 
          source={{ uri: announcement.imageUrl }} 
          style={styles.cardImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.contentContainer}>
        {announcement.category && (
          <View style={[
            styles.categoryPill, 
            { backgroundColor: getCategoryColor(announcement.category).light }
          ]}>
            <Text style={[
              styles.categoryText, 
              { color: getCategoryColor(announcement.category).dark }
            ]}>
              {announcement.category}
            </Text>
          </View>
        )}
        
        <Text style={[styles.title, { color: theme.textColor }]} numberOfLines={2}>
          {announcement.title}
        </Text>
        
        {announcement.eventDate && (
          <View style={styles.eventInfo}>
            <Text style={styles.eventIcon}>📅</Text>
            <Text style={[styles.eventText, { color: theme.textColor }]}>
              {/* {format(new Date(announcement.eventDate), 'MMM dd')} */}
              {announcement.time ? ` • ${announcement.time}` : ''}
            </Text>
          </View>
        )}
        
        {announcement.location && (
          <View style={styles.eventInfo}>
            <Text style={styles.eventIcon}>📍</Text>
            <Text 
              style={[styles.eventText, { color: theme.textColor }]}
              numberOfLines={1}
            >
              {announcement.location}
            </Text>
          </View>
        )}
        
        <Text 
          style={[styles.excerpt, { color: theme.secondaryText }]} 
          numberOfLines={announcement.imageUrl ? 2 : 3}
        >
          {announcement.content?.substring(0, 120)}
          {announcement.content?.length && announcement.content?.length > 120 ? '...' : ''}
        </Text>
        
        <View style={styles.footer}>
          <Text style={[styles.date, { color: theme.secondaryText }]}>
            {/* {format(new Date(announcement.date), 'MMM dd, yyyy')} */}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 140,
  },
  contentContainer: {
    padding: 16,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  eventText: {
    fontSize: 14,
  },
  excerpt: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
  },
});


// services/api.ts
