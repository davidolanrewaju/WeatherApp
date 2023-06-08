import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCities } from "../reducers/citiesSlice";
import "./Cities.css";
import { ArrowIcon, SearchIcon } from "./Icons";

const Cities = () => {
  const dispatch = useDispatch();
  const { cities, isLoading } = useSelector((state) => state.cities);
  const [search, setSearch] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCities(filtered);
  };

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
            name="search"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="search-icon-container">
          <SearchIcon />
        </div>
      </div>
      <div className="cities">
        {(filteredCities.length > 0 ? filteredCities : cities).map((city) => (
          <div
            className="city-lists"
            key={city.population}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${city.image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <ArrowIcon />
            <h1 className="city-header">{city.name}</h1>
            <h3 className="population">Population</h3>
            <h4 className="city-number">{city.population}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cities;
