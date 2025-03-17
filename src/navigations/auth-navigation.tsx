import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../screens/auth/sign-in';
import SignUp from '../screens/auth/sign-up';
import { useAppSelector } from '@/redux/hooks';
import useOnBoarded from '@/hooks/useOnboarded';
import OnBoardingScreen from '../screens/auth/onboarding-screen';
import LoaderComponent from '@/components/loaderComponent';
import { useEffect } from 'react';
import EmailVerifiedScreen from '../screens/auth/email-verified-screen';
export type AuthStackParamList = {
    onBoardingScreen: undefined;
    signIn: undefined;
    signUp: undefined;
    // emailVerifiedScreen: undefined;
};
const AuthNavigator = () => {
    
    const Stack = createNativeStackNavigator<AuthStackParamList>();
    const {isAuthenticated} = useAppSelector(store => store.auth)
    
    const {isOnboarded, isLoading} = useOnBoarded();

    if (isLoading) {
        return <LoaderComponent isLoading={isLoading} />
    }
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}
        initialRouteName={!isOnboarded ? "onBoardingScreen" : "signIn"}
        >
            <Stack.Screen name="onBoardingScreen" component={OnBoardingScreen} />
            <Stack.Screen name="signIn" component={SignIn} />
            <Stack.Screen name="signUp" component={SignUp} />
            {/* <Stack.Screen name="emailVerifiedScreen" component={EmailVerifiedScreen} /> */}
        </Stack.Navigator>
    )
}
export default AuthNavigator;