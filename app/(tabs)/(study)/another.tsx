import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface BibleStudyProps {
  navigation: any;
  route: {
    params: {
      studyId: string;
    };
  };
}

interface StudyNote {
  id: string;
  verse: string;
  note: string;
  timestamp: Date;
}

interface Discussion {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  replies: Discussion[];
}

const BibleStudyScreen: React.FC<BibleStudyProps> = ({ navigation, route }) => {
  // State management
  const [selectedVerse, setSelectedVerse] = useState<string | null>(null);
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newDiscussion, setNewDiscussion] = useState('');
  const [showNotes, setShowNotes] = useState(true);

  // Mock Bible study data
  const studyData = {
    title: "Understanding God's Grace",
    description: "A deep dive into understanding God's grace through Scripture",
    mainVerse: "Ephesians 2:8-9",
    relatedVerses: [
      "Romans 3:23-24",
      "2 Corinthians 12:9",
      "Titus 2:11-12"
    ],
    keyPoints: [
      "Grace is a gift from God",
      "We cannot earn salvation",
      "Grace transforms our lives"
    ]
  };

  const handleAddNote = () => {
    if (!selectedVerse) {
      Alert.alert('Please select a verse first');
      return;
    }
    if (newNote.trim()) {
      const note: StudyNote = {
        id: Date.now().toString(),
        verse: selectedVerse,
        note: newNote.trim(),
        timestamp: new Date(),
      };
      setNotes([...notes, note]);
      setNewNote('');
    }
  };

  const handleAddDiscussion = () => {
    if (newDiscussion.trim()) {
      const discussion: Discussion = {
        id: Date.now().toString(),
        user: 'Current User', // Replace with actual user data
        message: newDiscussion.trim(),
        timestamp: new Date(),
        replies: [],
      };
      setDiscussions([...discussions, discussion]);
      setNewDiscussion('');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Studying "${studyData.title}" - ${studyData.mainVerse}`,
        title: studyData.title,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>{studyData.title}</Text>
          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Main Verse Section */}
        <View style={styles.mainVerseContainer}>
          <Text style={styles.mainVerseLabel}>Main Verse</Text>
          <TouchableOpacity 
            style={styles.verseBox}
            onPress={() => setSelectedVerse(studyData.mainVerse)}
          >
            <Text style={styles.mainVerse}>{studyData.mainVerse}</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.description}>{studyData.description}</Text>
        </View>

        {/* Key Points */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Points</Text>
          {studyData.keyPoints.map((point, index) => (
            <View key={index} style={styles.keyPoint}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.keyPointText}>{point}</Text>
            </View>
          ))}
        </View>

        {/* Related Verses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Related Verses</Text>
          {studyData.relatedVerses.map((verse, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.relatedVerse}
              onPress={() => setSelectedVerse(verse)}
            >
              <Text style={styles.verseText}>{verse}</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Notes Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Study Notes</Text>
            <TouchableOpacity onPress={() => setShowNotes(!showNotes)}>
              <Ionicons 
                name={showNotes ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>

          {showNotes && (
            <>
              <View style={styles.noteInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Add a note..."
                  value={newNote}
                  onChangeText={setNewNote}
                  multiline
                />
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={handleAddNote}
                >
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </View>

              {notes.map((note) => (
                <View key={note.id} style={styles.noteItem}>
                  <Text style={styles.noteVerse}>{note.verse}</Text>
                  <Text style={styles.noteText}>{note.note}</Text>
                  <Text style={styles.timestamp}>
                    {note.timestamp.toLocaleDateString()}
                  </Text>
                </View>
              ))}
            </>
          )}
        </View>

        {/* Discussion Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discussion</Text>
          <View style={styles.discussionInput}>
            <TextInput
              style={styles.input}
              placeholder="Share your thoughts..."
              value={newDiscussion}
              onChangeText={setNewDiscussion}
              multiline
            />
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddDiscussion}
            >
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>

          {discussions.map((discussion) => (
            <View key={discussion.id} style={styles.discussionItem}>
              <View style={styles.discussionHeader}>
                <Text style={styles.userName}>{discussion.user}</Text>
                <Text style={styles.timestamp}>
                  {discussion.timestamp.toLocaleDateString()}
                </Text>
              </View>
              <Text style={styles.discussionText}>{discussion.message}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  shareButton: {
    padding: 8,
  },
  mainVerseContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  mainVerseLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  mainVerse: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  verseBox: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  section: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  keyPoint: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
    marginTop: 2,
  },
  keyPointText: {
    fontSize: 16,
    color: '#444',
    flex: 1,
  },
  relatedVerse: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 8,
  },
  verseText: {
    fontSize: 16,
    color: '#2f5fce',
  },
  noteInput: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#2f5fce',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  noteItem: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  noteVerse: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  discussionInput: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  discussionItem: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  discussionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  discussionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default BibleStudyScreen;