import { EventItem } from "@/utils/event-types";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const renderEventCard = ({ item }: { item: EventItem }) => (
    <TouchableOpacity style={styles.eventCard}>
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
        </View>
        
        <Text style={styles.eventDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.eventCardFooter}>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
          <Link href={{
            pathname: '/(tabs)/(events)/[event]',
            params: {event: item.id}
          }} asChild>
          <TouchableOpacity style={styles.moreInfoButton}>
            <Text style={styles.moreInfoButtonText}>Details</Text>
            <Ionicons name="chevron-forward" size={16} color="#6A0572" />
          </TouchableOpacity>
          </Link>
        </View>
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    eventCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
      },
      eventImage: {
        width: '100%',
        height: 150,
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
      eventDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 10,
      },
      eventCardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
      },
      registerButton: {
        backgroundColor: '#6A0572',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
      },
      registerButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
      },
      moreInfoButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      moreInfoButtonText: {
        color: '#6A0572',
        fontWeight: '500',
        marginRight: 5,
      },
  })
  export default renderEventCard