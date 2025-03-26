import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudiesScreen from "../screens/app/study/studies-screen";
import CurrentStudy from "../screens/app/study/study-detail";
import WeekDetailScreen from "../screens/app/study/week/week-detail-screen";
export type StudyNavigatorParamList = {
    studiesScreen: undefined;
    currentStudy: {study :string};
    studyWeekDetailScreen: {week: string, studyId: string, index: number};

}
const StudyNavigator = () => {
     const Stack = createNativeStackNavigator<StudyNavigatorParamList>();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={'studiesScreen'} component={StudiesScreen} options={{headerShown: true, title: 'Bible Studies'}} />
            <Stack.Screen name={'currentStudy'} component={CurrentStudy} />
            <Stack.Screen name={'studyWeekDetailScreen'} component={WeekDetailScreen} />
        </Stack.Navigator>
    )
}
export default StudyNavigator