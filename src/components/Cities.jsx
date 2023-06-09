import '../styles/cities.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCities } from '../reducers/cities/citiesSlice';
import { getWeather } from "../reducers/weather/weatherSlice";
import { ArrowIcon, SearchIcon } from "./Icons";
import { getForecast } from '../reducers/forecast/forecastSlice';

const Cities = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cities, isLoading } = useSelector((state) => state.cities);
  const [search, setSearch] = useState("");

  const handleCityClick = (city) => {
    const { latitude, longitude } = city;
    navigate(`/${city.name}`);
    dispatch(getWeather({ latitude, longitude }));
    dispatch(getForecast({ latitude, longitude}));
  };

  const filteredData = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );
  
  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="cities-container">
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search City..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            role="button"
            tabIndex={0}
          />
        </div>
        <div className="search-icon-container">
          <SearchIcon />
        </div>
      </div>
      <div className="cities">
        {filteredData.map((city) => {
          return (
            <div
              className="city-lists"
              key={city.population}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${city.image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              onClick={() => handleCityClick(city)}
            >
              <ArrowIcon />
              <h1 className="city-header">{city.name}</h1>
              <h3 className="population">Population</h3>
              <h4 className="city-number">{city.population}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cities;
