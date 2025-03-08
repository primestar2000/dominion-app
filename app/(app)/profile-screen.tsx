// app/(tabs)/profile.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  Switch,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

// Types
interface UserProfile {
  name: string;
  email: string;
  photoUrl: string | null;
  church: string;
  dailyReminder: boolean;
  reminderTime: string;
  notificationsEnabled: boolean;
  darkModeEnabled: boolean;
  textSize: 'small' | 'medium' | 'large';
}

// Available text sizes
const TEXT_SIZES = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
];

export default function ProfileScreen() {
  const router = useRouter();
  
  // Mock user data - in a real app, this would come from your auth/state management
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    photoUrl: null,
    church: 'Grace Community Church',
    dailyReminder: true,
    reminderTime: '08:00',
    notificationsEnabled: true,
    darkModeEnabled: false,
    textSize: 'medium',
  });
  
  // Loading states
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Handle text input changes
  const handleInputChange = (field: keyof UserProfile, value: string | boolean) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle text size change
  const handleTextSizeChange = (size: 'small' | 'medium' | 'large') => {
    setUserProfile(prev => ({
      ...prev,
      textSize: size
    }));
  };
  
  // Handle profile picture selection
  const handleSelectProfilePicture = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Please grant access to your photo library to change your profile picture.');
        return;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setIsUploading(true);
        
        // In a real app, you would upload the image to your server here
        // For this demo, we'll just simulate a delay and set the local URI
        setTimeout(() => {
          setUserProfile(prev => ({
            ...prev,
            photoUrl: result.assets[0].uri
          }));
          setIsUploading(false);
        }, 1500);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'There was a problem selecting your profile picture.');
      setIsUploading(false);
    }
  };
  
  // Handle save profile
  const handleSaveProfile = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert('Success', 'Your profile has been updated successfully.');
    }, 1500);
  };
  
  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // In a real app, you would clear auth tokens here
            Alert.alert('Logged Out', 'You have been successfully logged out.');
            // Navigate to auth screen or similar
            // router.replace('/(auth)/login');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSaveProfile}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <View style={styles.profileImageContainer}>
            {isUploading ? (
              <View style={styles.uploadingContainer}>
                <ActivityIndicator size="large" color="#3D5AF1" />
              </View>
            ) : userProfile.photoUrl ? (
              <Image 
                source={{ uri: userProfile.photoUrl }} 
                style={styles.profileImage} 
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImagePlaceholderText}>
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
            )}
            <TouchableOpacity 
              style={styles.editPhotoButton}
              onPress={handleSelectProfilePicture}
              disabled={isUploading}
            >
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Personal Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.textInput}
              value={userProfile.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Your name"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={userProfile.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="your.email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Church (Optional)</Text>
            <TextInput
              style={styles.textInput}
              value={userProfile.church}
              onChangeText={(value) => handleInputChange('church', value)}
              placeholder="Your church name"
            />
          </View>
        </View>
        
        {/* Reminders Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reminders</Text>
          
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Daily Bible Study Reminder</Text>
              <Text style={styles.toggleDescription}>Receive a daily reminder to complete your Bible study</Text>
            </View>
            <Switch
              trackColor={{ false: "#D1D1D6", true: "#A2B2FF" }}
              thumbColor={userProfile.dailyReminder ? "#3D5AF1" : "#F4F4F4"}
              ios_backgroundColor="#D1D1D6"
              onValueChange={(value) => handleInputChange('dailyReminder', value)}
              value={userProfile.dailyReminder}
            />
          </View>
          
          {userProfile.dailyReminder && (
            <View style={styles.formGroup}>
              <Text style={styles.label}>Reminder Time</Text>
              <TextInput
                style={styles.textInput}
                value={userProfile.reminderTime}
                onChangeText={(value) => handleInputChange('reminderTime', value)}
                placeholder="08:00"
                keyboardType="numbers-and-punctuation"
              />
              <Text style={styles.inputHelp}>Enter time in 24-hour format (HH:MM)</Text>
            </View>
          )}
        </View>
        
        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Notifications</Text>
              <Text style={styles.toggleDescription}>Allow push notifications</Text>
            </View>
            <Switch
              trackColor={{ false: "#D1D1D6", true: "#A2B2FF" }}
              thumbColor={userProfile.notificationsEnabled ? "#3D5AF1" : "#F4F4F4"}
              ios_backgroundColor="#D1D1D6"
              onValueChange={(value) => handleInputChange('notificationsEnabled', value)}
              value={userProfile.notificationsEnabled}
            />
          </View>
          
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Dark Mode</Text>
              <Text style={styles.toggleDescription}>Use dark theme throughout the app</Text>
            </View>
            <Switch
              trackColor={{ false: "#D1D1D6", true: "#A2B2FF" }}
              thumbColor={userProfile.darkModeEnabled ? "#3D5AF1" : "#F4F4F4"}
              ios_backgroundColor="#D1D1D6"
              onValueChange={(value) => handleInputChange('darkModeEnabled', value)}
              value={userProfile.darkModeEnabled}
            />
          </View>
          
          <View style={styles.textSizeContainer}>
            <Text style={styles.label}>Text Size</Text>
            <View style={styles.textSizeOptions}>
              {TEXT_SIZES.map((size) => (
                <TouchableOpacity
                  key={size.value}
                  style={[
                    styles.textSizeOption,
                    userProfile.textSize === size.value && styles.textSizeOptionSelected
                  ]}
                  onPress={() => handleTextSizeChange(size.value as 'small' | 'medium' | 'large')}
                >
                  <Text style={[
                    styles.textSizeOptionText,
                    userProfile.textSize === size.value && styles.textSizeOptionTextSelected,
                    { fontSize: size.value === 'small' ? 14 : size.value === 'medium' ? 16 : 18 }
                  ]}>
                    {size.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        
        {/* Account Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/password-reset')}
          >
            <MaterialIcons name="lock-outline" size={20} color="#333333" />
            <Text style={styles.actionButtonText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/privacy-policy')}
          >
            <MaterialIcons name="privacy-tip" size={20} color="#333333" />
            <Text style={styles.actionButtonText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/terms-of-service')}
          >
            <MaterialIcons name="description" size={20} color="#333333" />
            <Text style={styles.actionButtonText}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={20} color="#FF3B30" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#3D5AF1',
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  profileImageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'visible',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholderText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#3D5AF1',
  },
  uploadingContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3D5AF1',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 12,
    fontSize: 15,
    color: '#333',
  },
  inputHelp: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 4,
  },
  toggleInfo: {
    flex: 1,
    paddingRight: 16,
  },
  toggleLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 13,
    color: '#777',
  },
  textSizeContainer: {
    marginTop: 8,
  },
  textSizeOptions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  textSizeOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  textSizeOptionSelected: {
    backgroundColor: '#E0E6FF',
    borderColor: '#3D5AF1',
  },
  textSizeOptionText: {
    color: '#555',
    fontWeight: '500',
  },
  textSizeOptionTextSelected: {
    color: '#3D5AF1',
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  actionButtonText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 8,
  },
  logoutButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF3B30',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  },
});