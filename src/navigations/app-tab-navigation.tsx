import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/app/home/home-screen";
import EventsScreen from "../screens/app/events/events-screen";
import MediaNavigator from "./media-navigator";
import StudiesScreen from "../screens/app/study/studies-screen";
import StudyNavigator from "./study-navigation";
import HomeStackNavigator from "./home-stack-navigator";
import { BookOpenTextIcon, CalendarRangeIcon, House, LucideImagePlay } from "lucide-react-native";
type AppTabNavigationParamList = {
    homeStackNavigator: undefined;
    eventsScreen: undefined;
    mediaNavigator: undefined;
    studyNavigator: undefined;
}
const AppTabNavigation = () => {
    // const Stack = createNativeStackNavigator<AppTabNavigationParamList>();
    const Tab = createBottomTabNavigator<AppTabNavigationParamList>();
    return(
        <Tab.Navigator  screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#3D5AF1'

        }}>
            <Tab.Screen options={{
                title: 'Home',
                tabBarIcon: ({color}) => (
                    <House color={color} />
                ),
            }} name={'homeStackNavigator'} component={HomeStackNavigator} />
            <Tab.Screen options={{
                title: 'Bible Study',
                tabBarIcon: ({color}) => (
                    <BookOpenTextIcon color={color} />
                ),
            }} name={'studyNavigator'} component={StudyNavigator} />
            <Tab.Screen options={{
                title: 'Events',
                tabBarIcon: ({color}) => (
                    <CalendarRangeIcon color={color} />
                ),
            }} name={'eventsScreen'} component={EventsScreen} />
            <Tab.Screen options={{
                title: 'Media',
                tabBarIcon: ({color}) => (
                    <LucideImagePlay color={color} />
                ),
            }} name={'mediaNavigator'} component={MediaNavigator} />
        </Tab.Navigator>
    )
}

export default AppTabNavigation;