import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import MyAPI from "./api.js";

const API_KEY = MyAPI;

class App extends React.Component{ /* Async await make http calls*/
	state = {
		temperature: undefined,/* Initial state of the object, which will change when button is clicked */
		city: undefined,
		country: undefined,
		humidity: undefined,
		description: undefined,
		error: undefined,
	}

	getWeather = async (e) => {  
		e.preventDefault(); /* To prevent refresh page when button pressed  */
		const city = e.target.elements.city.value; /* To get what we type in input */
		const country = e.target.elements.country.value; /* To get what we type in input */
		const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`);
		const data = await api_call.json(); /* Json methods on the variable */
		if (city && country) { /* If city and country are true, meaning if they have values then execute to prevent error from api */
			console.log(data);
			this.setState({
				temperature: data.main.temp,
				city: data.name,
				country: data.sys.country,
				humidity: data.main.humidity,
				description: data.weather[0].description,
				error: ""
			});
		} else { /* Otherwise show error */
			this.setState({
				temperature: undefined,
				city: undefined,
				country: undefined,
				humidity: undefined,
				description: undefined,
				error: "Please enter the value."
			});			
		}
	}
	
	render() {
		return (
			<div> {/* Always return one parent element in React*/}
				<div className="wrapper">
					<div className="main">
						<div className="container">
							<div className="row">
								<div className="col-xs-5 title-container">
									<Titles />
								</div>
								<div className="col-xs-7 form-container">
									<Form getWeather={this.getWeather}/> {/* Props to have access to this function in form file */}
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
			</div>
		);
	}
}

export default App