import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://api.api-ninjas.com/v1/city?country=GH&limit=20';
const configURL = {
    headers: {
        'X-Api-Key': 'AGQw71XDjPFts2sQGGad8sdAfIlF4bzuUg2Wh19q',
        'Content-Type': 'application/json',
    }
}

const initialState = {
    cities: [],
    isLoading: false,
    error: null,
}

export const getCities = createAsyncThunk('cities/getCities', async (_, thunkAPI) => {
    try{
        const response = await axios.get(url, configURL);
        const cityArray = response.data.map((city) => ({
            ...city,
        }));
        return cityArray;
    } catch(err){
        return thunkAPI.rejectWithValue('Something went wrong');
    }
})

getCities();

const citySlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getCities.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(getCities.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cities = action.payload;
          })  
          .addCase(getCities.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          });
      },
})

export default citySlice.reducer;