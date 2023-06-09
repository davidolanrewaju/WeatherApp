import { configureStore } from "@reduxjs/toolkit";
import cityReducer from './reducers/citiesSlice';
import weatherReducer from './reducers/weatherSlice';
import forecastReducer from "./reducers/forecastSlice";

const store = configureStore({
    reducer: {
        cities: cityReducer,
        weather: weatherReducer,
        forecast: forecastReducer,
    },
})

export default store;