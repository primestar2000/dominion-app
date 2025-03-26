import React, { useState } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

// Type definition for devotional item
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

type CreateDevotionalModalProps = {
  onClose: () => void;
  onSave: (devotional: DevotionalItem) => void;
};

const CreateDevotionalModal = ({ onClose, onSave }: CreateDevotionalModalProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [verseContent, setVerseContent] = useState("");
  const [verseScripture, setVerseScripture] = useState("");
  const [contentParagraphs, setContentParagraphs] = useState<string[]>([""]);
  const [foodForThought, setFoodForThought] = useState("");
  const [prayer, setPrayer] = useState("");

  // Function to update a paragraph at a specific index
  const updateParagraph = (text: string, index: number) => {
    const newParagraphs = [...contentParagraphs];
    newParagraphs[index] = text;
    setContentParagraphs(newParagraphs);
  };

  // Function to add a new paragraph
  const addParagraph = () => {
    setContentParagraphs([...contentParagraphs, ""]);
  };

  // Function to remove a paragraph
  const removeParagraph = (index: number) => {
    if (contentParagraphs.length > 1) {
      const newParagraphs = [...contentParagraphs];
      newParagraphs.splice(index, 1);
      setContentParagraphs(newParagraphs);
    }
  };

  // Function to handle date change
  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Validate form
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }
    
    if (!verseContent.trim() || !verseScripture.trim()) {
      Alert.alert("Error", "Please enter a memory verse and scripture reference");
      return;
    }
    
    // Filter out empty paragraphs
    const filteredParagraphs = contentParagraphs.filter(p => p.trim().length > 0);
    if (filteredParagraphs.length === 0) {
      Alert.alert("Error", "Please enter at least one content paragraph");
      return;
    }

    // Create the new devotional
    const newDevotional: DevotionalItem = {
      id: new Date().getTime().toString(), // Generate a unique ID
      title: title.trim(),
      date: format(date, 'yyyy-MM-dd'),
      memory_verse: {
        content: verseContent.trim(),
        scripture: verseScripture.trim()
      },
      contents_paragraph: filteredParagraphs,
      food_for_thought: foodForThought.trim(),
      prayer: prayer.trim()
    };

    onSave(newDevotional);
    onClose();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create New Devotional</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Title Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter devotional title"
              maxLength={100}
            />
          </View>

          {/* Date Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity 
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.datePickerText}>{format(date, 'MMMM d, yyyy')}</Text>
              <Ionicons name="calendar-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
            {/* {showDatePicker && ( */}
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            {/* )} */}
          </View>

          {/* Memory Verse Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Memory Verse</Text>
            <TextInput
              style={styles.input}
              value={verseContent}
              onChangeText={setVerseContent}
              placeholder="Enter memory verse content"
              multiline
              maxLength={200}
            />
          </View>

          {/* Scripture Reference Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Scripture Reference</Text>
            <TextInput
              style={styles.input}
              value={verseScripture}
              onChangeText={setVerseScripture}
              placeholder="E.g., John 3:16"
              maxLength={50}
            />
          </View>

          {/* Content Paragraphs */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Content Paragraphs</Text>
            {contentParagraphs.map((paragraph, index) => (
              <View key={index} style={styles.paragraphContainer}>
                <TextInput
                  style={styles.paragraphInput}
                  value={paragraph}
                  onChangeText={(text) => updateParagraph(text, index)}
                  placeholder={`Paragraph ${index + 1}`}
                  multiline
                  maxLength={500}
                />
                {contentParagraphs.length > 1 && (
                  <TouchableOpacity 
                    style={styles.removeParagraphButton}
                    onPress={() => removeParagraph(index)}
                  >
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <TouchableOpacity 
              style={styles.addParagraphButton}
              onPress={addParagraph}
            >
              <Ionicons name="add-circle-outline" size={20} color="#4B5563" />
              <Text style={styles.addParagraphText}>Add Paragraph</Text>
            </TouchableOpacity>
          </View>

          {/* Food for Thought Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Food for Thought</Text>
            <TextInput
              style={styles.input}
              value={foodForThought}
              onChangeText={setFoodForThought}
              placeholder="Enter a thought-provoking question"
              multiline
              maxLength={200}
            />
          </View>

          {/* Prayer Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Prayer</Text>
            <TextInput
              style={styles.textAreaInput}
              value={prayer}
              onChangeText={setPrayer}
              placeholder="Enter a prayer"
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Create Devotional</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFF"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB"
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937"
  },
  closeButton: {
    padding: 4
  },
  scrollView: {
    flex: 1
  },
  formContainer: {
    padding: 16
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1F2937",
    backgroundColor: "#F9FAFB"
  },
  textAreaInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1F2937",
    backgroundColor: "#F9FAFB",
    height: 120,
    textAlignVertical: "top"
  },
  datePickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F9FAFB"
  },
  datePickerText: {
    fontSize: 16,
    color: "#1F2937"
  },
  paragraphContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  paragraphInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1F2937",
    backgroundColor: "#F9FAFB"
  },
  removeParagraphButton: {
    marginLeft: 10,
    padding: 8
  },
  addParagraphButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    alignSelf: "flex-start"
  },
  addParagraphText: {
    marginLeft: 6,
    fontSize: 16,
    color: "#4B5563"
  },
  submitButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  }
});

export default CreateDevotionalModal;