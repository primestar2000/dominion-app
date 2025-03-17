import { Slot, Stack } from "expo-router"

const PrivateLayout = () => {
    return (
        <Stack initialRouteName="prayer-request">
            <Stack.Screen name="prayer-request" />
            <Stack.Screen name="(tabs)" />
        </Stack>
    )
}
export default PrivateLayout