import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCities } from "../reducers/citiesSlice";

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
    <div>
      <div className="cities">
        {cities.map((city) => (
          <ul key={city.country}>
            <li>
              {city.name}
              <br />
              {city.latitude}-{city.longitude}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Cities;
