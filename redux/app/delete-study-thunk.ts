import { databaseTables } from "@/constants/db-tables";
import { supabase } from "@/utils/lib/superbase";
import { createAsyncThunk } from "@reduxjs/toolkit";

const deleteStudyThunk = createAsyncThunk('',
    async (studyId:string, {rejectWithValue})=>{
        try {
            const {data, error} = await supabase.from(databaseTables.study).delete().eq('id', studyId);
            if (error) {
                return rejectWithValue({message: error.message});
            }
            
            return studyId as string;
        } catch (error) {
            return rejectWithValue({message: 'something went wrong'});
        }
})

export default deleteStudyThunk;