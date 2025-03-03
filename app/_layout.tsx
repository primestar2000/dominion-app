import { AuthProvider } from '@/context/auth-context'
import { Slot, Stack } from 'expo-router'
import React from 'react'

const RootLayout = () => {
  return (
    <AuthProvider>
        <Slot />
    </AuthProvider>
  )
}

export default RootLayout