import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudiesScreen from "../screens/app/study/studies-screen";
import CreateStudyScreen from "../screens/app/study/createStudy";
import CurrentStudy from "../screens/app/study/study-detail";
import CreateBibleStudyWeekScreen from "../screens/app/study/week/createStudyWeekScreen";
import WeekDetailScreen from "../screens/app/study/week/week-detail-screen";
export type StudyNavigatorParamList = {
    studiesScreen: undefined;
    createStudy: undefined;
    currentStudy: {study :string};
    createStudyWeek: undefined;
    studyWeekDetailScreen: {week: string, studyId: string, index: number};

}
const StudyNavigator = () => {
     const Stack = createNativeStackNavigator<StudyNavigatorParamList>();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={'studiesScreen'} component={StudiesScreen} />
            <Stack.Screen name={'createStudy'} component={CreateStudyScreen} />
            <Stack.Screen name={'currentStudy'} component={CurrentStudy} />
            <Stack.Screen name={'createStudyWeek'} component={CreateBibleStudyWeekScreen} />
            <Stack.Screen name={'studyWeekDetailScreen'} component={WeekDetailScreen} />
        </Stack.Navigator>
    )
}
export default StudyNavigator