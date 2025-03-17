import { useAuth } from "@/context/auth-context";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

const AuthenticationLayout = () => {
    const {isAuthenticated} = useAuth();
    const router = useRouter();
 useEffect(() => {
    console.log('from Auth layouts.', isAuthenticated);

  }, [isAuthenticated]);
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="sign-in" />
        </Stack>
    )
}

export default AuthenticationLayout;