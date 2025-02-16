import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FilterState {
    age: string;
    salary: string;
}

const initialState: FilterState = {
    age: "",
    salary: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setAge: (state, action: PayloadAction<string>) => {
            state.age = action.payload;
        },
        setSalary: (state, action: PayloadAction<string>) => {
            state.salary = action.payload;
        },
    },
});

export const { setAge, setSalary } = filterSlice.actions;
export const selectAge = (state: RootState) => state.filter.age;
export const selectSalary = (state: RootState) => state.filter.salary;

export default filterSlice.reducer;
