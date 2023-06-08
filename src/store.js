import { configureStore } from "@reduxjs/toolkit";
import cityReducer from './reducers/citiesSlice';

const store = configureStore({
    reducer: {
        cities: cityReducer,
    },
})

export default store;