class WeatherService {

    async getWeather() {
        // trekroner 58.06, 7.98
        const url = "https://api.open-meteo.com/v1/forecast?latitude=58.06&longitude=7.98&hourly=temperature_2m";

        const response = await fetch(url);

        const data = await response.json();

        return data;
    }
}

module.exports = new WeatherService();
