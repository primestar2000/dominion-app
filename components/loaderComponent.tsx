import { Image, Modal, StyleSheet, Text } from "react-native"
import "../global.css"
import { View } from "react-native"
const LoaderComponent = ({isLoading}:{isLoading: boolean}) => {
    return(
        <Modal visible={isLoading} transparent={true}>
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/images/dcic-logo.png')} />
                <Text style={styles.label}>Loading .....</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: '#00000092',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 80,
        height: 80
    },
    label: {
        color: 'white',
    }
})

export default LoaderComponent