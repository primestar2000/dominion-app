import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOnboarded: AsyncStorage.getItem('is-onboarded')
}
const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {

    }
})