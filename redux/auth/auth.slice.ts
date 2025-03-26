import { createSlice } from "@reduxjs/toolkit";
import RegisterUserThunk from "./register-user-thunk";
import { User } from "@supabase/supabase-js";
import getUserProfileThunk from "./user-profile-thunk";
import { EventItem } from "@/utils/event-types";
import { userProfileType } from "@/utils/user-type";

interface initialStateType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: Partial<userProfileType> | null;
    
}
const initialState:initialStateType = {
    isAuthenticated: true,
    isLoading: false,
    user: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
        // .addCase(RegisterUserThunk.pending, (state) => {
        //     // state.isLoading = true;
        // })
        .addCase(RegisterUserThunk.fulfilled, (state, action)=>{
            const {id} = action.payload as User
        })
        .addCase(getUserProfileThunk.fulfilled, (state, action)=>{
            // const {address, church_branch, name, phone, profile_picture, roles, user_id} = action.payload as UserReponseType;
            state.user = action.payload as userProfileType
        })
    },
});

// export all actions
export const {logoutUser} = authSlice.actions;
// export slice reducer
const authReducer = authSlice.reducer; 
export default authReducer;