import { StyleSheet, Text, View, TouchableOpacity, Animated, GestureResponderEvent } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Feather from '@expo/vector-icons/Feather';

type submitButtonProp = {
    onPress: ((event: GestureResponderEvent) => void) | undefined;
    loading: boolean;
}
const SubmitButton = ({ onPress, loading }:submitButtonProp) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // if (loading) {
      // Start spinning animation
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    // } else {
      // rotateAnim.stop();
      // rotateAnim.setValue(0); // Reset rotation when not loading
    // }
  }, [loading, rotateAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableOpacity
      style={styles.button}
      disabled={loading}
      onPress={onPress}
    >
      {loading ? (
        <View>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <Feather name="loader" size={24} color="white" />
          </Animated.View>
        </View>
      ) : (
        <Text style={styles.label}>Submit</Text>
      )}
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    height: 45,
    backgroundColor: 'blue',
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 18,
  },
});
