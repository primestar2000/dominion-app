import { StudyType, WeekType} from "@/utils/study-types";
import { createSlice } from "@reduxjs/toolkit";
import CreateStudyThunk from "./create-study-thunk";
import retriveStudiesThunk from "./retrieve-studies-thunk";
import CreateStudyWeekThunk from "./create-week-thunk";
import retrieveWeeksThunk from "./retrieve-weeks-thunk";
import deleteStudyThunk from "./delete-study-thunk";

interface initialStateType {
    loading: boolean;
    studies: StudyType[];
    weeks: WeekType[];
}
const initialState:initialStateType = {
    loading: false,
    studies: [],
    weeks: [],
}
const StudiesSlice = createSlice({
    name: 'study',
    initialState,
    reducers: {
        deleteStudy:  (state, action) => {
            
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(CreateStudyThunk.fulfilled, (state, action)=>{
            const newStudy = action.payload as StudyType;
            state.studies = [...state.studies, newStudy];
        })
        .addCase(retriveStudiesThunk.fulfilled, (state, action)=>{
            const newStudies = action.payload as StudyType[];
            state.studies = [...newStudies]
        })
        .addCase(CreateStudyWeekThunk.fulfilled, (state, action)=>{
            const newWeek = action.payload as WeekType;
            state.weeks = [...state.weeks, newWeek];
        })
        .addCase(retrieveWeeksThunk.fulfilled, (state, action)=>{
            const allWeeks = action.payload as WeekType[];
            state.weeks = [...allWeeks];
        })
        .addCase(deleteStudyThunk.fulfilled, (state, action)=>{
            const deletedStudyId = action.payload as string;
            // updated the ui state for the studies left after deletion
            state.studies = state.studies.filter(item => item.id !== deletedStudyId);
           
        })
    }
});
const studiesReducer = StudiesSlice.reducer
export default studiesReducer;