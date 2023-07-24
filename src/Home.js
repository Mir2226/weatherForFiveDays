import axios from 'axios';
import React, { useState } from 'react';
import './style.css';
function Home() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('Yerevan');
  const handleClick = () => {
    if (name !== '') {
      const apiKey = '16bfa98849718de13b6e8978b87d47b8&'; // Replace with your actual API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${apiKey}&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          const forecastData = res.data.list.map((item) => {
            return {
              date: item.dt_txt,
              celsius: item.main.temp,
              icon: item.weather[0].icon,
              humidity: item.main.humidity,
              speed: item.wind.speed,
            };
          });
          // Filter the data to get only one entry per day (assuming the API returns data for every 3 hours)
          const dailyData = forecastData.filter((item, index) => index % 8 === 0);
          setData(dailyData);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className='container'>
      <div className='weather'>
        <div className='search'>
          <input type='text' onKeyPress={handleKeyPress} placeholder='Enter City Name' onChange={(e) => setName(e.target.value)} />
          <button onClick={handleClick}>
            <img src='' alt='' />
          </button>
        </div>
        {data.length > 0 && (
          <div className='forecast'>
            {data.map((item, index) => (
              <div className='day' key={index}>
                <h2>{new Date(item.date).toLocaleDateString('en-US', { weekday: 'long' })}</h2>
                <img src={`https://openweathermap.org/img/w/${item.icon}.png`} alt='Weather Icon' />
                <p>High: {Math.round(item.celsius)}°C</p>
                <p>Low: {Math.round(item.celsius)}°C</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;