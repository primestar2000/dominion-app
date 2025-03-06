import { MediaType, SermonItem } from "@/utils/sermon-types";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const renderSermonCard = ({ item, mediaType }: { item: SermonItem, mediaType: MediaType }) => {
    const thumbnail = mediaType === 'video' ? item.videoThumbnail : item.audioThumbnail;
    const link = mediaType === 'video' ? item.videoLink : item.audioLink;
    const fileSize = mediaType === 'video' ? item.fileSize?.video : item.fileSize?.audio;

    return (
        <Link href={{
              pathname: '/(tabs)/(sermon)/sermon-detail',
              params: {data: JSON.stringify(item as SermonItem)}
          }} asChild>
      <TouchableOpacity style={styles.sermonCard}>
        <View style={styles.sermonCardHeader}>
          {item.isNew && <View style={styles.newBadge}><Text style={styles.newBadgeText}>New</Text></View>}
          <Image source={thumbnail} style={styles.sermonThumbnail} />
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name={mediaType === 'video' ? "play" : "headset"} size={30} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.sermonContent}>
          <Text style={styles.sermonTitle}>{item.title}</Text>
          
          <View style={styles.sermonMeta}>
            <View style={styles.sermonMetaItem}>
              <Ionicons name="person-outline" size={14} color="#6A0572" />
              <Text style={styles.sermonMetaText}>{item.speaker}</Text>
            </View>
            <View style={styles.sermonMetaItem}>
              <Ionicons name="calendar-outline" size={14} color="#6A0572" />
              <Text style={styles.sermonMetaText}>{item.date}</Text>
            </View>
          </View>
          
          <Text style={styles.sermonDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          <View style={styles.sermonFooter}>
            <View style={styles.sermonActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons 
                  name={mediaType === 'video' ? "play-circle-outline" : "download-outline"} 
                  size={20} 
                  color="#6A0572" 
                />
                <Text style={styles.actionButtonText}>
                  {mediaType === 'video' ? 'Watch' : 'Download'}
                </Text>
              </TouchableOpacity>
              {mediaType === 'audio' && (
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="share-outline" size={20} color="#6A0572" />
                  <Text style={styles.actionButtonText}>Share</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.sermonStats}>
              <Ionicons name={mediaType === 'video' ? "eye-outline" : "download-outline"} size={16} color="#888" />
              <Text style={styles.statsText}>
                {mediaType === 'video' ? item.views : fileSize}
              </Text>
            </View>
          </View>
          
          {item.series && (
            <View style={styles.seriesBadge}>
              <Text style={styles.seriesBadgeText}>{item.series}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      </Link>
    );
  };

  const styles = StyleSheet.create({
    sermonCard: {
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
      sermonCardHeader: {
        position: 'relative',
      },
      sermonThumbnail: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
      },
      newBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#FF6B6B',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 15,
        zIndex: 10,
      },
      newBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
      },
      playButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -25,
        marginLeft: -25,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(106, 5, 114, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      sermonContent: {
        padding: 15,
      },
      sermonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
      },
      sermonMeta: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      sermonMetaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      sermonMetaText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#666',
      },
      sermonDescription: {
        color: '#666',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
      },
      sermonFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      sermonActions: {
        flexDirection: 'row',
      },
      actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      actionButtonText: {
        marginLeft: 5,
        color: '#6A0572',
        fontSize: 14,
      },
      sermonStats: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      statsText: {
        marginLeft: 5,
        color: '#888',
        fontSize: 14,
      },
      seriesBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(106, 5, 114, 0.1)',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 15,
      },
      seriesBadgeText: {
        color: '#6A0572',
        fontSize: 12,
        fontWeight: '500',
      },
  })

  export default renderSermonCard