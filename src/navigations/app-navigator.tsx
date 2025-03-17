import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppTabNavigation from "./app-tab-navigation";
type AppStackParamList = {
    AppTabNavigation: undefined,
}
const AppNavigator = () => {
    const Stack = createNativeStackNavigator<AppStackParamList>();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={'AppTabNavigation'} component={AppTabNavigation} />
        </Stack.Navigator>
    )
}
export default AppNavigator