import React, { useState } from 'react';
import './style.css';
import search from '../../assets/images/search.png';
import { useWeatherContext } from '../../context/WeatherContext';

const Form = () => {
    const {getCityName} = useWeatherContext()


  const [query, setQuery] = useState('');

  const handleOnchange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      await getCityName(query)
      setQuery('');
    }
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
      type="text"
      placeholder='Please enter a city name'
      value={query}
      onChange={handleOnchange}
      />
      <img src={search} alt="search" />
    </form>
  )
}

export default Form;