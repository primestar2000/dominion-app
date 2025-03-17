import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
// import appReducer from "./app/app-slice"
// // import authReducer from "./auth/authSlice"

const store = configureStore({
    reducer: {
        // app: appReducer,
        auth: authReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;