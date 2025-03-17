import { supabase } from "@/utils/lib/superbase";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getUserProfileThunk = createAsyncThunk('auth/user-profile', 
    async ()=>{
        try {
            supabase.from("user_profiles").select("*").eq('user_id', )
        } catch (error) {
            
        }
})