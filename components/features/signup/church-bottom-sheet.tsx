import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { useRef } from "react";
import { Modal, TouchableOpacity } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const ChurchButtonSheet = ({onClose}:{onClose: ()=>void}) => {
        const bottomSheetRef = useRef(null);
    return(
        <Modal transparent={true} animationType="fade">
            <GestureHandlerRootView style={styles.bottomSheetContainer}>
                <TouchableOpacity 
                    style={styles.sheetOverlay}
                    activeOpacity={1}
                    onPress={() => onClose()}
                />
                <BottomSheet
                    ref={bottomSheetRef}
                    onChange={handleSheetChanges}
                    snapPoints={['40%']}
                    enablePanDownToClose={true}
                    onClose={() => onClose()}
                >
                    <BottomSheetView style={styles.sheetContent}>
                        <Text style={styles.sheetTitle}>Select Church Branch</Text>
                        {/* <ScrollView style={styles.branchList}>
                            {churchBranches.map((branch, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.branchItem}
                                    onPress={() => selectBranch(branch)}
                                >
                                    <Text style={styles.branchItemText}>{branch.name}</Text>
                                    {selectedBranch === branch.name && (
                                        <Ionicons name="checkmark" size={20} color="#3b82f6" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView> */}
                    </BottomSheetView>
                </BottomSheet>
            </GestureHandlerRootView>
        </Modal>
    )
}