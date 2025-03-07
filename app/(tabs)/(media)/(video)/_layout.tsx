import { Stack } from "expo-router"

const VideoLayout = () => {
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" />
            <Stack.Screen name="[video]" />
            <Stack.Screen name="create" />
        </Stack>
    )
}
export default VideoLayout