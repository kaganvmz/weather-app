import React from "react";

const Form = (props) => (
    <form onSubmit={props.getWeather}>
        <input type="text" name="city" value={ props.valueCity ? "${props.valueCity}" : "" } placeholder="City..."></input>
        <input type="text" name="country" value={ props.valueCountry ? "${props.valueCountry}" : "" } placeholder="Country..."></input>
        <button>Get weather</button>
    </form>
);
export default Form;