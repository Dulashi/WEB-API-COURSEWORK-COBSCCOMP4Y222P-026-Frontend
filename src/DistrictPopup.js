import React from 'react';
import './DistrictPopup.css';

const DistrictPopup = ({ district, data }) => {
    return (
        <div className="district-popup">
            <h3>{district}</h3>
            <p>Temperature: {data.temperature}</p>
            <p>Humidity: {data.humidity}</p>
            <p>Air Pressure: {data.airPressure}</p>
        </div>
    );
};

export default DistrictPopup;
