
import { Stack } from 'expo-router'

const studyLayout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='[event]' options={{title: 'Bible Study'}} />
        <Stack.Screen name='index' options={{title: 'Events'}} />
    </Stack>
  )
}

export default studyLayout