import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

// Types
type AudioCategory = 'sermons' | 'worship' | 'podcasts' | 'bible-studies' | 'prayer';

const CreateAudioScreen = () => {
  // Form state
  const [title, setTitle] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [category, setCategory] = useState<AudioCategory | ''>('');
  const [coverArtUri, setCoverArtUri] = useState('');
  const [audioFileUri, setAudioFileUri] = useState('');
  const [audioFileName, setAudioFileName] = useState('');
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Select cover image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setCoverArtUri(result.assets[0].uri);
    }
  };

  // Select audio file
  const pickAudioFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      });
      
      if (result.assets && result.assets.length > 0) {
        setAudioFileUri(result.assets[0].uri);
        setAudioFileName(result.assets[0].name);
      }
    } catch (error) {
      console.error('Error picking audio file:', error);
    }
  };

  // Form validation
  const isFormValid = () => {
    return (
      title.trim() !== '' &&
      speaker.trim() !== '' &&
      category !== '' &&
      coverArtUri !== '' &&
      audioFileUri !== ''
    );
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!isFormValid()) {
      Alert.alert('Missing Information', 'Please fill all required fields');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload with timeout
    setTimeout(() => {
      setIsUploading(false);
      // Show success message
      Alert.alert(
        'Success',
        'Your audio has been uploaded successfully',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Audio</Text>
        <View style={styles.headerRight} />
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Cover Art Selection */}
          <View style={styles.coverArtSection}>
            <TouchableOpacity style={styles.coverArtContainer} onPress={pickImage}>
              {coverArtUri ? (
                <Image source={{ uri: coverArtUri }} style={styles.coverArt} />
              ) : (
                <View style={styles.coverArtPlaceholder}>
                  <Ionicons name="image-outline" size={48} color="#999" />
                  <Text style={styles.coverArtText}>Upload Cover Art</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          
          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Title */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Title*</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter audio title"
                value={title}
                onChangeText={setTitle}
              />
            </View>
            
            {/* Speaker */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Speaker/Artist*</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Who created this audio?"
                value={speaker}
                onChangeText={setSpeaker}
              />
            </View>
            
            {/* Category */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category*</Text>
              <View style={styles.categoriesContainer}>
                {[
                  { id: 'sermons', label: 'Sermons' },
                  { id: 'worship', label: 'Worship' },
                  { id: 'podcasts', label: 'Podcasts' },
                  { id: 'bible-studies', label: 'Bible Studies' },
                  { id: 'prayer', label: 'Prayer' },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.categoryPill,
                      category === item.id && styles.activeCategoryPill,
                    ]}
                    onPress={() => setCategory(item.id as AudioCategory)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        category === item.id && styles.activeCategoryText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Audio File */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Audio File*</Text>
              <TouchableOpacity 
                style={styles.filePickerButton} 
                onPress={pickAudioFile}
              >
                <Ionicons name="musical-note" size={24} color={audioFileUri ? "#3D5AF1" : "#999"} />
                <Text style={[styles.filePickerText, audioFileUri && styles.filePickerTextActive]}>
                  {audioFileUri ? audioFileName : "Select Audio File"}
                </Text>
              </TouchableOpacity>
            </View>
            
            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Add a description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
            
            {/* Featured Toggle */}
            <View style={styles.inputGroup}>
              <TouchableOpacity 
                style={styles.featuredToggle}
                onPress={() => setIsFeatured(!isFeatured)}
              >
                <View style={[
                  styles.checkbox,
                  isFeatured && styles.checkboxActive
                ]}>
                  {isFeatured && <Ionicons name="checkmark" size={16} color="white" />}
                </View>
                <Text style={styles.featuredText}>Mark as Featured</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      {/* Submit Button */}
      <View style={styles.submitContainer}>
        <TouchableOpacity 
          style={[
            styles.submitButton,
            !isFormValid() && styles.submitButtonDisabled,
            isUploading && styles.uploadingButton
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid() || isUploading}
        >
          {isUploading ? (
            <Text style={styles.submitButtonText}>Uploading...</Text>
          ) : (
            <Text style={styles.submitButtonText}>Upload Audio</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  headerRight: {
    width: 30,
  },
  coverArtSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  coverArtContainer: {
    width: 200,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverArt: {
    width: '100%',
    height: '100%',
  },
  coverArtPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverArtText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EFEFEF',
    marginRight: 10,
    marginBottom: 10,
  },
  activeCategoryPill: {
    backgroundColor: '#3D5AF1',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  filePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  filePickerText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#999',
  },
  filePickerTextActive: {
    color: '#3D5AF1',
  },
  featuredToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: '#3D5AF1',
    borderColor: '#3D5AF1',
  },
  featuredText: {
    fontSize: 16,
    color: '#333',
  },
  submitContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    backgroundColor: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#3D5AF1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  uploadingButton: {
    backgroundColor: '#3D5AF1',
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateAudioScreen;