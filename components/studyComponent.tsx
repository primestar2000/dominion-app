import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { studyDataProp } from '@/utils/data';
import { TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const StudyComponent = ({ data }: { data: studyDataProp }) => {
    
    useEffect(()=>{
        console.log(data);
    })
  return (
    <Link href={{
        pathname: '/(tabs)/(study)/[study]',
        params: {study: JSON.stringify(data)}
    }} asChild>
    <TouchableOpacity style={styles.frame}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.content}>{data.bibleText}</Text>
      <View style={styles.bottomCont}>
        <View style={styles.bottomLeftCont}>
          <Entypo name='calendar' color={'#007BFF'} size={20} />
          <Text style={styles.timeTitle}>{data.month}</Text>
        </View>
        <Pressable 
          onPress={() => {}} 
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonLabel}>Start Study</Text>
        </Pressable>
      </View>
    </TouchableOpacity>
    </Link>
  );
};

export default StudyComponent;

const styles = StyleSheet.create({
  frame: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 8,
  },
  title: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 6,
    color: '#333',
    textTransform: 'uppercase',
  },
  content: {
    fontSize: 12,
    color: '#555',
    marginVertical: 4,
    lineHeight: 22,
  },
  timeTitle: {
    fontWeight: '600',
    color: '#007BFF',
    fontSize: 14,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonPressed: {
    backgroundColor: '#0056b3',
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  bottomLeftCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
