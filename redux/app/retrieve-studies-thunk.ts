import { databaseTables } from "@/constants/db-tables";
import { supabase } from "@/utils/lib/superbase";
import { ResponceMessageType } from "@/utils/other-types";
import { StudyType, StudyTypeRequest } from "@/utils/study-types";
import { createAsyncThunk } from "@reduxjs/toolkit";

const retriveStudiesThunk = createAsyncThunk<StudyType[], void, { rejectValue: ResponceMessageType }>(
  "studies/retrieve",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from(databaseTables.study).select("*").order('created_at', {ascending: false});

      if (error) {
        return rejectWithValue({ message: error.message });
      }

      if (!data || data.length === 0) {
        return rejectWithValue({ message: "Couldn't retrieve any study" });
      }
      // console.log(data)
      return data;
    } catch (err) {
      return rejectWithValue({ message: "Something went wrong" });
    }
  }
);

export default retriveStudiesThunk;
