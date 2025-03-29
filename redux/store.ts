import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import studiesReducer from "./app/study-slice";
import DevotionalReducer from "./app/devotional-slice";
// import appReducer from "./app/app-slice"
// // import authReducer from "./auth/authSlice"

const store = configureStore({
    reducer: {
        // app: appReducer,
        auth: authReducer,
        studies: studiesReducer,
        devotionals: DevotionalReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;