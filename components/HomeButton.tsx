import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ShadowCard from './shadowCard'
import "../global.css"
type homeButtonProp = {
    title: string;
    icon: React.JSX.Element
}
const HomeButton = ({title, icon}:homeButtonProp) => {

  return (
        <TouchableOpacity  style={styles.iconContainer}>
                <ShadowCard >
                    {icon}
                </ShadowCard>
                <Text>{title}</Text>
        </TouchableOpacity>
  )
}

export default HomeButton

const styles = StyleSheet.create({
    iconContainer: {
        width: "100%",
        height: 100,
        flex:1,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
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