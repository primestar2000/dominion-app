import { databaseTables } from "@/constants/db-tables";
import { supabase } from "@/utils/lib/superbase";
import { ResponceMessageType } from "@/utils/other-types";
import { StudyType, StudyTypeRequest, WeekType } from "@/utils/study-types";
import { createAsyncThunk } from "@reduxjs/toolkit";

const retrieveWeeksThunk = createAsyncThunk<WeekType[], string, { rejectValue: ResponceMessageType }>(
  "weeks/retrieve",
  async (studyId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from(databaseTables.bibleStudyWeeks).select("*").eq('bible_study_id', studyId).order('created_at', {ascending: false});

      if (error) {
        return rejectWithValue({ message: error.message });
      }

      if (!data || data.length === 0) {
        return rejectWithValue({ message: "Couldn't retrieve any study week" });
      }
    //   console.log(data)
      return data as WeekType[];
    } catch (err) {
      return rejectWithValue({ message: "Something went wrong" });
    }
  }
);

export default retrieveWeeksThunk;
