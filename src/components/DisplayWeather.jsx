import "../styles/displayWeather.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "../reducers/weatherSlice";
import { WiCloudyGusts, WiCloudyWindy, WiHumidity } from "react-icons/wi";
import DisplayForecast from "./DisplayForecast";
import { BackArrow } from "./Icons";

const DisplayWeather = () => {
  const dispatch = useDispatch();
  const { weather, isLoading } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(getWeather());
  }, [dispatch]);

  if (isLoading || !weather || !weather.weather || !weather.weather[0]) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  const currentIcon = weather.weather[0].icon;
  const imgUrl = `http://openweathermap.org/img/w/${currentIcon}.png`;

  return (
    <div>
      <div
      className="display-weather-container"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${weather.img})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100vw",
        }}
      >
        <div className="arrow-container">
          <BackArrow />
        </div>
        <div className="weather-container">
          <div className="current-weather-info">
            <h2>{weather.name}</h2>
            <img
              className="weather-icon"
              src={imgUrl}
              alt="current-weather-icon"
            />
            <div className="current-info-display">
              <h2>{weather.main.temp}&deg;C</h2>
              <p>{weather.weather[0].description}</p>
            </div>
          </div>
          <div className="other-weather-info">
            <div className="card wind">
              <WiCloudyGusts style={{ color: "#808080", fontSize: "50px" }} />
              <div className="card-info">
                <h2>Wind Speed</h2>
                <p>{weather.wind.speed}km/h</p>
              </div>
            </div>
            <div className="card pressure">
              <WiCloudyWindy style={{ color: "#808080", fontSize: "50px" }} />
              <div className="card-info">
                <h2>Pressure</h2>
                <p>{weather.main.pressure} HPA</p>
              </div>
            </div>
            <div className="card humidity">
              <WiHumidity style={{ color: "#808080", fontSize: "50px" }} />
              <div className="card-info">
                <h2>Humidity</h2>
                <p>{weather.main.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DisplayForecast />
    </div>
  );
};

export default DisplayWeather;
