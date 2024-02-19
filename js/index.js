(function () {
    const $ = new Date();
    let day = document.querySelector(".day");
    let date = document.querySelector(".date");
    switch ($.getDay()) {
        case 0:
            day.textContent = "Sunday";
            break;
        case 1:
            day.textContent = "Monday";
            break;
        case 2:
            day.textContent = "Tuesday";
            break;
        case 3:
            day.textContent = "Wednesday";
            break;
        case 4:
            day.textContent = "Thursday";
            break;
        case 5:
            day.textContent = "Friday";
            break;
        case 6:
            day.textContent = "Saturday";
            break;
        default:
            day.textContent = "Error: Invalid day";
    }
    date.textContent = `${$.getDate()}/${$.getMonth() + 1}/${$.getFullYear()}`;
})();

async function getForcast(weatherLocation) {
    let APIURL =
        `https://api.weatherapi.com/v1/current.json?key=dee0e6b3c9ef4846b64101151241702&q=` +
        weatherLocation;

    const response = await fetch(APIURL, { mode: "cors" });
    if (!response.ok) {
        throw new Err(`HTTP error! status: ${response.status}`);
    } else {
        const data = await response.json();
        return data;
    }
}

function weatherForecast() {
    console.clear();
    let weatherLocation = document
        .querySelector(".weather-location")
        .textContent.trim();
    getForcast(weatherLocation)
        .then(data => {
            console.log(data);
            updatePage(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });

    function updatePage(data) {
        document.getElementById("country").textContent =
            data.location.country;
        document.getElementById("wind").textContent =
            data.current.wind_kph + " kph";
        document.getElementById("wind-direction").textContent =
            data.current.wind_dir;
        document.getElementById("humidity").textContent =
            data.current.humidity + "%";
        document.getElementById("pressure").textContent =
            data.current.pressure_mb + "mb";
        document.getElementById("uv").textContent = data.current.uv + " of 11";
        document.getElementById("visibility").textContent =
            data.current.vis_km + " km";
    }
}
