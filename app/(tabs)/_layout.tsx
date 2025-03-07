import { View, Text, useColorScheme, Platform, SafeAreaView } from 'react-native'
import { Tabs, useRouter } from 'expo-router'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { HapticTab } from '@/components/HapticTab'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import TabBarBackground from '@/components/ui/TabBarBackground';
import { IconSymbol } from '@/components/ui/IconSymbol'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import TopNav from '@/components/TopNav'
import { useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
const menuTab = () => {
      const colorScheme = useColorScheme();
      const router = useRouter();
      const {isAuthenticated} = useAuth()
      useEffect(()=>{
        if (!isAuthenticated) {
          router.replace('../(authentication)')
        }
      },[isAuthenticated])
  return (
    <Tabs initialRouteName={"(home)"} screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: [Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
        {
          height: 70,
          paddingTop: 8,
          paddingHorizontal: 10
        }
      ],
        
        }}>
        <Tabs.Screen name='(home)' 
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => {
          return focused ? (
              <Ionicons name="home" size={25} color={color} />

          ) : (
            <Ionicons name="home-outline" size={25} color={color} />
          );
        },
        
      }} />
        <Tabs.Screen name='(study)' 
          options={{
            title: 'Bible Study',
            tabBarIcon: ({ color, size, focused }) => <MaterialCommunityIcons name="book-open-page-variant" size={25} color={color} />,
        }} />
        {/* <Tabs.Screen name='(sermon)' 
          options={{
            title: 'Sermon',
            tabBarIcon: ({ color, size, focused }) => <MaterialIcons name="perm-media" size={25} color={color} />,
        }} /> */}
        <Tabs.Screen name='(media)' 
          options={{
            title: 'Media',
            tabBarIcon: ({ color, size, focused }) => <MaterialIcons name="perm-media" size={25} color={color} />,
        }} />
        <Tabs.Screen name='(events)' 
          options={{
            title: 'Events',
            tabBarIcon: ({ color, size, focused }) => <Ionicons name="calendar" size={25} color={color} />,
        }} />
        {/* <Tabs.Screen name='(announcements)' options={{href: null}} /> */}
    </Tabs>
  )
}

export default menuTab