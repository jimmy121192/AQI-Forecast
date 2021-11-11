import React, { useEffect, useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";

const CityInputSearch = ({ searchCity }) => {
  const [citiesData, setCitiesData] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      let requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      await fetch(
        "https://cdsmzchnl4.execute-api.us-west-2.amazonaws.com/prod",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => setCitiesData(JSON.parse(result)))
        .catch((error) => console.log("error", error));
    };
    fetchCities();
  }, []);

  const filterCities = (inputValue) => {
    if (citiesData.length > 0) {
      return citiesData.filter((city) => {
        return city.label.toLowerCase().includes(inputValue.toLowerCase());
      });
    } else {
      return null;
    }
  };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterCities(inputValue));
      }, 1000);
    });

  const handleChange = (value) => {
    searchCity(value.value);
  };
  return (
    <AsyncCreatableSelect
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      onChange={handleChange}
    />
  );
};

export default CityInputSearch;
