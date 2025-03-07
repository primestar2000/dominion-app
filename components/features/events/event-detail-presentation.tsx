import { Ionicons } from "@expo/vector-icons"
import { StyleSheet } from "react-native"
import { Text } from "react-native"
import { TouchableOpacity, View } from "react-native"
import { Image } from "react-native"

type EventItem = {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    category: string;
    image: any;
    isFeatured?: boolean;
  };
const EventDetailPresentation = ({item}:{item:EventItem}) => {
    return(
    <View style={styles.eventCard}>
      <Image source={item.image} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <TouchableOpacity style={styles.saveButton}>
            <Ionicons name="bookmark-outline" size={22} color="#6A0572" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.eventMetaContainer}>
          <View style={styles.eventMeta}>
            <Ionicons name="calendar-outline" size={16} color="#6A0572" />
            <Text style={styles.eventMetaText}>{item.date}</Text>
          </View>
          <View style={styles.eventMeta}>
            <Ionicons name="time-outline" size={16} color="#6A0572" />
            <Text style={styles.eventMetaText}>{item.time}</Text>
          </View>
          <View style={styles.eventMeta}>
            <Ionicons name="location-outline" size={16} color="#6A0572" />
            <Text style={styles.eventMetaText}>{item.location}</Text>
          </View>
          <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.eventDescription} >
            {item.description}
            </Text>
        </View>
        
        
        <View style={styles.eventCardFooter}>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
    eventCard: {
        backgroundColor: 'white',
 
        overflow: 'hidden',
        flex:1
      },
      eventImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
      },
      eventContent: {
        padding: 15,
      },
      eventHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
      },
      eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        marginRight: 10,
      },
      saveButton: {
        padding: 5,
      },
      eventMetaContainer: {
        marginBottom: 10,
      },
      eventMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      },
      eventMetaText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#666',
      },
      descriptionTitle: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20
      },
      eventDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 10,
      },
      eventCardFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,

      },
      registerButton: {
        backgroundColor: '#6A0572',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        width: '100%',
      },
      registerButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center'
      },

})

export default EventDetailPresentation