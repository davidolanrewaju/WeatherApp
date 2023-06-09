import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = "6215134eb3aefea2e3d972838007d6e2";

const initialState = {
  weather: [],
  isLoading: false,
  error: null,
};

export const getWeather = createAsyncThunk(
  "weather/getWeather",
  async ({ latitude, longitude }) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await axios.get(weatherUrl);

    const filename = response.data.name.replace(/ /g, "-");
    const imgPath = `./src/assets/images/${filename}.jpg`;
    response.data.img = imgPath;

    return response.data;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
