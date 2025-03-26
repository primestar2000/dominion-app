import { DevotionalItem } from "@/utils/devotional-types";
import { Ionicons } from "@expo/vector-icons";
import { format,  parseISO } from "date-fns";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DevotionalCard = ({item}:{item:DevotionalItem}) => {
      const formatDate = (dateString: string) => {
        try {
          return format(parseISO(dateString), 'MMMM d, yyyy');
        } catch (error) {
          return dateString;
        }
      };
    return(
        <TouchableOpacity 
      style={styles.devotionalCard}
      onPress={() => {
        // Navigate to detail screen
        console.log(`Navigate to devotional: ${item.id}`);
        // navigation.navigate('DevotionalDetail', { devotional: item });
      }}
    >
      <Text style={styles.dateText}>{formatDate(item.date)}</Text>
      <Text style={styles.titleText}>{item.title}</Text>
      
      <View style={styles.verseContainer}>
        <Text style={styles.verseText}>"{item.memory_verse.content}"</Text>
        <Text style={styles.scriptureText}>— {item.memory_verse.scripture}</Text>
      </View>
      
      <Text style={styles.previewText} numberOfLines={2}>
        {item.contents_paragraph[0]}
      </Text>
      
      <View style={styles.readMoreContainer}>
        <Text style={styles.readMoreText}>Read More</Text>
        <Ionicons name="chevron-forward" size={16} color="#6B7280" />
      </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    devotionalCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
      },
      dateText: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 4,
        // fontFamily: 'Roboto-Regular',
      },
      titleText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#3D5AF1',
        marginBottom: 12,
        // fontFamily: 'Roboto-Bold',
      },
      verseContainer: {
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
      },
      verseText: {
        fontSize: 15,
        fontStyle: 'italic',
        color: '#4B5563',
        marginBottom: 4,
        fontFamily: 'Roboto-Regular',
      },
      scriptureText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'right',
        fontFamily: 'Roboto-Medium',
      },
      previewText: {
        fontSize: 15,
        color: '#4B5563',
        lineHeight: 22,
        marginBottom: 12,
        fontFamily: 'Roboto-Regular',
      },
      readMoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      readMoreText: {
        fontSize: 14,
        color: '#3D5AF1',
        fontFamily: 'Roboto-Medium',
      },
})

export default DevotionalCard