import { configureStore } from "@reduxjs/toolkit";
import cityReducer from './reducers/cities/citiesSlice';
import weatherReducer from "./reducers/weather/weatherSlice";
import forecastReducer from "./reducers/forecast/forecastSlice";

const store = configureStore({
    reducer: {
        cities: cityReducer,
        weather: weatherReducer,
        forecast: forecastReducer,
    },
})

export default store;