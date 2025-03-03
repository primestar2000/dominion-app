import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

const Tags = ({ data }:{data:any}) => {
    
  return (
    <Pressable style={[styles.frame, {
      backgroundColor: data.active ? "blue" : "white",
    }]}>
      <Text style={{ color: data.active ? "white" : "black" }}>{data.title}</Text>
    </Pressable>
  );
};

export default Tags;

const styles = StyleSheet.create({
  frame: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center', // Center text horizontally
  },
});
