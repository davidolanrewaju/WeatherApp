import { test, expect } from '@jest/globals';
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import DisplayForecast from "../components/DisplayForecast";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/forecast/forecastSlice";

test("renders forecast correctly", () => {
  const mockForecast = {
    list: [
      {
        dt: 1623217200,
        dt_txt: "2021-06-09 09:00:00",
        main: { temp: 25 },
        weather: [{ icon: "01d" }],
      },
      // Add more mock forecast data if needed
    ],
    isLoading: false,
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      forecast: mockForecast,
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <DisplayForecast />
    </Provider>
  );

  expect(getByText("3-Hour Weather Forecast")).toBeInTheDocument();
});

test("displays loading message when isLoading is true", () => {
  const mockForecast = {
    list: [],
    isLoading: true,
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      forecast: mockForecast,
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <DisplayForecast />
    </Provider>
  );

  expect(getByText("Loading...")).toBeInTheDocument();
});
