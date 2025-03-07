import { EventItem } from "@/utils/event-types"
import { Link, useRouter } from "expo-router"
import { Image } from "react-native"
import { TouchableOpacity } from "react-native"
import { ScrollView, StyleSheet, Text, View } from "react-native"

interface HomeEventsSectionProp {
    upcomingEvents: EventItem []
}
const HomeEventsSection = ({upcomingEvents}:HomeEventsSectionProp)  => {
    const router = useRouter();
    return(
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <Link href={{
                pathname: '/(tabs)/(events)'
            }} >
                <Text style={styles.seeAllButton}>See All</Text>
            </Link>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {upcomingEvents.map((event) => (
                
                <TouchableOpacity onPress={()=>{
                    router.push({
                        pathname: "/(tabs)/(events)/[event]",
                        params: {event: event.id},
                    })
                }} key={event.id} style={styles.eventCard}>
                <Image source={{ uri: event.image }} style={styles.eventImage} />
                <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDate}>{event.date}</Text>
                    <Text style={styles.eventTime}>{event.time}</Text>
                </View>
                </TouchableOpacity>
                
            ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        paddingHorizontal: 20,
        marginBottom: 25,
      },
      sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
      },
      seeAllButton: {
        color: '#4A90E2',
        fontSize: 14,
      },
      eventCard: {
        width: 200,
        marginRight: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      eventImage: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
      eventInfo: {
        padding: 12,
      },
      eventTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        color: '#333',
      },
      eventDate: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
      },
      eventTime: {
        fontSize: 14,
        color: '#666',
      },
})

export default HomeEventsSection    