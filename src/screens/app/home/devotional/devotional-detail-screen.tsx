import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { sampleDevotionals } from './devotional-screen';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import UpdateDevotionalModal from '@/components/features/devotional/update-devotional-modal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { supabase } from '@/utils/lib/superbase';
import { databaseTables } from '@/constants/db-tables';
import { deleteDevotionalState } from '@/redux/app/devotional-slice';

export type DevotionalItem = {
  id: string;
  title: string;
  date: string;
  memory_verse: {
    content: string;
    scripture: string;
  };
  contents_paragraph: string[];
  food_for_thought: string;
  prayer: string;
};

const DevotionalDetailScreen = ({ route }: { route: any }) => {
  const {goBack} = useNavigation();
  const dispatch = useAppDispatch();
  const {devotionals} = useAppSelector( store => store.devotionals);
  const { devotionalId } = route.params;
  const devotional = devotionals.find((item) => item.id === devotionalId);
  const [showEditModal, setShowEditModal] = useState(false);


  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    // Show confirmation dialog before deleting
    Alert.alert(
      'Delete Devotional',
      'Are you sure you want to delete this devotional?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteDevotional();
            goBack(); // Navigate back after deletion
          },
        },
      ]
    );
  };

  const deleteDevotional = async () => {
    try {
      console.log('delete operation', devotionalId)
      const {data, error} = await supabase.from(databaseTables.devotionals).delete().eq('id', devotionalId);
      if (error) {
        Alert.alert(error.message);
      }
      dispatch(deleteDevotionalState(devotionalId));
    } catch (error) {
      Alert.alert('something went wrong!');
      
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      {devotional ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <View style={styles.headerRow}>
              <View style={styles.headerTitleContainer}>
                <Text style={styles.title}>{devotional.title}</Text>
                <Text style={styles.date}>
                  {new Date(devotional.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity 
                  onPress={handleEdit} 
                  style={styles.actionButton}
                >
                  <Feather name="edit-2" size={20} color="#4A5568" />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={handleDelete} 
                  style={styles.actionButton}
                >
                  <Feather name="trash-2" size={20} color="#E53E3E" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Feather name="bookmark" size={20} color="#4A5568" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Rest of the existing component remains the same */}
          {/* Memory Verse Section */}
          <View style={[styles.section, styles.memoryVerseContainer]}>
            <Text style={styles.sectionTitle}>Memory Verse</Text>
            <Text style={styles.italicText}>
              "{devotional.memory_verse.content}"
            </Text>
            <Text style={styles.scriptureText}>- {devotional.memory_verse.scripture}</Text>
          </View>

          {/* Devotional Content */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Devotional</Text>
            {devotional.contents_paragraph.map((paragraph, index) => (
              <Text key={index} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}
          </View>

          {/* Food for Thought Section */}
          <View style={[styles.section, styles.foodForThoughtContainer]}>
            <Text style={styles.sectionTitle}>Food for Thought</Text>
            <Text style={styles.text}>{devotional.food_for_thought}</Text>
          </View>

          {/* Prayer Section */}
          <View style={[styles.section, styles.prayerContainer]}>
            <Text style={styles.sectionTitle}>Prayer</Text>
            <Text style={styles.italicText}>
              "{devotional.prayer}"
            </Text>
          </View>
          {
            showEditModal &&
          <Modal transparent={true} animationType='slide' onRequestClose={()=>setShowEditModal(false)} >
                <UpdateDevotionalModal devotional={devotional} onClose={()=>setShowEditModal(false)} />
          </Modal>
          }
        </ScrollView>
      ) : (
        <Text>Not Found</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
      },
      scrollView: {
        flex: 1,
      },
      contentContainer: {
        padding: 20,
      },
      headerContainer: {
        marginBottom: 24,
      },
      headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3748',
      },
      date: {
        fontSize: 14,
        color: '#718096',
        marginTop: 4,
      },
      section: {
        marginBottom: 24,
        padding: 16,
        borderRadius: 8,
      },
      memoryVerseContainer: {
        backgroundColor: '#EBF8FF',
        borderLeftWidth: 4,
        borderColor: '#3182CE',
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 8,
      },
      italicText: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#4A5568',
        marginBottom: 8,
      },
      scriptureText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#718096',
      },
      paragraph: {
        fontSize: 16,
        color: '#2D3748',
        marginBottom: 12,
        lineHeight: 24,
      },
      foodForThoughtContainer: {
        backgroundColor: '#F0FFF4',
        borderLeftWidth: 4,
        borderColor: '#38A169',
      },
      prayerContainer: {
        backgroundColor: '#FAF5FF',
        borderLeftWidth: 4,
        borderColor: '#805AD5',
      },
      text: {
        fontSize: 16,
        color: '#4A5568',
      },
    headerTitleContainer: {
        flex: 1,
        marginRight: 10,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        marginLeft: 12,
        padding: 5,
    },
    modalContainer: {
        backgroundColor: '#00000058',
        flex: 1,
        justifyContent: "flex-end"
    },
    modalContentContainer: {
        backgroundColor: "white",
        padding: 10,
        height: 240,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    }
});

export default DevotionalDetailScreen;