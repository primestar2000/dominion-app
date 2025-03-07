import { Stack } from "expo-router"

const homeLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="home-screen" options={{headerShown: false}} />
            <Stack.Screen name="(announcements)" options={{headerShown: false}} />
        </Stack>
    )
}
export default homeLayout