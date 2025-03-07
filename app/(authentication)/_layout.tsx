import { useAuth } from "@/context/auth-context";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

const AuthenticationLayout = () => {
    const {isAuthenticated} = useAuth();
    const router = useRouter();
useEffect(()=>{
    if (isAuthenticated) {
        router.replace('../(tabs)')
    }
},[isAuthenticated])
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="sign-in" />
        </Stack>
    )
}

export default AuthenticationLayout;