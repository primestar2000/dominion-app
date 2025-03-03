import { Stack } from "expo-router";

const AuthenticationLayout = () => {

    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="sign-in" />
        </Stack>
    )
}

export default AuthenticationLayout;