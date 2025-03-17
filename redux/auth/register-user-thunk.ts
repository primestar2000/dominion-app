import { createAsyncThunk } from "@reduxjs/toolkit";

const RegisterUserThunk = createAsyncThunk('auth/register-user',
    async (data:, {rejectWithValue}) =>{
        try {
                    const { email, password, name, branch } = data;
                    
                    const {
                        data: { session },
                        error,
                    } = await supabase.auth.signUp({
                        email: email,
                        password: password,
                        options: { 
                            data: {
                                name: formInput.name.toLowerCase(),
                                church_branch_id: selectedBranch?.id, // Convert branch to a number
                            },
                        }
                    });
                  
                    if (error) {
                        setErrorMessage(error.message);
                        setLoading(false);
                        console.log(error);
                        return;
                    }
                    
                    if (!session) {
                        Alert.alert('Success', 'Please check your inbox for email verification!');
                        setLoading(false);
                        return;
                    }
                
                    if (session) {
                        // fetchUserProfile(session.user.id);
                        // console.log('session: ', session)
                    }
                        
                        setLoading(false);
                    } catch (err) {
                        setLoading(false);
                        setErrorMessage('An unexpected error occurred');
                        console.error(err);
                    }
    }
)