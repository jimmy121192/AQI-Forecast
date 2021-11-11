import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Dimmer, Loader, Segment, Grid } from "semantic-ui-react";
import AqiLevelIcon from "../../components/aqi-level-icon/aqi-level-icon.component";
import AqiChart from "../../components/aqi-chart/aqi-chart.component";
import CityInputSearch from "../../components/city-input-search/city-input-search.component";

const HomePage = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");

  const handleInputChange = (city) => {
    setUrl(
      `https://api.waqi.info/feed/${city}/?token=${process.env.REACT_APP_WAQI_API_TOKEN}`
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios(url);
        if (result.data.status === "ok") {
          setData(result.data.data);
          console.log(result.data.data);
        } else {
          setData("");
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <Container>
      <h1>Air Quality Checking</h1>
      <CityInputSearch searchCity={handleInputChange} />
      <Segment>
        {isLoading ? (
          <Dimmer active inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
        ) : data ? (
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={3}>
                <AqiLevelIcon aqi={data.aqi} />
              </Grid.Column>
              <Grid.Column width={13}>
                <h2>Station: {data.city.name}</h2>
                <p>Current AQI: {data.aqi}</p>
                <p>
                  Geo Coordinate:{" "}
                  {data.city.geo ? data.city.geo.toString() : null}
                </p>
                <a href={data.city.url} target="_blank" rel="noreferrer">
                  Learn More
                </a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : (
          <h1>Data not found</h1>
        )}
        <Grid celled>
          <Grid.Row>
            <Grid.Column>
              <AqiChart data={data} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};

export default HomePage;
