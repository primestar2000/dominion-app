import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { withSafeAreaInsets } from 'react-native-safe-area-context'
import "../global.css"
type shadowCardProp = {
  style?: any;
  children: any;
  className?: string;
}
const ShadowCard = ({children, className}:shadowCardProp) => {
  return (
    <View className={className}>
     {children}
    </View>
  )
}

export default ShadowCard

const styles = StyleSheet.create({
    frame: {
        overflow: "hidden",
        backgroundColor: "white",
        padding: 1,
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity:  0.17,
        shadowRadius: 3.05,
        elevation: 4
    }
})