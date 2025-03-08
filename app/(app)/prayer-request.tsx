// app/(tabs)/prayer-requests.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  StatusBar,
  ActivityIndicator,
  Alert,
  FlatList,
  Switch,
  Modal
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Types
interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  authorName: string;
  isPublic: boolean;
  prayerCount: number;
  hasPrayed: boolean;
}

interface NewPrayerRequest {
  title: string;
  description: string;
  isPublic: boolean;
}

export default function PrayerRequestsScreen() {
  const router = useRouter();
  
  // State for prayer requests list
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // State for new prayer request modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newRequest, setNewRequest] = useState<NewPrayerRequest>({
    title: '',
    description: '',
    isPublic: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load prayer requests
  useEffect(() => {
    fetchPrayerRequests();
  }, []);

  // Fetch prayer requests (mock data)
  const fetchPrayerRequests = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockPrayerRequests: PrayerRequest[] = [
        {
          id: '1',
          title: 'Healing for my mother',
          description: 'My mother is undergoing surgery next week. Please pray for successful operation and quick recovery.',
          createdAt: '2025-03-05T10:30:00Z',
          authorName: 'John Doe',
          isPublic: true,
          prayerCount: 24,
          hasPrayed: true
        },
        {
          id: '2',
          title: 'New job opportunity',
          description: 'I have an important interview tomorrow. Please pray that God guides me and opens doors if this is the right position for me.',
          createdAt: '2025-03-07T14:15:00Z',
          authorName: 'Jane Smith',
          isPublic: true,
          prayerCount: 12,
          hasPrayed: false
        },
        {
          id: '3',
          title: 'Family reconciliation',
          description: 'My brother and I haven\'t spoken in years. I\'m meeting him this weekend to try to reconcile. Please pray for open hearts.',
          createdAt: '2025-03-06T09:45:00Z',
          authorName: 'Michael Johnson',
          isPublic: true,
          prayerCount: 18,
          hasPrayed: true
        },
        {
          id: '4',
          title: 'Guidance for important decision',
          description: 'I need to make a decision about relocating for work. Praying for God\'s wisdom and clear direction.',
          createdAt: '2025-03-04T16:20:00Z',
          authorName: 'Sarah Williams',
          isPublic: true,
          prayerCount: 9,
          hasPrayed: false
        },
      ];
      
      setPrayerRequests(mockPrayerRequests);
      setIsLoading(false);
      setIsRefreshing(false);
    }, 1500);
  };

  // Handle refreshing the prayer requests list
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchPrayerRequests();
  };

  // Toggle prayer status
  const handlePrayToggle = (id: string) => {
    setPrayerRequests(prevRequests => 
      prevRequests.map(request => {
        if (request.id === id) {
          const newHasPrayed = !request.hasPrayed;
          return {
            ...request,
            hasPrayed: newHasPrayed,
            prayerCount: newHasPrayed 
              ? request.prayerCount + 1 
              : request.prayerCount - 1
          };
        }
        return request;
      })
    );
  };

  // Handle prayer request submission
  const handleSubmitPrayerRequest = () => {
    // Validate form
    if (!newRequest.title.trim()) {
      Alert.alert('Missing Information', 'Please provide a title for your prayer request.');
      return;
    }
    
    if (!newRequest.description.trim()) {
      Alert.alert('Missing Information', 'Please provide a description for your prayer request.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Add the new prayer request to the list
      const newPrayerRequest: PrayerRequest = {
        id: Date.now().toString(),
        title: newRequest.title,
        description: newRequest.description,
        createdAt: new Date().toISOString(),
        authorName: 'John Doe', // Using the mock name from profile
        isPublic: newRequest.isPublic,
        prayerCount: 0,
        hasPrayed: false
      };
      
      setPrayerRequests(prev => [newPrayerRequest, ...prev]);
      
      // Reset form and close modal
      setNewRequest({
        title: '',
        description: '',
        isPublic: true,
      });
      setIsSubmitting(false);
      setIsModalVisible(false);
      
      Alert.alert('Prayer Request Submitted', 'Your prayer request has been shared with the community.');
    }, 1500);
  };

  // Format date to relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  // Render prayer request item
  const renderPrayerRequestItem = ({ item }: { item: PrayerRequest }) => (
    <View style={styles.prayerRequestCard}>
      <View style={styles.prayerRequestHeader}>
        <Text style={styles.prayerRequestTitle}>{item.title}</Text>
        <Text style={styles.prayerRequestTime}>{formatRelativeTime(item.createdAt)}</Text>
      </View>
      
      <Text style={styles.prayerRequestAuthor}>Posted by {item.authorName}</Text>
      <Text style={styles.prayerRequestDescription}>{item.description}</Text>
      
      <View style={styles.prayerRequestFooter}>
        <View style={styles.prayerCountContainer}>
          <Text style={styles.prayerCountText}>
            {item.prayerCount} {item.prayerCount === 1 ? 'prayer' : 'prayers'}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.prayButton,
            item.hasPrayed && styles.prayedButton
          ]}
          onPress={() => handlePrayToggle(item.id)}
        >
          <FontAwesome6 
            name={item.hasPrayed ? "checkmark" : "prayer"} 
            size={16} 
            color="#FFFFFF" 
          />
          <Text style={styles.prayButtonText}>
            {item.hasPrayed ? 'Prayed' : 'Pray'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Prayer Requests</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      {/* Prayer Requests List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3D5AF1" />
          <Text style={styles.loadingText}>Loading prayer requests...</Text>
        </View>
      ) : (
        <FlatList
          data={prayerRequests}
          renderItem={renderPrayerRequestItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.prayerRequestsList}
          showsVerticalScrollIndicator={false}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <FontAwesome6 name="pray" size={48} color="#CCCCCC" />
              <Text style={styles.emptyText}>No prayer requests yet</Text>
              <TouchableOpacity 
                style={styles.emptyButton}
                onPress={() => setIsModalVisible(true)}
              >
                <Text style={styles.emptyButtonText}>Share your first request</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
      
      {/* New Prayer Request Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Prayer Request</Text>
              <TouchableOpacity 
                onPress={() => setIsModalVisible(false)}
                disabled={isSubmitting}
              >
                <Ionicons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                  style={styles.textInput}
                  value={newRequest.title}
                  onChangeText={(value) => setNewRequest(prev => ({ ...prev, title: value }))}
                  placeholder="Enter a title for your prayer request"
                  maxLength={80}
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.textInput, styles.textAreaInput]}
                  value={newRequest.description}
                  onChangeText={(value) => setNewRequest(prev => ({ ...prev, description: value }))}
                  placeholder="Share details about your prayer request"
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>
              
              <View style={styles.toggleRow}>
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleLabel}>Make Public</Text>
                  <Text style={styles.toggleDescription}>Share with the church community</Text>
                </View>
                <Switch
                  trackColor={{ false: "#D1D1D6", true: "#A2B2FF" }}
                  thumbColor={newRequest.isPublic ? "#3D5AF1" : "#F4F4F4"}
                  ios_backgroundColor="#D1D1D6"
                  onValueChange={(value) => setNewRequest(prev => ({ ...prev, isPublic: value }))}
                  value={newRequest.isPublic}
                />
              </View>
              
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleSubmitPrayerRequest}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Submit Prayer Request</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  addButton: {
    backgroundColor: '#3D5AF1',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#777',
  },
  prayerRequestsList: {
    padding: 16,
  },
  prayerRequestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  prayerRequestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  prayerRequestTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  prayerRequestTime: {
    fontSize: 12,
    color: '#999',
  },
  prayerRequestAuthor: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  prayerRequestDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 16,
  },
  prayerRequestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingTop: 12,
  },
  prayerCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prayerCountText: {
    fontSize: 13,
    color: '#777',
  },
  prayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3D5AF1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  prayedButton: {
    backgroundColor: '#64B77C',
  },
  prayButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: '#3D5AF1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  modalContent: {
    padding: 20,
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
  textAreaInput: {
    minHeight: 120,
    paddingTop: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
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
  submitButton: {
    backgroundColor: '#3D5AF1',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});