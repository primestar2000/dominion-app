import { StyleSheet, Text, View, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'


interface defaultButtonProp {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  title?: string;
  disabled?: boolean;
  style?: {}
}
const DefaultButton = ({onPress, title, disabled, style}:defaultButtonProp) => {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.frame, {opacity: disabled ? 0.5 : 1}, style]}>
        <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

export default DefaultButton

const styles = StyleSheet.create({
    frame: {
        width: "100%",
        paddingVertical: 10,
        backgroundColor: "#2b7cda",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: "white",
        fontSize: 15,
        fontWeight: "700",
        textTransform: "capitalize",
    }
})