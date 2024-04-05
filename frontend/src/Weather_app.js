// WeatherComponent.js
import React, { useState, useEffect } from 'react';
import './Weather_app.css';
import DistrictPopup from './DistrictPopup';

const WeatherComponent = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch('http://localhost:3000/weather/district');
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data. Status: ' + response.status);
                }
                const responseData = await response.json(); 
                console.log('Weather data received from backend:', responseData); 
                setWeatherData(responseData); 
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);

    console.log('Weather data in state:', weatherData); 

    const handleDistrictClick = async (district) => {
        try {
            const response = await fetch(`http://localhost:3000/weather/${district}`);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data for district: ' + district);
            }
            const responseData = await response.json();
            console.log('Weather data for district', district, ':', responseData);
            setSelectedDistrict({ district, data: responseData });
        } catch (error) {
            console.error('Error fetching weather data for district:', district, ':', error);
        }
    };
    
// Manually setting positions for each district though the districts names are taken from the backend
const districtPositions = {
    "Ampara": { x: 190, y: -250 },
    "Anuradhapura": { x: -50, y: -470 },
    "Badulla": { x: 80, y: -300},
    "Batticaloa": { x: 150, y: -400 },
    "Colombo": { x: -130, y: -250},
    "Galle": { x:-80, y: -150 },
    "Gampaha": { x: -130, y: -320 },
    "Hambantota": { x: 80, y: -190},
    "Jaffna": { x: -140, y: -830 },
    "Kaluthara": { x: -110, y: -290 },
    "Kandy": { x: -10, y: -430},
    "Kegalle": { x: -70, y: -420 },
    "Kilinochchi": { x: -100, y: -840},
    "Kurunegala": { x: -90, y: -550 },
    "Mannar": { x: -130, y: -780 },
    "Matale": { x: -1, y: -570 },
    "Matara": { x: -13, y: -330 },
    "Monaragala": { x:130, y: -450},
    "Mulllaitivu": { x: -60, y: -910 },
    "Nuwara Eliya": { x: 30, y:-540 },
    "Polonnaruwa": { x: 65, y: -730 },
    "Puttalam": { x: -150, y: -770 },
    "Ratnapura": { x: -20, y: -500 },
    "Trincomalee": { x: 80, y: -840 },
    "Vavuniya": { x: -45, y: -940 },   
};

    

    return (
        <div>
            <div className="blue-bar">
                <img src="/Government_logo.webp" alt="Government Logo" className="government-logo" />
                <h3>DEPARTMENT OF METEOROLOGY SRI LANKA</h3>
            </div>
            <img src="/bar.jpg" alt="Bar Image" className="bar-image" />
            <div className="weather-container">
                {weatherData && (
                    <div className="map-container">
                        <h2 className="weather-map-heading">Weather Map</h2>
                        <img className="weather-image" src="/srilankanmap.jpg" alt="Sri Lankan Map" />
                        {weatherData.map((data, index) => (
                            data.administrative_district && (
                                <div
                                    key={data._id}
                                    className="district-marker"
                                    data-district={data.administrative_district}
                                    style={{ left: districtPositions[data.administrative_district]?.x || 0, top: districtPositions[data.administrative_district]?.y || 0 }}
                                    onClick={() => handleDistrictClick(data.administrative_district)}
                                >
                                    {data.administrative_district}
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
            {selectedDistrict && (
                <DistrictPopup district={selectedDistrict.district} data={selectedDistrict.data} />
            )}
            <div className="rectangle">
                <h2>CONTACT US</h2>
                <p><strong>Address:</strong><br />Department of Meteorology<br />383, Bauddhaloka Mawatha,<br />Colombo 07<br />Sri Lanka</p>
                <p><strong>Phone:</strong> +94 11 269 4847</p>
                <p><strong>Fax:</strong> +94 11 269 8311</p>
                <p><strong>Email:</strong> info@meteo.gov.lk</p>
                <p><strong>Government Information Center:</strong><br />Callers within Sri Lanka dial 1919<br />Callers outside Sri Lanka dial +94 11 2 191919</p>
            </div>
        </div>
    );
};

export default WeatherComponent;
