import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import DisplayWeather from "../components/DisplayWeather";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/weather/weatherSlice";

test("displays loading message when weather data is loading", () => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      weather: {
        isLoading: true,
      },
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <DisplayWeather />
      </Router>
    </Provider>
  );

  expect(getByText("Loading...")).toBeInTheDocument();
});
