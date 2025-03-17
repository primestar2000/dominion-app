import { Stack, useLocalSearchParams } from "expo-router"
import { useEffect } from "react"
import { Text } from "react-native"

const TestScreen = () => {
    const param = useLocalSearchParams()
    useEffect(()=>{
        console.log(param.test)
    })
    return(
        <>
        <Stack screenOptions={{title: 'test'}} />
        <Text>Test</Text>
        </>
    )
}
export default TestScreen