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

let loading = document.querySelector(".loading");
let errorMsg = document.querySelector(".error");

async function getForcast(weatherLocation) {
    let APIURL =
        `https://api.weatherapi.com/v1/current.json?key=dee0e6b3c9ef4846b64101151241702&q=` +
        weatherLocation;

    loading.style.display = "block";

    try {
        let response = await fetch(APIURL, { mode: "cors" });
        const data = response.json();
        return data;
    } catch (error) {
        console.log("Error fetching data:");
    }
}

function weatherForecast(e) {
    e.disabled = true;
    setTimeout(function () {
        e.disabled = false;
    }, 2500);
    let weatherLocation = document
        .querySelector(".weather-location")
        .textContent.trim();
    getForcast(weatherLocation)
        .then(data => {
            loading.style.display = "none";
            updatePage(data);
        })
        .catch(error => {
            loading.style.display = "none";
            errorMsg.style.display = "block";
            setTimeout(function () {
                errorMsg.style.display = "none";
            }, 5000);
            console.log("Error");
        });

    function updatePage(data) {
        document.getElementById("country").textContent = data.location.country;
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
        document.getElementById("flc").textContent = data.current.feelslike_c;

        document.getElementById("flf").textContent = data.current.feelslike_f;

        document.getElementById(
            "x"
        ).innerHTML = `                    <p class="text-large temp">
                        ${Math.floor(parseInt(data.current.temp_c))}°
                        <span
                            id="condition"
                            class="condition text-bold text-normal"
                            >${data.current.condition.text}</span
                        >
                    </p>`;
    }
}

let usrOffline = document.querySelector(".offline");
let usrOnline = document.querySelector(".online");
document.querySelector("button").click();
window.addEventListener("offline", e => {
    usrOffline.classList.add("top0");
    usrOnline.classList.remove("top0");
    setTimeout(function() {
      usrOffline.classList.remove("top0");
    }, 2000);
});

window.addEventListener("online", e => {
    usrOnline.classList.add("top0");
    usrOffline.classList.remove("top0");
    setTimeout(function() {
      usrOnline.classList.remove("top0");
    }, 2000);
    document.querySelector("button").click();
});
