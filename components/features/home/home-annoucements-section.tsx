import { AnnouncementType } from "@/utils/announcement-type"
import { Link } from "expo-router"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface homeAnnoucementsSectionProp{
    announcements: AnnouncementType [];
}
const HomeAnnoucementSection = ({announcements}:homeAnnoucementsSectionProp) => {
    return(
        <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Announcements</Text>
                    <Link href={{
                      pathname: "/(tabs)/(home)/(announcements)"
                    }}>
                      <Text style={styles.seeAllButton}>See All</Text>
                    </Link>
                  </View>
                  {announcements.map((announcement) => (
                    <Link href={{pathname: "/(tabs)/(home)/(announcements)/[announcement]", params: {announcement: announcement.id}}} asChild>
                    <TouchableOpacity key={announcement.id} style={styles.announcementCard}>
                      <View style={styles.announcementContent}>
                        <Text style={styles.announcementTitle}>{announcement.title}</Text>
                        <Text style={styles.announcementDescription} numberOfLines={2}>
                          {announcement.content}
                        </Text>
                      </View>
                      <Text style={styles.announcementDate}>{announcement.date}</Text>
                    </TouchableOpacity>
                    </Link>
                  ))}
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
    announcementCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      announcementContent: {
        flex: 1,
        marginRight: 10,
      },
      announcementTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        color: '#333',
      },
      announcementDescription: {
        fontSize: 14,
        color: '#666',
      },
      announcementDate: {
        fontSize: 12,
        color: '#999',
      },
})
export default HomeAnnoucementSection