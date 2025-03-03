import { View, Text, useColorScheme, Platform, SafeAreaView } from 'react-native'
import { Tabs } from 'expo-router'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { HapticTab } from '@/components/HapticTab'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import TabBarBackground from '@/components/ui/TabBarBackground';
import { IconSymbol } from '@/components/ui/IconSymbol'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import TopNav from '@/components/TopNav'
const menuTab = () => {
      const colorScheme = useColorScheme();
  return (
    <Tabs screenOptions={{
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
        <Tabs.Screen name='home-screen' 
        options={{
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
        <Tabs.Screen name='sermon-screen' 
          options={{
            title: 'Sermon',
            tabBarIcon: ({ color, size, focused }) => <MaterialIcons name="perm-media" size={25} color={color} />,
        }} />
        <Tabs.Screen name='profile-screen' 
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size, focused }) => <Ionicons name="person" size={25} color={color} />,
        }} />
 
    </Tabs>
  )
}

export default menuTab