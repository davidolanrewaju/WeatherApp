import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://api.api-ninjas.com/v1/city";

const config = {
  headers: {
    "X-Api-Key": "AGQw71XDjPFts2sQGGad8sdAfIlF4bzuUg2Wh19q",
    "Content-Type": "application/json",
  },
};

const cityNames = [
  "London",
  "Tokyo",
  "Lagos",
  "Dubai",
  "Accra",
  "New York",
  "Paris",
  "Las Vegas",
  "Berlin",
  "Madrid",
  "Milan",
  "Casablanca",
  "Cape Town",
  "Rio de Janeiro",
  "Kigali",
  "Sydney",
  "Seoul",
  "Mumbai",
  "Mexico City",
  "Bangkok",
  "Hong Kong",
  "Nairobi",
  "Cairo",
  "Singapore",
  "Barcelona",
  "Rome",
  "Beijing",
  "Amsterdam",
  "Istanbul",
  "Buenos Aires",
];

const initialState = {
  cities: [],
  isLoading: false,
  error: null,
};

export const getCities = createAsyncThunk(
  "cities/getCities",
  async (_, thunkAPI) => {
    try {
      const requests = cityNames.map((cityName) =>
        axios.get(`${apiUrl}?name=${cityName}`, config)
      );

      const responses = await Promise.all(requests);

      const cityArray = responses.map((response) =>
        response.data.map((city) => ({
          ...city,
          image: `/${city.name.replace(/ /g, "-")}.jpg`,
        }))
      );

      const mergedCities = [].concat(...cityArray);

      return mergedCities;
    } catch (err) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);
const citySlice = createSlice({
  name: "cities",
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
});

export default citySlice.reducer;
