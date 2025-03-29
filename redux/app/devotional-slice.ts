import { DevotionalItem } from "@/utils/devotional-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateTypes{ 
    devotionals: DevotionalItem [],
}
const initialState:initialStateTypes = {
    devotionals: [],
}
const devotionalSlice = createSlice({
    name: 'devotionalSlice',
    initialState,
    reducers: {
        addDevotionalState: (state, action:PayloadAction<DevotionalItem>) => {
            state.devotionals.push(action.payload);
        },
        setDevotionalState: (state, action:PayloadAction<DevotionalItem []>) => {
            state.devotionals = action.payload;
        },
        updateDevotionalState: (state, action:PayloadAction<DevotionalItem>) => {
            const updatedDevotional = action.payload;
            const index = state.devotionals.findIndex(devotional => devotional.id === updatedDevotional.id);
            if (index !== -1) { 
                state.devotionals[index] = updatedDevotional;
            }
        },
        deleteDevotionalState: (state, action: PayloadAction<string>) => {
            state.devotionals = state.devotionals.filter( item => item.id !== action.payload);
        }
    }
})

export const {addDevotionalState, setDevotionalState, updateDevotionalState, deleteDevotionalState} = devotionalSlice.actions;
const DevotionalReducer = devotionalSlice.reducer;
export default DevotionalReducer;