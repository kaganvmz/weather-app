import React from "react";

const Weather = (props) => (
    <div className="weather__info">
        {props.city && props.country && <p className="weather__value"><span className="weather__key">Location:</span> {props.city}, {props.country}</p>}
        {props.temperature && <p className="weather__value"><span className="weather__key">Temperature:</span> {props.temperature}</p>}
        {props.humidity && <p className="weather__value"><span className="weather__key">Humidity:</span> {props.humidity}</p>}
        {props.description && <p className="weather__value"><span className="weather__key">Description:</span> {props.description}</p>}
        {props.error && <p className="weather__error">{props.error}</p>}
    </div>
);

export default Weather;