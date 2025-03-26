import { useAppSelector } from "@/redux/hooks";
import { Ionicons } from "@expo/vector-icons"
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native"

interface ElementProp {
    onPress: ((event: GestureResponderEvent) => void);
    enableOnAdmin?: boolean;
}
const AddButtonCircle = ({onPress, enableOnAdmin}:ElementProp) => {
    const role = useAppSelector(store => store.auth.user?.role)
    if(enableOnAdmin && role !== "admin" ){
        return null;    }
    return(
        <TouchableOpacity 
        style={styles.addButton}
        onPress={onPress}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    
  addButton: {
    backgroundColor: '#3D5AF1',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddButtonCircle