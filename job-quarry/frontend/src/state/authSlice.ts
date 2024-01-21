import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: true,
        isAuthorized: false,
        isCompany: false
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setIsAuthorized: (state, action) => {
            state.isAuthorized = action.payload;
        },
        setIsCompany: (state, action) => {
            state.isCompany = action.payload
        }
    }
});

export const { setIsLoading, setIsAuthorized, setIsCompany } = authSlice.actions;
export default authSlice.reducer;