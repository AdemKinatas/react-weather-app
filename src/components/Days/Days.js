import React, { useEffect } from "react";
import DayCard from "./DayCard";
import { useWeatherContext } from "../../context/WeatherContext";
import { cloud, sun, rain } from "../../assets/icons/index";

const Days = () => {
    const { Weather, city } = useWeatherContext();

  const timeStapToDay = (time) => {
    const date = new Date(time * 1000);
    const newDay = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      date
    );
    return newDay;
  };

  const decideIcon = (weatherCondition) => {
    for (const value of weatherCondition) {
      if (value === "Rain") return rain;
      if (value === "Clouds") return cloud;
      if (value === "Clear") return sun;
    }
  };

  const data = Weather?.map((item) => {
    return {
      day: timeStapToDay(item.dt),
      icon: decideIcon(item.weather?.map((item) => item.main)),
      dayTemp: item.temp.day,
      nightTemp: item.temp.night,
    };
  });

  useEffect(() => console.log(Weather), [Weather]);

  if (data.length)  {
      return (
        <>
          <div className="text-animation">
            <h1>{city}</h1>
          </div>
          <div className="weather-container">
            {data.map((item, idx) => (
              <DayCard key={idx} item={item} />
            ))}
          </div>
        </>
      )
  } else if (!data.length && city !== '') {
    return <h2>{`Opps! No city named ${city} found 😔`}</h2>
  }
};

export default Days;

/* <div>{`Opps! No city named ${city} found 😔`}</div> */