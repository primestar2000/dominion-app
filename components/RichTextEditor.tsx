import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInputSelectionChangeEventData,
  NativeSyntheticEvent,
  TextInputKeyPressEventData
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface RichTextEditorProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  initialValue?: string;
  containerStyle?: object;
  inputStyle?: object;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  placeholder = 'Start typing...',
  onChangeText,
  initialValue = '',
  containerStyle = {},
  inputStyle = {},
}) => {
  const [content, setContent] = useState<string>(initialValue);
  const [selection, setSelection] = useState<{ start: number; end: number }>({ start: 0, end: 0 });
  const [listCounter, setListCounter] = useState<number>(1);
  const inputRef = useRef<TextInput>(null);

  const getLineInfo = () => {
    const lines = content.split('\n');
    let currentLineIndex = 0;
    let charCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].length + 1; // +1 for newline character
      if (charCount + lineLength > selection.start) {
        currentLineIndex = i;
        break;
      }
      charCount += lineLength;
    }

    return {
      lines,
      currentLineIndex,
      isNumberedList: /^\d+\./.test(lines[currentLineIndex] || ''),
    };
  };

  const insertText = (textToInsert: string) => {
    const newText = content.substring(0, selection.start) + textToInsert + content.substring(selection.end);
    setContent(newText);
    onChangeText?.(newText);

    const newPosition = selection.start + textToInsert.length;
    setTimeout(() => {
      inputRef.current?.setNativeProps({
        selection: { start: newPosition, end: newPosition },
      });
    }, 10);
  };

  const handleFormat = (type: 'bold' | 'italic' | 'bullet' | 'number') => {
    switch (type) {
      case 'bold':
        insertText('**bold**');
        break;
      case 'italic':
        insertText('_italic_');
        break;
      case 'bullet':
        insertText('\n• ');
        break;
      case 'number':
        const { lines } = getLineInfo();
        let number = 1;
        for (let i = 0; i < lines.length; i++) {
          if (/^\d+\./.test(lines[i])) {
            number++;
          }
        }
        insertText(`\n${number}. `);
        setListCounter(number + 1);
        break;
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Enter' || e.nativeEvent.key === 'Return') {
      const { lines, currentLineIndex, isNumberedList } = getLineInfo();
      
      if (isNumberedList) {
        e.preventDefault();
        insertText(`\n${listCounter}. `);
        setListCounter(listCounter + 1);
        return;
      }

      if (lines[currentLineIndex].startsWith('• ')) {
        insertText('\n• ');
        return;
      }
    }
  };

  const handleChangeText = (text: string) => {
    setContent(text);
    onChangeText?.(text);

    const matches = text.match(/^\d+\./gm);
    if (matches) {
      const numbers = matches.map(m => parseInt(m));
      setListCounter(Math.max(...numbers) + 1);
    } else {
      setListCounter(1);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView horizontal style={styles.toolbar}>
        <TouchableOpacity onPress={() => handleFormat('bold')} style={styles.toolbarButton}>
          <MaterialIcons name="format-bold" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFormat('italic')} style={styles.toolbarButton}>
          <MaterialIcons name="format-italic" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFormat('bullet')} style={styles.toolbarButton}>
          <MaterialIcons name="format-list-bulleted" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFormat('number')} style={styles.toolbarButton}>
          <MaterialIcons name="format-list-numbered" size={24} color="#000" />
        </TouchableOpacity>
      </ScrollView>

      <TextInput
        ref={inputRef}
        style={[styles.input, inputStyle]}
        multiline
        placeholder={placeholder}
        value={content}
        onChangeText={handleChangeText}
        onSelectionChange={(event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
          setSelection(event.nativeEvent.selection);
        }}
        onKeyPress={handleKeyPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  toolbar: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  toolbarButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
    minHeight: 200,
  },
});

export default RichTextEditor;
