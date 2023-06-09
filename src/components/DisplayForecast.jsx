import "../styles/displayForecast.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForecast } from "../reducers/forecastSlice";

const DisplayForecast = () => {
  const dispatch = useDispatch();
  const { forecast, isLoading } = useSelector((state) => {
    console.log(state);
    return state.forecast;
  });

  useEffect(() => {
    dispatch(getForecast());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  const formatDate = (list_date) => {
    return new Date(list_date).toLocaleTimeString([], { timeStyle: "short" });
  };

  const showWeatherIcon = (icon) => {
    return `http://openweathermap.org/img/w/${icon}.png`;
  };

  return (
    <div>
      <div className="forecast-container">
        <div className="forecast-container-header">
          <h2>3-Hour Weather Forecast</h2>
        </div>
        <div className="forecast-info-container">
          <div className="forecast-info-list-header odd-item grid-arrangement">
            <h2 className="time">Time</h2>
            <h2 className="flex-center"></h2>
            <h2 className="temp flex-end">Temperature</h2>
          </div>
          {forecast?.list?.slice(1, 8).map((item, index) => (
            <div
              key={item.dt}
              className={`forecast-info-list ${
                index % 2 !== 0 ? "odd-item" : ""
              }`}
            >
              <div className="info-content grid-arrangement">
                <h2 className="font">{formatDate(item.dt_txt)}</h2>
                <img
                  className="weather-icon flex-center"
                  src={showWeatherIcon(item.weather[0].icon)}
                  alt="forecast-weather-icon"
                />
                <h2 className="flex-end font">{item.main.temp}&deg;C</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayForecast;
