import { useEffect, useState } from 'react';
import './weather.scss';
import search_icon from '../../assets/search-icon.svg';
import clouds from '../../assets/clouds.jpg';
import rain from '../../assets/rain.jpg';
import snow from '../../assets/snow.jpg';
import clear from '../../assets/clear.jpg';
import clear2 from '../../assets/clear2.jpg';
import sunny_clouds from '../../assets/sunny_clouds.jpg';
import sun from '../../assets/sun.png';
import humidity from '../../assets/humidity.png';
import wind from '../../assets/icons/wind-solid.svg';
// import apikey from '../../.env';

const Weather = () => {

    const bgImages = {
        clouds: clouds,
        rain: rain,
        default: sunny_clouds,
        clear: clear2

    }

    const [weatherData, setWeatherData] = useState(false);
    const [searchData, setSearchData] = useState('');

    const search = async (city) => {
        if (city == '') {
            alert('Enter the city');
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b0ca8ba61cc67678e45ee4bfae1b9394`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: `https://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`,
                weather: data.weather[0].main
            });
        } catch (error) {

        }
    }

    const showCity = (e) => {
        setSearchData({
            searchText: e.target.value
        })
    }

    const clickSearch = () => {
        search(searchData.searchText);
    }

    useEffect(() => {
        search('London');
    }, [])

    let bgImage = '';
    switch (weatherData.weather) {
        case 'Clouds':
            bgImage = bgImages.clouds;
            break;
        case 'Rain':
            bgImage = bgImages.rain;
            break;
        case 'Clear':
            bgImage = bgImages.clear;
            break;
        default:
            bgImage = bgImages.default;
    }

    // style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}

    return (
        <div className="weather">
            <img src={bgImage} alt="clouds" className='weather__bg' />
            <div className="weather__wrapper">
                <div className="weather__search-bar">
                    <input type="text" placeholder='search' onChange={showCity} />
                    <div className='weather__icon'>
                        <img src={search_icon} alt="search-icon" onClick={clickSearch} />
                    </div>
                </div>
                <img src={weatherData.icon} alt="clouds" className='weather__img' />
                <p className='weather__deg'>{weatherData.temperature}°C</p>
                <p className='weather__city'>{weatherData.location}</p>
                <p className='weather__desc'>{weatherData.weather}</p>
                <div className="weather__data">
                    <div className="weather__col">
                        <img src={humidity} alt="humidity" />
                        <div>
                            <p>{weatherData.humidity}</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="weather__col">
                        <img src={wind} alt="wind-speed" />
                        <div>
                            <p>{weatherData.windSpeed} Km/h </p>
                            <span>Wind speed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather