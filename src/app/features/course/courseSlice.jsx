import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   courses:[],
   businessDaysCount:0,
   startDate:new Date(),
};


export const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        default: (state) => {
            return {
                ...state,
            };
        },

        setCourses: (state,courseData) => {
            state.courses = [...courseData.payload];
        },
        setStartDate: (state,date)=>{
            state.startDate=date.payload;

        },
        setBusinessDaysCount:(state,count)=>{
            state.businessDaysCount=count.payload;
        }
        
    },
});

export const {

    setCourses,
    setStartDate,
    setBusinessDaysCount


} = courseSlice.actions;

export default courseSlice.reducer;