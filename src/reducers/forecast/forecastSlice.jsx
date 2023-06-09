import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = "6215134eb3aefea2e3d972838007d6e2";

const initialState = {
  forecast: [],
  isLoading: false,
  error: null,
};

export const getForecast = createAsyncThunk(
  "weather/getForecast",
  async ({ latitude, longitude }) => {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await axios.get(forecastUrl);
    console.log(response.data);
    return response.data;
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getForecast.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.forecast = action.payload;
      })
      .addCase(getForecast.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default forecastSlice.reducer;
