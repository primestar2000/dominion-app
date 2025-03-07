
import { Stack } from 'expo-router'

const studyLayout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='index' options={{title: 'Events'}} />
        <Stack.Screen name='[event]' options={{title: 'Bible Study'}} />
    </Stack>
  )
}

export default studyLayout