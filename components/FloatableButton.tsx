import { StyleSheet, GestureResponderEvent, TouchableOpacity } from 'react-native'
import React from 'react'

interface floatableButtonProp {
  icon: React.JSX.Element,
  onPress: ((event: GestureResponderEvent) => void) | undefined
}
const FloatableButton = ({icon, onPress}:floatableButtonProp) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.frame}>
      {icon}
    </TouchableOpacity>  
  )
}

export default FloatableButton

const styles = StyleSheet.create({
    frame: {
        position: "absolute",
        zIndex: 10,
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center" ,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})