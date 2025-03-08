import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const studyLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{title: 'Bible Study'}} />
        <Stack.Screen name='[study]' options={{title: 'Study'}} />
        <Stack.Screen name='createStudy' options={{headerShown: false}} />
        <Stack.Screen name='(week)/[week]' options={{title: 'Study Week', headerShown: false}}  />
        <Stack.Screen name='(week)/create' options={{title: 'Study Week', headerShown: false}}  />
        <Stack.Screen name='[test]' options={{title: 'Study Week'}} />
    </Stack>
  )
}

export default studyLayout