import { test, expect } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Cities from "../components/Cities";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/cities/citiesSlice";
import { getWeather } from "../reducers/weather/weatherSlice";
import { getForecast } from "../reducers/forecast/forecastSlice";

test("renders cities correctly", () => {
  const mockCities = [
    { name: "City 1", population: 100000, image: "city1.jpg" },
    { name: "City 2", population: 200000, image: "city2.jpg" },
  ];

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      cities: { cities: mockCities, isLoading: false },
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Cities />
      </MemoryRouter>
    </Provider>
  );

  expect(getByText("City 1")).toBeInTheDocument();
  expect(getByText("City 2")).toBeInTheDocument();
});

test("displays loading message while loading", () => {
  const mockCities = [];
  const mockIsLoading = true;

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      cities: { cities: mockCities, isLoading: mockIsLoading },
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Cities />
      </MemoryRouter>
    </Provider>
  );

  expect(getByText("Loading...")).toBeInTheDocument();
});

test("filters cities based on search input", () => {
  const mockCities = [
    { name: "City 1", population: 100000, image: "city1.jpg" },
    { name: "City 2", population: 200000, image: "city2.jpg" },
    { name: "City 3", population: 300000, image: "city3.jpg" },
  ];

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      cities: { cities: mockCities, isLoading: false },
    },
  });

  const { getByPlaceholderText, getByText, queryByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Cities />
      </MemoryRouter>
    </Provider>
  );

  const searchInput = getByPlaceholderText("Search City...");

  expect(getByText("City 1")).toBeInTheDocument();
  expect(getByText("City 2")).toBeInTheDocument();
  expect(getByText("City 3")).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: "city 2" } });

  expect(queryByText("City 1")).toBeNull();
  expect(getByText("City 2")).toBeInTheDocument();
  expect(queryByText("City 3")).toBeNull();
});
