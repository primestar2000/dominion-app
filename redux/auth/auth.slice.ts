import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
    isAuthenticated: boolean;
}
const initialState:initialStateType = {
    isAuthenticated: true,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    logoutUser: (state) => {
        state.isAuthenticated = false;
    }
    },
});

// export all actions
export const {logoutUser} = authSlice.actions;
// export slice reducer
const authReducer = authSlice.reducer; 
export default authReducer;