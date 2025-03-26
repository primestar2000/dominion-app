import { databaseTables } from "@/constants/db-tables";
import { supabase } from "@/utils/lib/superbase";
import { StudyType, StudyTypeRequest } from "@/utils/study-types";
import { createAsyncThunk } from "@reduxjs/toolkit";

const CreateStudyThunk = createAsyncThunk('study',
    async (formData: StudyTypeRequest, {rejectWithValue}) => {
        try {
            const {data, error} = await supabase.from(databaseTables.study).insert<StudyTypeRequest>(formData).select("*").single();
            if (error) {
                console.log(error)
                return rejectWithValue({message: error.message});
            }if(!data){
                return rejectWithValue({message: 'study not created'});
            }
            if (data) {
                console.log(data);
                return {...data, id: data.id} as StudyType;
            }
        } catch (error) {
            return rejectWithValue({message: "some went wrong"});
        }
    }
)

export default CreateStudyThunk