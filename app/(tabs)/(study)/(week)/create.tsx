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
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Types for our data
interface SubPoint {
  title?: string;
  text?: string;
  sub_points?: string[];
}

interface MainPoint {
  title: string;
  text?: string;
  points?: SubPoint[];
}

interface Scripture {
  scripture: string;
  content: string;
}

export default function CreateBibleStudyWeekScreen() {
  const router = useRouter();
  
  // State for form data
  const [weekTitle, setWeekTitle] = useState('');
  const [weekTask, setWeekTask] = useState('');
  const [scriptures, setScriptures] = useState<Scripture[]>([{ scripture: '', content: '' }]);
  const [mainPoints, setMainPoints] = useState<MainPoint[]>([{ title: '', text: '', points: [] }]);
  
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
  
  // Add a new main point
  const addMainPoint = () => {
    setMainPoints([...mainPoints, { title: '', text: '', points: [] }]);
  };
  
  // Update main point field
  const updateMainPoint = (index: number, field: keyof MainPoint, value: string) => {
    const updatedPoints = [...mainPoints];
    updatedPoints[index] = { 
      ...updatedPoints[index], 
      [field]: value 
    };
    setMainPoints(updatedPoints);
  };
  
  // Remove main point
  const removeMainPoint = (index: number) => {
    if (mainPoints.length > 1) {
      const updatedPoints = [...mainPoints];
      updatedPoints.splice(index, 1);
      setMainPoints(updatedPoints);
    } else {
      Alert.alert("Cannot Remove", "You need at least one main point.");
    }
  };
  
  // Add a sub point to a main point
  const addSubPoint = (mainPointIndex: number) => {
    const updatedPoints = [...mainPoints];
    if (!updatedPoints[mainPointIndex].points) {
      updatedPoints[mainPointIndex].points = [];
    }
    updatedPoints[mainPointIndex].points?.push({
      title: '',
      text: '',
      sub_points: []
    });
    setMainPoints(updatedPoints);
  };
  
  // Update sub point field
  const updateSubPoint = (
    mainPointIndex: number, 
    subPointIndex: number, 
    field: keyof SubPoint, 
    value: string | string[]
  ) => {
    const updatedPoints = [...mainPoints];
    if (updatedPoints[mainPointIndex].points) {
      updatedPoints[mainPointIndex].points![subPointIndex] = {
        ...updatedPoints[mainPointIndex].points![subPointIndex],
        [field]: value
      };
      setMainPoints(updatedPoints);
    }
  };
  
  // Remove sub point
  const removeSubPoint = (mainPointIndex: number, subPointIndex: number) => {
    const updatedPoints = [...mainPoints];
    if (updatedPoints[mainPointIndex].points) {
      updatedPoints[mainPointIndex].points!.splice(subPointIndex, 1);
      setMainPoints(updatedPoints);
    }
  };
  
  // Add a bullet point to a sub point
  const addBulletPoint = (mainPointIndex: number, subPointIndex: number) => {
    const updatedPoints = [...mainPoints];
    if (updatedPoints[mainPointIndex].points) {
      const subPoint = updatedPoints[mainPointIndex].points![subPointIndex];
      if (!subPoint.sub_points) {
        subPoint.sub_points = [];
      }
      subPoint.sub_points.push('');
      setMainPoints(updatedPoints);
    }
  };
  
  // Update bullet point text
  const updateBulletPoint = (
    mainPointIndex: number, 
    subPointIndex: number, 
    bulletIndex: number, 
    value: string
  ) => {
    const updatedPoints = [...mainPoints];
    if (
      updatedPoints[mainPointIndex].points && 
      updatedPoints[mainPointIndex].points![subPointIndex].sub_points
    ) {
      updatedPoints[mainPointIndex].points![subPointIndex].sub_points![bulletIndex] = value;
      setMainPoints(updatedPoints);
    }
  };
  
  // Remove bullet point
  const removeBulletPoint = (
    mainPointIndex: number, 
    subPointIndex: number, 
    bulletIndex: number
  ) => {
    const updatedPoints = [...mainPoints];
    if (
      updatedPoints[mainPointIndex].points && 
      updatedPoints[mainPointIndex].points![subPointIndex].sub_points
    ) {
      updatedPoints[mainPointIndex].points![subPointIndex].sub_points!.splice(bulletIndex, 1);
      setMainPoints(updatedPoints);
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!weekTitle.trim()) {
      newErrors.weekTitle = "Week title is required";
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
    
    // Validate main points
    mainPoints.forEach((point, index) => {
      if (!point.title.trim()) {
        newErrors[`mainPoint_${index}`] = "Main point title is required";
      }
      
      // Validate sub points if they exist
      point.points?.forEach((subPoint, subIndex) => {
        if (subPoint.title && !subPoint.title.trim()) {
          newErrors[`subPoint_${index}_${subIndex}`] = "Sub point title is required";
        }
      });
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        Alert.alert(
          "Success", 
          "Bible study week created successfully!",
          [{ text: "OK", onPress: () => router.back() }]
        );
      }, 1500);
      
      // In a real app, you would send the data to your backend here
      // const weekData = {
      //   title: weekTitle,
      //   task: weekTask,
      //   scriptures,
      //   main_points: mainPoints
      // };
      // api.post('/bible-study/weeks', weekData)...
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Bible Study Week</Text>
        <TouchableOpacity 
          style={[styles.saveButton, (!weekTitle.trim() || isSubmitting) && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!weekTitle.trim() || isSubmitting}
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
          {/* Week Title */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Week Title *</Text>
            <TextInput
              style={[styles.textInput, errors.weekTitle && styles.inputError]}
              placeholder="e.g., Week 3: Faith and Works"
              value={weekTitle}
              onChangeText={setWeekTitle}
            />
            {errors.weekTitle && (
              <Text style={styles.errorText}>{errors.weekTitle}</Text>
            )}
          </View>
          
          {/* Week Task */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Week Task (Optional)</Text>
            <TextInput
              style={styles.textAreaInput}
              placeholder="e.g., Read James chapter 2 and reflect on how faith is demonstrated through actions"
              value={weekTask}
              onChangeText={setWeekTask}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
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
                  placeholder="e.g., James 2:14-17"
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
          
          {/* Main Points */}
          <View style={styles.formSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Main Points *</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={addMainPoint}
              >
                <Ionicons name="add" size={18} color="#3D5AF1" />
                <Text style={styles.addButtonText}>Add Main Point</Text>
              </TouchableOpacity>
            </View>
            
            {mainPoints.map((point, index) => (
              <View style={styles.mainPointForm} key={`mainPoint_${index}`}>
                <View style={styles.formHeader}>
                  <Text style={styles.formSubtitle}>Main Point {index + 1}</Text>
                  {mainPoints.length > 1 && (
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => removeMainPoint(index)}
                    >
                      <Ionicons name="trash-outline" size={16} color="#FF3B30" />
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>
                
                <Text style={styles.inputLabel}>Point Title *</Text>
                <TextInput
                  style={[styles.textInput, errors[`mainPoint_${index}`] && styles.inputError]}
                  placeholder="e.g., Faith Without Works is Dead"
                  value={point.title}
                  onChangeText={(value) => updateMainPoint(index, 'title', value)}
                />
                {errors[`mainPoint_${index}`] && (
                  <Text style={styles.errorText}>{errors[`mainPoint_${index}`]}</Text>
                )}
                
                <Text style={styles.inputLabel}>Description (Optional)</Text>
                <TextInput
                  style={styles.textAreaInput}
                  placeholder="Describe this main point..."
                  value={point.text || ''}
                  onChangeText={(value) => updateMainPoint(index, 'text', value)}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
                
                {/* Sub Points */}
                <View style={styles.subPointsSection}>
                  <View style={styles.subSectionHeader}>
                    <Text style={styles.subSectionTitle}>Sub Points (Optional)</Text>
                    <TouchableOpacity 
                      style={styles.addButton}
                      onPress={() => addSubPoint(index)}
                    >
                      <Ionicons name="add" size={16} color="#3D5AF1" />
                      <Text style={styles.addButtonText}>Add Sub Point</Text>
                    </TouchableOpacity>
                  </View>
                  
                  {point.points && point.points.map((subPoint, subIndex) => (
                    <View style={styles.subPointForm} key={`subPoint_${index}_${subIndex}`}>
                      <View style={styles.formHeader}>
                        <Text style={styles.formSubtitle}>Sub Point {subIndex + 1}</Text>
                        <TouchableOpacity 
                          style={styles.removeButton}
                          onPress={() => removeSubPoint(index, subIndex)}
                        >
                          <Ionicons name="trash-outline" size={16} color="#FF3B30" />
                          <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                      
                      <Text style={styles.inputLabel}>Sub Point Title</Text>
                      <TextInput
                        style={[styles.textInput, errors[`subPoint_${index}_${subIndex}`] && styles.inputError]}
                        placeholder="e.g., Examples of Faith in Action"
                        value={subPoint.title || ''}
                        onChangeText={(value) => updateSubPoint(index, subIndex, 'title', value)}
                      />
                      {errors[`subPoint_${index}_${subIndex}`] && (
                        <Text style={styles.errorText}>{errors[`subPoint_${index}_${subIndex}`]}</Text>
                      )}
                      
                      <Text style={styles.inputLabel}>Description (Optional)</Text>
                      <TextInput
                        style={styles.textAreaInput}
                        placeholder="Describe this sub point..."
                        value={subPoint.text || ''}
                        onChangeText={(value) => updateSubPoint(index, subIndex, 'text', value)}
                        multiline
                        numberOfLines={2}
                        textAlignVertical="top"
                      />
                      
                      {/* Bullet Points */}
                      <View style={styles.bulletPointsSection}>
                        <View style={styles.subSectionHeader}>
                          <Text style={styles.subSectionTitle}>Bullet Points (Optional)</Text>
                          <TouchableOpacity 
                            style={styles.addButton}
                            onPress={() => addBulletPoint(index, subIndex)}
                          >
                            <Ionicons name="add" size={16} color="#3D5AF1" />
                            <Text style={styles.addButtonText}>Add Bullet</Text>
                          </TouchableOpacity>
                        </View>
                        
                        {subPoint.sub_points && subPoint.sub_points.map((bullet, bulletIndex) => (
                          <View style={styles.bulletPointForm} key={`bullet_${index}_${subIndex}_${bulletIndex}`}>
                            <View style={styles.bulletPointInput}>
                              <View style={styles.bulletPoint} />
                              <TextInput
                                style={styles.bulletTextInput}
                                placeholder="Enter bullet point text..."
                                value={bullet}
                                onChangeText={(value) => updateBulletPoint(index, subIndex, bulletIndex, value)}
                              />
                              <TouchableOpacity
                                onPress={() => removeBulletPoint(index, subIndex, bulletIndex)}
                              >
                                <Ionicons name="close-circle" size={20} color="#FF3B30" />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
          
          {/* Submit Button */}
          <TouchableOpacity 
            style={[styles.submitButton, (!weekTitle.trim() || isSubmitting) && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!weekTitle.trim() || isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? "Creating Bible Study Week..." : "Create Bible Study Week"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    minHeight: 80,
    marginBottom: 16,
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
  mainPointForm: {
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
  subPointsSection: {
    marginTop: 8,
  },
  subSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  subSectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
  },
  subPointForm: {
    backgroundColor: '#F5F7FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  bulletPointsSection: {
    marginTop: 8,
  },
  bulletPointForm: {
    marginBottom: 8,
  },
  bulletPointInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3D5AF1',
    marginRight: 12,
  },
  bulletTextInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 4,
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
});