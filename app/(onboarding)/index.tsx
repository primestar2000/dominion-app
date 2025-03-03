import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import '../../global.css'
import LottieView from 'lottie-react-native';
import { useAuth } from '@/context/auth-context';
import useOnBoarded from '@/hooks/useOnboarded';
import { router } from 'expo-router';
const {width, height} = Dimensions.get('window');
const index = () => {
  const {setIsOnboarded} = useOnBoarded();
  const handleDone = () => {
    setIsOnboarded(true);
    router.replace('/(app)')
    
  }
  return (
    <View className='flex-1'>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        pages={[
            {
            backgroundColor: '#E3F2FD',
            image: (
                  <LottieView style={styles.lottieStyle} source={require('../../assets/animation/church.json')} autoPlay/>
            ),
            title: 'Welcome to Our Church',
            subtitle: `Experience God's love and connect with a faith-filled community.`,
            },
            {
            backgroundColor: '#F9FAFB',
            image: <LottieView style={styles.lottieStyle} source={require('../../assets/animation/bible.json')} autoPlay/>,
            title: 'Grow in Faith',
            subtitle: 'Join Bible studies, daily devotionals, and uplifting messages.',
            },
            {
            backgroundColor: '#E1F5FE',
            image: <LottieView style={styles.lottieStyle} source={require('../../assets/animation/community.json')} autoPlay/>,
            title: 'Stay Connected',
            subtitle: 'Get church updates, event reminders, and community support.',
            },
            
        ]}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  lottieStyle: {width: width*0.9, height: width}
})

export default index