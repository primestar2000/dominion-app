import { Stack } from "expo-router"

const AnnouncementLayout = () => {
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index"   options={{title: 'Announcements', headerShown: true}} />
            <Stack.Screen name="[announcement]"   options={{title: 'Announcements', headerShown: false}} />
        </Stack>
    )
}

export default AnnouncementLayout