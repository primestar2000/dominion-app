import { useAppSelector } from "@/redux/hooks";
import { Feather } from "@expo/vector-icons"
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, View } from "react-native"

interface ComponentProps {
    onPress?: (event: GestureResponderEvent) => void | undefined
    title?: string;
    enableOnlyAdmin?: boolean; 
}

const EditButton = ({ onPress, title = "Edit", enableOnlyAdmin }: ComponentProps) => {
    const {user} = useAppSelector( store => store.auth)
      if (enableOnlyAdmin && user?.role !== "admin") {
        return null;
      }
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[
                styles.container,styles.containerPressed
            ]}
            activeOpacity={0.7}
        >
            <View style={styles.iconContainer}>
                <Feather name="edit-2" size={18} color="#3D5AF1" />
            </View>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: "rgba(61, 90, 241, 0.12)",
        flex: 1,
        justifyContent: "center",
    },
    containerPressed: {
        backgroundColor: "rgba(61, 90, 241, 0.2)",
    },
    iconContainer: {
        marginRight: 6,
    },
    title: {
        color: "#3D5AF1",
        fontSize: 14,
        fontWeight: "500",
    }
})

export default EditButton