import { Stack } from "expo-router"

const MediaLayout = () => {
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(audio)" />
            <Stack.Screen name="(video)" />
        </Stack>
    )
}
export default MediaLayout