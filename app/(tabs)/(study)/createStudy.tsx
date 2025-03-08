// app/(tabs)/(bible-study)/create-study.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid';

// Types for our data
export interface Scripture {
  scripture: string;
  content: string;
}

export interface WeekType {
  id: string;
  title: string;
  task?: string;
  // Other week fields would be here
}

export interface StudyType {
  id: string;
  title: string;
  month: string;
  text: Scripture[];
  introduction: string;
  weeks: WeekType[];
}

// Month options for the picker
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function CreateStudyScreen() {
  const router = useRouter();
  
  // State for form data
  const [title, setTitle] = useState('');
  const [month, setMonth] = useState(MONTHS[new Date().getMonth()]); // Default to current month
  const [introduction, setIntroduction] = useState('');
  const [scriptures, setScriptures] = useState<Scripture[]>([{ scripture: '', content: '' }]);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  
  // Form validation state
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Add a new scripture field
  const addScripture = () => {
    setScriptures([...scriptures, { scripture: '', content: '' }]);
  };
  
  // Update scripture field
  const updateScripture = (index: number, field: keyof Scripture, value: string) => {
    const updatedScriptures = [...scriptures];
    updatedScriptures[index] = { ...updatedScriptures[index], [field]: value };
    setScriptures(updatedScriptures);
  };
  
  // Remove scripture field
  const removeScripture = (index: number) => {
    if (scriptures.length > 1) {
      const updatedScriptures = [...scriptures];
      updatedScriptures.splice(index, 1);
      setScriptures(updatedScriptures);
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!title.trim()) {
      newErrors.title = "Study title is required";
    }
    
    if (!introduction.trim()) {
      newErrors.introduction = "Introduction is required";
    }
    
    // Validate scriptures
    scriptures.forEach((scripture, index) => {
      if (!scripture.scripture.trim()) {
        newErrors[`scripture_${index}`] = "Scripture reference is required";
      }
      if (!scripture.content.trim()) {
        newErrors[`content_${index}`] = "Scripture content is required";
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Create the study object
      const newStudy: StudyType = {
        id: uuidv4(),
        title,
        month,
        text: scriptures,
        introduction,
        weeks: [] // Initially empty, will be added later
      };
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        Alert.alert(
          "Success", 
          "Bible study created successfully!",
          [{ 
            text: "OK", 
            onPress: () => {
              // In a real app, you might navigate to the study detail page
              router.back();
            }
          }]
        );
      }, 1500);
      
      // In a real app, you would send the data to your backend here
      // api.post('/bible-studies', newStudy)...
    }
  };
  
  // Month picker component
  const renderMonthPicker = () => {
    if (!showMonthPicker) return null;
    
    return (
      <View style={styles.pickerContainer}>
        <View style={styles.pickerHeader}>
          <Text style={styles.pickerTitle}>Select Month</Text>
          <TouchableOpacity onPress={() => setShowMonthPicker(false)}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.pickerScrollView}>
          {MONTHS.map((m) => (
            <TouchableOpacity 
              key={m} 
              style={[
                styles.pickerItem,
                month === m && styles.pickerItemSelected
              ]}
              onPress={() => {
                setMonth(m);
                setShowMonthPicker(false);
              }}
            >
              <Text style={[
                styles.pickerItemText,
                month === m && styles.pickerItemTextSelected
              ]}>
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Bible Study</Text>
        <TouchableOpacity 
          style={[styles.saveButton, (!title.trim() || isSubmitting) && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!title.trim() || isSubmitting}
        >
          <Text style={styles.saveButtonText}>
            {isSubmitting ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
      </View>
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Study Title */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Study Title *</Text>
            <TextInput
              style={[styles.textInput, errors.title && styles.inputError]}
              placeholder="e.g., The Book of James"
              value={title}
              onChangeText={setTitle}
            />
            {errors.title && (
              <Text style={styles.errorText}>{errors.title}</Text>
            )}
          </View>
          
          {/* Month Selection */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Month *</Text>
            <TouchableOpacity 
              style={styles.selectInput}
              onPress={() => setShowMonthPicker(true)}
            >
              <Text style={styles.selectInputText}>{month}</Text>
              <Ionicons name="chevron-down" size={20} color="#777" />
            </TouchableOpacity>
          </View>
          
          {/* Introduction */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Introduction *</Text>
            <TextInput
              style={[styles.textAreaInput, errors.introduction && styles.inputError]}
              placeholder="Write an introduction for this Bible study..."
              value={introduction}
              onChangeText={setIntroduction}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
            {errors.introduction && (
              <Text style={styles.errorText}>{errors.introduction}</Text>
            )}
          </View>
          
          {/* Key Scriptures */}
          <View style={styles.formSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Key Scriptures *</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={addScripture}
              >
                <Ionicons name="add" size={18} color="#3D5AF1" />
                <Text style={styles.addButtonText}>Add Scripture</Text>
              </TouchableOpacity>
            </View>
            
            {scriptures.map((scripture, index) => (
              <View style={styles.scriptureForm} key={`scripture_${index}`}>
                <View style={styles.formHeader}>
                  <Text style={styles.formSubtitle}>Scripture {index + 1}</Text>
                  {scriptures.length > 1 && (
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => removeScripture(index)}
                    >
                      <Ionicons name="trash-outline" size={16} color="#FF3B30" />
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>
                
                <Text style={styles.inputLabel}>Scripture Reference *</Text>
                <TextInput
                  style={[styles.textInput, errors[`scripture_${index}`] && styles.inputError]}
                  placeholder="e.g., James 1:2-4"
                  value={scripture.scripture}
                  onChangeText={(value) => updateScripture(index, 'scripture', value)}
                />
                {errors[`scripture_${index}`] && (
                  <Text style={styles.errorText}>{errors[`scripture_${index}`]}</Text>
                )}
                
                <Text style={styles.inputLabel}>Scripture Content *</Text>
                <TextInput
                  style={[styles.textAreaInput, errors[`content_${index}`] && styles.inputError]}
                  placeholder="Enter the scripture text..."
                  value={scripture.content}
                  onChangeText={(value) => updateScripture(index, 'content', value)}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
                {errors[`content_${index}`] && (
                  <Text style={styles.errorText}>{errors[`content_${index}`]}</Text>
                )}
              </View>
            ))}
          </View>
          
          {/* Submit Button */}
          <TouchableOpacity 
            style={[styles.submitButton, (!title.trim() || isSubmitting) && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!title.trim() || isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? "Creating Bible Study..." : "Create Bible Study"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      
      {/* Month Picker Modal */}
      {renderMonthPicker()}
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#3D5AF1',
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
    opacity: 0.7,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  formSection: {
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3D5AF1',
    marginLeft: 4,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  formSubtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF3B30',
    marginLeft: 4,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 12,
    fontSize: 15,
    color: '#333',
    marginBottom: 16,
  },
  textAreaInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 12,
    fontSize: 15,
    color: '#333',
    minHeight: 120,
    marginBottom: 16,
  },
  selectInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 12,
    fontSize: 15,
    color: '#333',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectInputText: {
    fontSize: 15,
    color: '#333',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    marginTop: -12,
    marginBottom: 12,
  },
  scriptureForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: '#3D5AF1',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 32,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  pickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '50%',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  pickerScrollView: {
    maxHeight: 300,
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  pickerItemSelected: {
    backgroundColor: '#F0F4FF',
  },
  pickerItemText: {
    fontSize: 16,
    color: '#333',
  },
  pickerItemTextSelected: {
    color: '#3D5AF1',
    fontWeight: '600',
  },
});