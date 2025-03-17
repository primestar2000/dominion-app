import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/app/home/home-screen";
import EventsScreen from "../screens/app/events/events-screen";
import MediaNavigator from "./media-navigator";
import StudiesScreen from "../screens/app/study/studies-screen";
import StudyNavigator from "./study-navigation";
import HomeStackNavigator from "./home-stack-navigator";
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
        <Tab.Navigator  screenOptions={{headerShown: false}}>
            <Tab.Screen name={'homeStackNavigator'} component={HomeStackNavigator} />
            <Tab.Screen name={'studyNavigator'} component={StudyNavigator} />
            <Tab.Screen name={'eventsScreen'} component={EventsScreen} />
            <Tab.Screen name={'mediaNavigator'} component={MediaNavigator} />
        </Tab.Navigator>
    )
}

export default AppTabNavigation;