import { Stack } from "expo-router"

const AudioLayout = () => {
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" />
            <Stack.Screen name="[audio]" />
            <Stack.Screen name="create" />
        </Stack>
    )
}
export default AudioLayout;