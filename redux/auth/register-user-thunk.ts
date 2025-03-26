import { supabase } from "@/utils/lib/superbase";
import { createAsyncThunk } from "@reduxjs/toolkit";

type dataType = {
    email: string;
    name:  string;
    branchId: string;
    password: string;
}
const RegisterUserThunk = createAsyncThunk('auth/register-user',
    async (data:dataType, {rejectWithValue}) =>{
        try {
            const { email, password, name, branchId } = data;
            
            const {data: { session }, error,} = await supabase.auth.signUp({
                email: email,
                password: password,
                options: { 
                    data: {
                        name: name.toLowerCase(),
                        church_branch_id: branchId,
                    },
                }
            });
            
            if (error) {
                // setErrorMessage(error.message);
                // setLoading(false);
                console.log(error.message);
                return rejectWithValue({message: error.message});
            }
            
            if (!session) {
                // Alert.alert('Success', 'Please check your inbox for email verification!');
                // setLoading(false);
                return;
            }
            
            if (session) {
                // fetchUserProfile(session.user.id);
                // console.log('session: ', session)
                return session.user;
            }
                
                // setLoading(false);
            } catch (err) {
                // setLoading(false);
                // setErrorMessage('An unexpected error occurred');
                console.error(err);
                
                return rejectWithValue({message: 'An unexpected error occurred'})
            }
    }
);

export default RegisterUserThunk;