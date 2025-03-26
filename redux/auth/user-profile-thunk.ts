import { supabase } from "@/utils/lib/superbase";
import { ResponceMessageType } from "@/utils/other-types";
import { userProfileType} from "@/utils/user-type";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getUserProfileThunk = createAsyncThunk<userProfileType, string,  { rejectValue: ResponceMessageType | string }>('auth/user-profile', 
    async (userId: string, { rejectWithValue }) => {
        try {
            const {data,error} = await supabase.from("user_profiles").select("*").eq('user_id', userId).single();
            if (error) {
                return rejectWithValue({ message: error.message }); 
              }
        
              if (!data) {
                return rejectWithValue({ message: "User profile not found" }); 
              }
           
                console.log(data);
                const {address, church_branch, name, phone, profile_picture, user_id, roles} = data ;
                return {
                    user_id,
                    role: roles,
                    phone,
                    name,
                    church_branch,
                    address,
                    profile_picture
                } as userProfileType;
                
        } catch (error) {
            return rejectWithValue({message: "some went wrong"})
        }
})

export default getUserProfileThunk;