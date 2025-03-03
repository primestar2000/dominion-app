import { StyleSheet, Text, View, TextInput, ScrollView, Alert, Platform } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import DefaultButton from '@/components/DefaultButton';
import Editor from '@/components/dom-components/rich-editor/rich-editor';


interface FormData {
  title: string;
  month: string;
  year: string;
  bibleText: string;
  content: string;
  weeks: any[];
}

interface Errors {
  title?: string;
  month?: string;
  year?: string;
  bibleText?: string;
  content?: string;
}

// interface CreateStudyProps {
//   navigation: StackNavigationProp<any>;
// }

const months = [
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];

const CreateStudy = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    month: '',
    year: '',
    bibleText: '',
    content: '',
    weeks: [],
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // if (errors[field]) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     [field]: undefined,
    //   }));
    // }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.month) newErrors.month = 'Month is required';
    if (!formData.year.trim() || isNaN(Number(formData.year)) || formData.year.length !== 4) {
      newErrors.year = 'Please enter a valid 4-digit year';
    }
    if (!formData.bibleText.trim()) newErrors.bibleText = 'Bible text is required';
    if (!formData.content.trim()) newErrors.content = 'Study content is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async () => {
  //   if (!validateForm()) {
  //     Alert.alert('Error', 'Please fill in all required fields correctly.');
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     const studyCollection = collection(db, 'study');
  //     const res = await addDoc(studyCollection, formData);
  //     navigation.navigate('CurrentStudy', { docData: res });
  //     Alert.alert('Success', 'Bible study created successfully!');
  //     setFormData({ title: '', month: '', year: '', bibleText: '', content: '', weeks: [] });
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View style={styles.frame}>
      {/* <Text style={styles.pageTitle}>Create Bible Study</Text> */}
      <ScrollView>
        <View style={styles.MainForm}>
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            placeholder='Enter Title'
            value={formData.title}
            onChangeText={(value) => handleInputChange('title', value)}
          />
          <Picker style={styles.pickerWrapper} selectedValue={formData.month} onValueChange={(value) => handleInputChange('month', value)}>
            <Picker.Item label='Select a month' value='' />
            {months.map((month) => (
              <Picker.Item key={month.value} label={month.label} value={month.label} />
            ))}
          </Picker>
          <TextInput
            style={[styles.input, errors.year && styles.inputError]}
            placeholder='Enter Year (YYYY)'
            keyboardType='numeric'
            value={formData.year}
            onChangeText={(value) => handleInputChange('year', value)}
          />
          <TextInput
            style={[styles.input, errors.bibleText && styles.inputError]}
            placeholder='Enter Bible Reference'
            value={formData.bibleText}
            onChangeText={(value) => handleInputChange('bibleText', value)}
          />
          {/* <RichTextEditor
            placeholder='Enter your study content here...'
            onChangeText={(text) => handleInputChange('content', text)}
            initialValue={formData.content}
          /> */}
          <Editor  dom={{ scrollEnabled: false, style: {height: 200} }} />
        </View>
      </ScrollView>
      <View style={styles.buttonFrame}>
        <DefaultButton disabled={loading} title={loading ? 'Loading ...' : 'Create Study'} />
      </View>
    </View>
  );
};

export default CreateStudy;

const styles = StyleSheet.create({
  frame: { flex: 1, backgroundColor: 'white' },
  MainForm: { padding: 16, gap: 20 },
  buttonFrame: { padding: 16, flexDirection: 'row', justifyContent: 'center' },
  pageTitle: { fontSize: 24, fontWeight: '600', textAlign: 'center', margin: 16, color: '#2563eb' },
  input: { borderWidth: 1, borderColor: '#d1d5db', padding: 12, borderRadius: 8, fontSize: 16 },
  inputError: { borderColor: '#ef4444' },
  pickerWrapper: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'gray'
  }
});
