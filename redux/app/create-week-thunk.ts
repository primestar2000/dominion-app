import { databaseTables } from "@/constants/db-tables";
import { supabase } from "@/utils/lib/superbase";
import { ResponceMessageType } from "@/utils/other-types";
import { WeekType, WeekTypeRequest } from "@/utils/study-types";
import { createAsyncThunk } from "@reduxjs/toolkit";

const CreateStudyWeekThunk = createAsyncThunk<WeekType, WeekTypeRequest, {rejectValue: ResponceMessageType}>('create/week',
    async (formData:WeekTypeRequest, {rejectWithValue}) =>{
        try {
            const {data, error} = await supabase.from(databaseTables.bibleStudyWeeks).insert(formData).select('*').single();
            if (error) {
                console.log('payload', formData)
                return rejectWithValue({message: error.message});
            }
         
            return data as WeekType;
        } catch (error) {
            console.log(error)
            return rejectWithValue({message: "something went wrong"});
        }
    }
)

export default CreateStudyWeekThunk