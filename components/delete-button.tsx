import { useAppSelector } from "@/redux/hooks"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, View } from "react-native"

interface ComponentProps {
    onPress?: (event: GestureResponderEvent) => void | undefined
    title?: string;
    enableOnlyAdmin?: boolean;
}

const DeleteButton = ({ onPress, title = "Delete", enableOnlyAdmin }: ComponentProps) => {
        const {user} = useAppSelector( store => store.auth)
          if (enableOnlyAdmin && user?.role !== "admin") {
            return null;
          }
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[
                styles.container, styles.containerPressed
            ]}
            activeOpacity={0.7}
        >
            <View style={styles.iconContainer}>
                <Ionicons name="trash-outline" size={18} color="#ff3b30" />
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
        backgroundColor: "rgba(255, 59, 48, 0.12)",
        flex: 1,
        justifyContent: "center",
    },
    containerPressed: {
        backgroundColor: "rgba(255, 59, 48, 0.2)",
    },
    iconContainer: {
        marginRight: 6,
    },
    title: {
        color: "#ff3b30",
        fontSize: 14,
        fontWeight: "500",
    }
})

export default DeleteButton