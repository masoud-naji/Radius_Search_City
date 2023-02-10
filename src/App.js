import "./styles.css";
// import cities from "cities.json";
import distance from "./distance.jsx";
import GetCurrentLocation from "./current.jsx";
import { useEffect, useState } from "react";
import cities from "./Cities.json";

export default function App() {
  const [input, setInput] = useState("");
  const [radius, setRadius] = useState(0);
  const [selected, setSelected] = useState({ dislat: 0, dislgn: 0, name: "" });
  const [cityList, setCityList] = useState({});
  const [citypop, setCityPop] = useState(0);

  const samplelist =
    input.length !== 0
      ? cities
          .filter((cityName) =>
            cityName.city.toLowerCase().includes(input?.toLowerCase())
          )
          .slice(0, 200)
      : [];

  const { curlat, curlng, message } = GetCurrentLocation();
  const Distance = distance(selected?.lat, selected?.lng, curlat, curlng);

  useEffect(() => {
    const result = cities
      .filter((city) => city.population > citypop)
      .reduce((acc, element) => {
        const thisdistance = distance(element.lat, element.lng, curlat, curlng);
        if (thisdistance < radius) {
          acc.push(
            `${thisdistance} - ${
              element.city
            } - ${element.population.toLocaleString()}`
          );
        }
        return acc;
      }, []);
    setCityList((curr) => ({ ...curr, result }));
  }, [curlat, curlng, radius, citypop]);

  return (
    <div className="App">
      <h1>search a city and check radius distance to your city</h1>
      {message ? <h2>{message}</h2> : <h2> check your distance </h2>}
      <div className="gridlist">
        <div className="gridbox">
          <label htmlFor="citySearch">Enter Your City :</label>
          <input
            id="citySearch"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {` ${Distance ? Distance : " "} Miles `}
        </div>
        <div className="gridbox">
          <label htmlFor="distSearch">Enter Your radius :</label>
          <input
            id="distSearch"
            type="number"
            step="10"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          />
          {` ${cityList?.result?.length}`}

          <label htmlFor="citypop">Minimum population :</label>
          <input
            id="citypop"
            type="range"
            step="1000"
            min="0"
            max="10000000"
            value={citypop}
            onChange={(e) => setCityPop(e.target.value)}
          />
          {` ${citypop.toLocaleString()}`}
        </div>
      </div>
      <div className="gridlist">
        <section>
          <ul>
            {samplelist?.map((item, index) => (
              <li key={item.state_id + index} onClick={() => setSelected(item)}>
                County Name:{item.county_name}-- ini: {item.state_id}-- City :
                {item.city}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <ul>
            {cityList?.result?.length > 0
              ? Object.entries(cityList.result).map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              : null}
          </ul>
        </section>
      </div>
    </div>
  );
}
