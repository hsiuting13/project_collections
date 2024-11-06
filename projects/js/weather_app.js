const input = document.getElementById("city");
const search_btn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");
const temp = document.getElementById("temp-div");

let cityName = "";
// Fetch the default city and weather data from the backend on page load
function loadDefaultCityData() {
  fetch("http://localhost:5000/api/data")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      cityName = data.name;
      input.value = cityName;
      fetchWeatherData(cityName);
    })
    .catch((error) =>
      console.error("Error fetching default city from backend:", error)
    );
}

// Call the function to load default data when the page loads
loadDefaultCityData();

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // Trigger search button click on 'Enter'
    search_btn.click();
  }
});

search_btn.addEventListener("click", () => {
  const enteredCity = input.value.trim();

  // If input is empty, use the current city from the backend
  if (!enteredCity) {
    // Keep the input value as the default city
    input.value = cityName;
    // Fetch weather for the default city
    fetchWeatherData(cityName);
  } else {
    // Fetch  data for the new city and update the backend
    fetchWeatherData(enteredCity);
    updateCityName(enteredCity);
  }
});

// Function to fetch weather data for a given city name
function fetchWeatherData(cityName) {
  fetch(`http://localhost:5000/api/data?city=${cityName}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      return response.json();
    })
    .then((weatherData) => {
      // Display weather data if city found
      displayWeatherData(weatherData);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Function to update the city name on the server
function updateCityName(cityName) {
  fetch("http://localhost:5000/api/update-city", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cityName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("City updated:", data);
      }
    })
    .catch((error) => console.error("Error updating city:", error));
}

function displayWeatherData(weatherData) {
  const iconCode = weatherData.weather[0].icon;
  // temperature in Kelvin
  const temperatureK = weatherData.main.temp;
  // temperatur in Fahreheit
  const temperatureF = ((temperatureK - 273.15) * (9 / 5) + 32).toFixed(1);

  weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  temp.textContent = `${temperatureF}°F`;
}
