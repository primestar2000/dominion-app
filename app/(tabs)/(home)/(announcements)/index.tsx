// app/index.tsx - Church announcements home screen
import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator, Image } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnnouncementType } from '@/utils/announcement-type';
import { useTheme } from '@/context/theme-context';
import Header from '@/components/features/announcements/header';
import AnnouncementCard from '@/components/features/announcements/anouncement-card';
import { announcementDataFAke } from '@/utils/data';

const ChurchAnnouncementsScreen = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>(announcementDataFAke);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { theme } = useTheme();

//   const loadAnnouncements = async (isRefreshing = false) => {
//     if (isRefreshing) {
//       setRefreshing(true);
//     } else {
//       setLoading(true);
//     }

//     try {
//       const data = await fetchAnnouncements();
//       setAnnouncements(data);
//     } catch (error) {
//       console.error('Failed to fetch announcements:', error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

  useFocusEffect(
    useCallback(() => {
    //   loadAnnouncements();
      return () => {};
    }, [])
  );

  const handleRefresh = () => {
    // loadAnnouncements(true);
  };

  const handleAnnouncementPress = (id: string) => {
    console.log(id)
    router.push({
        pathname: "/(tabs)/(home)/(announcements)/[announcement]",
        params: {announcement: id}
    });
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.backgroundColor, paddingTop: insets.top }
    ]}>
      {/* <Header title="Dominion Chapel" subtitle="Weekly Announcements" /> */}
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <FlatList
          data={announcements}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AnnouncementCard 
              announcement={item} 
              onPress={() => handleAnnouncementPress(item.id)}
            />
          )}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[theme.primary]}
              tintColor={theme.primary}
            />
          }
          ListHeaderComponent={
            <View style={styles.welcomeContainer}>
              <Text style={[styles.welcomeText, { color: theme.textColor }]}>
                "Let us not give up meeting together, as some are in the habit of doing, but let us encourage one another."
              </Text>
              <Text style={[styles.welcomeVerse, { color: theme.secondaryText }]}>
                - Hebrews 10:25
              </Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: theme.textColor }]}>
                No announcements available
              </Text>
              <Text style={[styles.emptySubtext, { color: theme.secondaryText }]}>
                Check back later for updates from our church community
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  separator: {
    height: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#7D5A50',
  },
  welcomeText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 24,
  },
  welcomeVerse: {
    fontSize: 14,
    textAlign: 'right',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
})


export default  ChurchAnnouncementsScreen