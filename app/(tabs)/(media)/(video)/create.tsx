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
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

// Types
type VideoCategory = 'sermons' | 'worship' | 'testimonies' | 'bible-studies' | 'events';

const CreateVideoScreen = () => {
  // Form state
  const [title, setTitle] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [category, setCategory] = useState<VideoCategory | ''>('');
  const [thumbnailUri, setThumbnailUri] = useState('');
  const [videoFileUri, setVideoFileUri] = useState('');
  const [videoFileName, setVideoFileName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Select thumbnail image
  const pickThumbnail = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setThumbnailUri(result.assets[0].uri);
    }
  };

  // Select video file
  const pickVideoFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });
      
      if (result.assets && result.assets.length > 0) {
        setVideoFileUri(result.assets[0].uri);
        setVideoFileName(result.assets[0].name);
      }
    } catch (error) {
      console.error('Error picking video file:', error);
    }
  };

  // Record video directly
  const recordVideo = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
        videoMaxDuration: 600, // 10 minutes
      });

      if (!result.canceled) {
        setVideoFileUri(result.assets[0].uri);
        setVideoFileName('Recorded video');
        
        // Could extract thumbnail from the first frame of the video
        // For now we'll just use a placeholder
        if (!thumbnailUri) {
          setThumbnailUri(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.error('Error recording video:', error);
    }
  };

  // Form validation
  const isFormValid = () => {
    return (
      title.trim() !== '' &&
      speaker.trim() !== '' &&
      category !== '' &&
      thumbnailUri !== '' &&
      videoFileUri !== ''
    );
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!isFormValid()) {
      Alert.alert('Missing Information', 'Please fill all required fields');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        // Show success message
        Alert.alert(
          'Success',
          'Your video has been uploaded successfully',
          [{ text: 'OK', onPress: () => router.back() }]
        );
      }
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Video</Text>
        <View style={styles.headerRight} />
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Thumbnail Selection */}
          <View style={styles.thumbnailSection}>
            <TouchableOpacity style={styles.thumbnailContainer} onPress={pickThumbnail}>
              {thumbnailUri ? (
                <Image source={{ uri: thumbnailUri }} style={styles.thumbnail} />
              ) : (
                <View style={styles.thumbnailPlaceholder}>
                  <Ionicons name="image-outline" size={48} color="#999" />
                  <Text style={styles.thumbnailText}>Upload Thumbnail</Text>
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
                placeholder="Enter video title"
                value={title}
                onChangeText={setTitle}
              />
            </View>
            
            {/* Speaker */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Speaker/Host*</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Who appears in this video?"
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
                  { id: 'testimonies', label: 'Testimonies' },
                  { id: 'bible-studies', label: 'Bible Studies' },
                  { id: 'events', label: 'Events' },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.categoryPill,
                      category === item.id && styles.activeCategoryPill,
                    ]}
                    onPress={() => setCategory(item.id as VideoCategory)}
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
            
            {/* Video File */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Video File*</Text>
              <View style={styles.videoButtonsContainer}>
                <TouchableOpacity 
                  style={styles.videoPickerButton} 
                  onPress={pickVideoFile}
                >
                  <Ionicons name="folder-outline" size={20} color="#3D5AF1" />
                  <Text style={styles.videoPickerText}>Choose File</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.videoRecordButton} 
                  onPress={recordVideo}
                >
                  <Ionicons name="videocam-outline" size={20} color="#fff" />
                  <Text style={styles.videoRecordText}>Record Video</Text>
                </TouchableOpacity>
              </View>
              
              {videoFileUri && (
                <View style={styles.selectedFileContainer}>
                  <Ionicons name="film-outline" size={24} color="#3D5AF1" />
                  <Text style={styles.selectedFileName} numberOfLines={1}>
                    {videoFileName}
                  </Text>
                </View>
              )}
            </View>
            
            {/* Duration */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Duration (mm:ss)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., 32:45"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numbers-and-punctuation"
              />
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
        {isUploading && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
            <Text style={styles.progressText}>{uploadProgress}% Uploaded</Text>
          </View>
        )}
        
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
            <Text style={styles.submitButtonText}>Upload Video</Text>
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
  thumbnailSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  thumbnailContainer: {
    width: 300,
    height: 169, // 16:9 aspect ratio
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  thumbnailPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailText: {
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
  videoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoPickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#3D5AF1',
    flex: 1,
    marginRight: 10,
  },
  videoPickerText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#3D5AF1',
    fontWeight: '600',
  },
  videoRecordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3D5AF1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flex: 1,
  },
  videoRecordText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  selectedFileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F3FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 12,
  },
  selectedFileName: {
    marginLeft: 10,
    fontSize: 14,
    color: '#3D5AF1',
    flex: 1,
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
  progressContainer: {
    height: 24,
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3D5AF1',
    borderRadius: 12,
  },
  progressText: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
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

export default CreateVideoScreen;