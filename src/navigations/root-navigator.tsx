import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { useEffect, useState } from "react";

import AuthNavigator from "./auth-navigation";
import AppNavigator from "./app-navigator";
import EmailVerifiedScreen from "../screens/auth/email-verified-screen";
import LoaderComponent from "@/components/loaderComponent";
import useSession from "@/hooks/useSession";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const { session, isLoading } = useSession();
    const [isReady, setIsReady] = useState(false);
    
    const linking = {
        prefixes: [Linking.createURL("/")],
        config: {
            screens: {
                EmailVerifiedScreen: 'emailVerify',
                // Add other deep link routes here
            }
        }
    };
    
    useEffect(() => {
        console.log("root", session?.user);
        setIsReady(true);
    }, [session]);
    
    if (isLoading || !isReady) {
        return <LoaderComponent isLoading={true} />;
    }
    
    return (
        <NavigationContainer 
            linking={linking}
            fallback={<LoaderComponent isLoading={true} />}
        >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {session?.user ? (
                    <Stack.Screen name="AppNavigator" component={AppNavigator} />
                ) : (
                    <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
                )}
                <Stack.Screen name="EmailVerifiedScreen" component={EmailVerifiedScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;