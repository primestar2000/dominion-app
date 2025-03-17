import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/app/home/home-screen";
import AnnouncementsScreen from "../screens/app/home/annoucement/announcements-screen";
import PrayerRequestsScreen from "../screens/app/home/prayer-request/prayer-request";
import ProfileScreen from "../screens/app/home/profile/profile-screen";
import AnnouncementDetailScreen from "../screens/app/home/annoucement/announcement-detail-screen";
export type HomeStackNavigatorParamList = {
 homeScreen: undefined;
 annoucementsScreen: undefined;
 prayerRequestScreen: undefined;
 profileScreen: undefined;
 annoucementDetailScreen: {announcementId: string}
}
const HomeStackNavigator = () => {
    const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={'homeScreen'} component={HomeScreen} />
            <Stack.Screen name={'annoucementsScreen'} component={AnnouncementsScreen} />
            <Stack.Screen name={'prayerRequestScreen'} component={PrayerRequestsScreen} />
            <Stack.Screen name={'profileScreen'} component={ProfileScreen} />
            <Stack.Screen name={'annoucementDetailScreen'} component={AnnouncementDetailScreen} />
        </Stack.Navigator>
    ) 
}
export default HomeStackNavigator