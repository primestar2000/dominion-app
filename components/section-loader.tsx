import { ActivityIndicator, Text, View } from "react-native"

const SectionLoader = () => {
    return (
        <View style={{ marginTop: 50}}>
            <ActivityIndicator size="large" color="#0000ff"  />
        </View>
    )
}

export default SectionLoader