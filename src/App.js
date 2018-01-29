import React from "react";

import './App.css';

import Titles from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "c5a412b03d5976a8a64c1ebf2a1d2711";

class App extends React.Component {

  state = {
    city: undefined,
    country: undefined,
    formValueCity: undefined,
    formValueCountry: undefined,
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  
  componentWillMount = () => {
    this.setLocation();
  }

  setLocation = () => {
    
    if(!!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        // do_something(position.coords.latitude, position.coords.longitude);
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        // this.getAddress(latitude, longitude).then( (v) => {
          // this.setState({city: v}, this.getWeatherReport);
        // });

      });
    } else {
        console.log('Location not found!');
    }
  }

  getAddress (latitude, longitude) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        var method = 'GET';
        var url = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&language=en`;
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var data = JSON.parse(request.responseText);
                    var address = data.results[0];
                    resolve(address.address_components['3'].long_name);
                }
                else {
                    reject(request.status);
                }
            }
        };
        request.send();
    });
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city && country) {
      const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
      const data = await apiCall.json();
      this.setState({
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ''
      })
    } else {
      this.setState({
        city: undefined,
        country: undefined,
        temperature: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Please enter the values!'
      })
    }
    
  }

  render(){
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-7">
                <Titles />
              </div>
              <div className="col-xs-5 form-container">
                <Form getWeather={this.getWeather} valueCity={this.state.formValueCity} valueCountry={this.state.formValueCountry}/>
                <Weather 
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
