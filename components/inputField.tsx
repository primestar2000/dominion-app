import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, TextInputProps, StatusBar } from 'react-native';
import React, { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';

interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: 'text' | 'password';
  onChangeText: (text: string) => void;
  name?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, type = 'text', onChangeText, name, error }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(type === 'password');

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <KeyboardAvoidingView behavior='padding'>
        <View style={styles.field}>
          <TextInput
            onChangeText={onChangeText}
            style={styles.inputSection}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
          />
          {type === 'password' && (
            <TouchableOpacity
              style={styles.toggleView}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            >
              <Entypo
                style={styles.eyeIcon}
                name={secureTextEntry ? 'eye' : 'eye-with-line'}
                size={24}
                color='black'
              />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
      <StatusBar barStyle={'dark-content'} />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#cbcaca',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSection: {
    flex: 1,
  },
  label: {
    marginVertical: 2,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#615f5f',
  },
  toggleView: {
    padding: 5,
  },
  eyeIcon: {
    alignSelf: 'center',
  },
});