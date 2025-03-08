import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const sermonLayout = () => {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen name='index' options={{title: 'Bible Study'}} />
        {/* <Stack.Screen name='[study]' options={{title: 'Bible Study'}} /> */}
    </Stack>
  )
}

export default sermonLayout