import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCities } from "../reducers/citiesSlice";
import "./Cities.css";

const Cities = () => {
  const dispatch = useDispatch();
  const { cities, isLoading } = useSelector((state) => state.cities);

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
        <input
          type="text"
          placeholder="Search City..."
          className="search-input"
          name="search"
        />
      </div>
      <div className="cities">
        {cities.map((city) => (
          <div className="city-lists" key={city.population}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 arrow-icon"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
            <h1 className="city-header">
              {city.name}
            </h1>
            <h2 className="city-name">
              Population
            </h2>
            <h4 className="city-population">
              {city.population}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cities;
