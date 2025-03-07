import { Redirect, Stack } from "expo-router"

const MediaIndex = () => {
    return (
        <Redirect href={{pathname: "/(tabs)/(media)/(video)"}} />
    )
}
export default MediaIndex;