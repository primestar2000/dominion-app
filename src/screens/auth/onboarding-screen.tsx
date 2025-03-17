import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import '../../../global.css'
import LottieView from 'lottie-react-native';
import useOnBoarded from '@/hooks/useOnboarded';
import { NavigationProp, useNavigation, useNavigationState } from '@react-navigation/native';
import { AuthStackParamList } from '@/src/navigations/auth-navigation';
const {width, height} = Dimensions.get('window');
const OnBoardingScreen = () => {
  const {setIsOnboarded} = useOnBoarded();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const currentRouteName = useNavigationState((state) => state);
  

    const handleDone = async () => {
      await setIsOnboarded(true); // Ensure onboarding state updates first
      navigation.reset({
        index: 0,
        routes: [{name: "signIn"}]
      }); // Use replace to prevent going back
    };
    
  return (
    <View style={{flex:1}}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        pages={[
            {
            backgroundColor: '#E3F2FD',
            image: (
                  <LottieView style={styles.lottieStyle} source={require('../../../assets/animation/church.json')} autoPlay/>
            ),
            title: 'Welcome to Our Church',
            subtitle: `Experience God's love and connect with a faith-filled community.`,
            },
            {
            backgroundColor: '#F9FAFB',
            image: <LottieView style={styles.lottieStyle} source={require('../../../assets/animation/bible.json')} autoPlay/>,
            title: 'Grow in Faith',
            subtitle: 'Join Bible studies, daily devotionals, and uplifting messages.',
            },
            {
            backgroundColor: '#E1F5FE',
            image: <LottieView style={styles.lottieStyle} source={require('../../../assets/animation/community.json')} autoPlay/>,
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

export default OnBoardingScreen;
