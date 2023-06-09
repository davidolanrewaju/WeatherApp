import { test, expect, jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Cities from "../components/Cities";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/cities/citiesSlice";

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

  const mockNavigate = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  }));

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