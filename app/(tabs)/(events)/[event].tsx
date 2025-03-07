import EventDetailPresentation from "@/components/features/events/event-detail-presentation"
import { eventsDataTest } from "@/utils/data"
import { useLocalSearchParams } from "expo-router"
import { useEffect } from "react"
import { StyleSheet } from "react-native"
import { Text } from "react-native"
import { StatusBar, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const EventDetail = () => {
    const param = useLocalSearchParams()
    const eventData = eventsDataTest.find(item => item.id === param.event)
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"dark-content"} />
            <View style={styles.innerContainer}>
            </View>
           {eventData != undefined && <EventDetailPresentation item={eventData} />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {

    }

})

export default EventDetail