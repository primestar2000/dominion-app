import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ProfileStats {
  eventsAttended: number;
  volunteeredHours: number;
  donations: number;
  prayerRequests: number;
}

interface ProfileScreenProps {
  navigation?: any; // For TypeScript. In real app, use proper navigation typing
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  // Mock data - In a real app, this would come from your backend
  const userProfile = {
    name: "Sarah Johnson",
    role: "Church Member",
    joinDate: "Member since 2022",
    profileImage: "https://www.dummyimg.in/placeholder?bg_image_url=https://images.pexels.com/photos/853151/pexels-photo-853151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1s",
    stats: {
      eventsAttended: 24,
      volunteeredHours: 45,
      donations: 12,
      prayerRequests: 8,
    },
  };

  const renderStatItem = (label: string, value: number) => (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderMenuItem = (icon: string, label: string, onPress: () => void) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons name={icon as any} size={24} color="#555" />
      <Text style={styles.menuItemText}>{label}</Text>
      <Ionicons name="chevron-forward" size={24} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={{ uri: userProfile.profileImage }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{userProfile.name}</Text>
          <Text style={styles.role}>{userProfile.role}</Text>
          <Text style={styles.joinDate}>{userProfile.joinDate}</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          {renderStatItem("Events\nAttended", userProfile.stats.eventsAttended)}
          {renderStatItem("Volunteer\nHours", userProfile.stats.volunteeredHours)}
          {renderStatItem("Donations\nMade", userProfile.stats.donations)}
          {renderStatItem("Prayer\nRequests", userProfile.stats.prayerRequests)}
        </View>

        {/* Menu Section */}
        <View style={styles.menuContainer}>
          {renderMenuItem("person-outline", "Personal Information", () => {})}
          {renderMenuItem("calendar-outline", "My Events", () => {})}
          {renderMenuItem("heart-outline", "My Ministries", () => {})}
          {renderMenuItem("gift-outline", "Giving History", () => {})}
          {renderMenuItem("settings-outline", "Settings", () => {})}
          {renderMenuItem("help-circle-outline", "Help & Support", () => {})}
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
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  joinDate: {
    fontSize: 14,
    color: '#999',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EEE',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;