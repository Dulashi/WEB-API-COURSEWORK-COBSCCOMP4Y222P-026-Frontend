import React, { useState, useEffect } from 'react';
import './Weather_app.css';

const WeatherComponent = () => {
    const [weatherData, setWeatherData] = useState(null);

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
            alert(`Weather data for ${district}: Temperature - ${responseData.temperature}, Humidity - ${responseData.humidity}, Air Pressure - ${responseData.airPressure}`);
        } catch (error) {
            console.error('Error fetching weather data for district:', district, ':', error);
        }
    };
    

    // Manually setting positions for each district though the districts names are taken from the backend
    const districtPositions = {
        "Ampara": { x: 300, y: 700 },
        "Anuradhapura": { x: 800, y: 500 },
        "Badulla": { x: 900, y: 720},
        "Batticaloa": { x: 980, y: 600 },
        "Colombo": { x: 700, y: 770 },
        "Galle": { x: 780, y: 879 },
        "Gampaha": { x: 700, y: 720 },
        "Hambantota": { x: 900, y: 890},
        "Jaffna": { x: 680, y: 270 },
        "Kaluthara": { x: 730, y: 815 },
        "Kandy": { x: 850, y: 700},
        "Kegalle": { x: 760, y: 750 },
        "Kilinochchi": { x: 720, y: 340 },
        "Kurunegala": { x: 740, y: 670 },
        "Mannar": { x: 700, y: 450 },
        "Matale": { x: 840, y: 650 },
        "Matara": { x: 820, y: 950 },
        "Monaragala": { x: 970, y: 790},
        "Mulllaitivu": { x: 800, y: 350 },
        "Nuwara Eliya": { x: 850, y: 750 },
        "Polonnaruwa": { x: 900, y: 590 },
        "Puttalam": { x: 800, y: 900 },
        "Ratnapura": { x: 800, y: 800 },
        "Trincomalee": { x: 900, y: 440 },
        "Vavuniya": { x: 780, y: 420 },   
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
