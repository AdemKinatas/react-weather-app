import { createContext, useReducer, useState, useEffect, useContext } from 'react';
import cities from '../data/cities.json';
import axios from 'axios';
import WeatherReducer from './/WeatherReducer';


const initialState = {
    city: '',
    lat : null,
    lon : null,
    weather : [],
}

const WeatherContext = createContext(initialState);

const WeatherContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(WeatherReducer, initialState)
    
    const getWeatherByCityName = `https://api.openweathermap.org/data/2.5/weather?q=${state.city}&appid=${process.env.REACT_APP_API_KEY}`;
    const getWeatherByLocation = `https://api.openweathermap.org/data/2.5/onecall?lat=${state.lat}&lon=${state.lon}&exclude=minutely,hourly&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

    const getCityName = (city) => {
        if (city !== '') {
            dispatch({type: 'GET_CITY_NAME', payload: city})
        }
    }

    const getLanAndLon = () => {
        if (state.city !== '') {
            axios(getWeatherByCityName)
            .then(res => {
                const {lat, lon} = res.data.coord;
                dispatch({type: 'GET_LAN_AND_LON', payload: {newLat: lat, newLon: lon}})
                console.log(lat, lon)
            })
            .catch((err) => {
                dispatch({type: 'WRONG_CITY_NAME'})
            })
        }
    }

    useEffect(() => getLanAndLon(), [state.city])

    const getWeatherInfo =() => {
        if (state.lat !== null && state.lon !== null) {
            axios(getWeatherByLocation)
            .then(res => {
                const { daily } = res.data;
                dispatch({type: 'GET_WEATHER_INFO', payload: daily})
            })
            .catch((err) => {
                console.error(err.message)
            })
        }
    }

    useEffect(() => getWeatherInfo(), [state.lat, state.lon]);


    const values = {
        city: state.city,
        Weather: state.weather,
        getCityName,
    }

    return <WeatherContext.Provider value={values}>
        {children}
    </WeatherContext.Provider>;
}

export const useWeatherContext = () => useContext(WeatherContext);

export default WeatherContextProvider;