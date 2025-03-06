import useOnBoarded from '@/hooks/useOnboarded';
import { router, Stack } from 'expo-router';
import { useEffect } from 'react';

export default function OnboardingLayout() {
  const { isOnboarded } = useOnBoarded();
  useEffect(()=>{
    // if (isOnboarded === true) {
    //   router.replace('/(tabs)/home-screen')
    // }
  },[isOnboarded])
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="profile-setup"
        options={{
          title: 'Setup Profile',
        }}
      /> */}
    </Stack>
  );
}
