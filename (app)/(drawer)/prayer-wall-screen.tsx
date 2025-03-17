import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  Switch,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

interface PrayerRequest {
  id: string;
  author: string;
  content: string;
  category: string;
  datePosted: string;
  isPrivate: boolean;
  prayerCount: number;
  hasPrayed: boolean;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  datePosted: string;
}

const PrayerWallScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'mine'>('all');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [newRequest, setNewRequest] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('General');

  // Mock data - Replace with actual data from your backend
  const prayerRequests: PrayerRequest[] = [
    {
      id: '1',
      author: 'Sarah Johnson',
      content: `Please pray for my mother's upcoming surgery next week.`,
      category: 'Health',
      datePosted: '2h ago',
      isPrivate: false,
      prayerCount: 24,
      hasPrayed: true,
      comments: [
        {
          id: '1',
          author: 'John Smith',
          content: 'Praying for successful surgery and quick recovery 🙏',
          datePosted: '1h ago',
        },
      ],
    },
    {
      id: '2',
      author: 'Michael Brown',
      content: 'Seeking prayers for guidance in my career decision.',
      category: 'Guidance',
      datePosted: '5h ago',
      isPrivate: false,
      prayerCount: 15,
      hasPrayed: false,
      comments: [],
    },
  ];

  const categories = [
    'General',
    'Health',
    'Family',
    'Guidance',
    'Provision',
    'Spiritual Growth',
  ];

  const PrayerRequestCard: React.FC<{ request: PrayerRequest }> = ({ request }) => {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    return (
      <View style={styles.requestCard}>
        <View style={styles.requestHeader}>
          <View>
            <Text style={styles.authorName}>{request.author}</Text>
            <Text style={styles.timePosted}>{request.datePosted}</Text>
          </View>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{request.category}</Text>
          </View>
        </View>

        <Text style={styles.requestContent}>{request.content}</Text>

        <View style={styles.requestActions}>
          <TouchableOpacity 
            style={[styles.prayButton, request.hasPrayed && styles.prayedButton]}
            onPress={() => {/* Handle pray */}}
          >
            <Ionicons 
              name={request.hasPrayed ? "heart" : "heart-outline"} 
              size={20} 
              color={request.hasPrayed ? "#4A90E2" : "#666"} 
            />
            <Text style={[styles.prayButtonText, request.hasPrayed && styles.prayedButtonText]}>
              {request.hasPrayed ? 'Prayed' : 'Pray'} ({request.prayerCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.commentButton}
            onPress={() => setShowComments(!showComments)}
          >
            <Ionicons name="chatbubble-outline" size={20} color="#666" />
            <Text style={styles.commentButtonText}>
              Comment ({request.comments.length})
            </Text>
          </TouchableOpacity>
        </View>

        {showComments && (
          <View style={styles.commentsSection}>
            {request.comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <Text style={styles.commentAuthor}>{comment.author}</Text>
                <Text style={styles.commentContent}>{comment.content}</Text>
                <Text style={styles.commentTime}>{comment.datePosted}</Text>
              </View>
            ))}
            
            <View style={styles.addCommentSection}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={newComment}
                onChangeText={setNewComment}
                multiline
              />
              <TouchableOpacity 
                style={styles.postCommentButton}
                onPress={() => {/* Handle post comment */}}
              >
                <Text style={styles.postCommentText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  const NewRequestModal: React.FC = () => (
    <Modal
      visible={showNewRequestModal}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Prayer Request</Text>
            <TouchableOpacity onPress={() => setShowNewRequestModal(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.categoryScroll} horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TextInput
            style={styles.requestInput}
            placeholder="Share your prayer request..."
            value={newRequest}
            onChangeText={setNewRequest}
            multiline
          />

          <View style={styles.privacyToggle}>
            <Text style={styles.privacyText}>Make this request private</Text>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              trackColor={{ false: '#ddd', true: '#4A90E2' }}
            />
          </View>

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => {
              // Handle submit
              setShowNewRequestModal(false);
            }}
          >
            <Text style={styles.submitButtonText}>Share Prayer Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <NewRequestModal />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Prayer Wall</Text>
        <TouchableOpacity onPress={() => setShowNewRequestModal(true)}>
          <Ionicons name="add-circle-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            All Requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'mine' && styles.activeTab]}
          onPress={() => setActiveTab('mine')}
        >
          <Text style={[styles.tabText, activeTab === 'mine' && styles.activeTabText]}>
            My Requests
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {prayerRequests.map((request) => (
          <PrayerRequestCard key={request.id} request={request} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrayerWallScreen;
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tab: {
    marginRight: 20,
    paddingBottom: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4A90E2',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#4A90E2',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  requestCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  timePosted: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  categoryTag: {
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 12,
    color: '#4A90E2',
  },
  requestContent: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 15,
  },
  requestActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  prayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  prayedButton: {
    opacity: 0.8,
  },
  prayButtonText: {
    marginLeft: 5,
    color: '#666',
  },
  prayedButtonText: {
    color: '#4A90E2',
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentButtonText: {
    marginLeft: 5,
    color: '#666',
  },
  commentsSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  commentItem: {
    marginBottom: 15,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  commentContent: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  commentTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  addCommentSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
  },
  postCommentButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postCommentText: {
    color: '#fff',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  categoryScroll: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#4A90E2',
  },
  categoryButtonText: {
    color: '#666',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  requestInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 15,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  privacyToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  privacyText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  submitButtonText: {

  }
})