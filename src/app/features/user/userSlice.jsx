import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hoursCommited: 0,
    loginInfo: null,
    isAuthenticated: false,
};


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        default: (state) => {
            return {
                ...state,
            };
        },

        login: (state, loginInfo) => {
            state.loginInfo = loginInfo.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.loginInfo = null;
            state.isAuthenticated = false;
        },
        hoursCommited: (state,hours)=>{
            state.hoursCommited=hours.payload;
        }
    },
});

export const {

    login,
    logout,
    hoursCommited

} = userSlice.actions;

export default userSlice.reducer;