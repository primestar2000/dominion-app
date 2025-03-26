import { StyleSheet, GestureResponderEvent, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAppSelector } from '@/redux/hooks';

interface floatableButtonProp {
  icon: React.JSX.Element,
  onPress: ((event: GestureResponderEvent) => void) | undefined,
  enableOnlyAdmin?: boolean; 
}
const FloatableButton = ({icon, onPress, enableOnlyAdmin=false}:floatableButtonProp) => {
  const {user} = useAppSelector( store => store.auth)
  if (enableOnlyAdmin && user?.role !== "admin") {
    return null;
  }
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
        bottom: 50,
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