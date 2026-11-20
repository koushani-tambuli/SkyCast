const form = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const loadingState = document.querySelector("#loading-state");
const errorCard = document.querySelector("#error-card");
const welcomeCard = document.querySelector("#welcome-card");
const dashboard = document.querySelector("#dashboard");
const recentSection = document.querySelector("#recent-section");
const recentList = document.querySelector("#recent-list");
const historyKey = "skycast-recent-cities";
let currentWeather = null;
let selectedUnit = "c";
let activeRequest = 0;

const weatherSymbols = [
  { words: ["thunder"], symbol: "⛈" },
  { words: ["snow", "sleet"], symbol: "❄" },
  { words: ["rain", "drizzle", "shower"], symbol: "🌧" },
  { words: ["fog"], symbol: "🌫" },
  { words: ["cloud", "overcast"], symbol: "☁" },
  { words: ["clear", "sun"], symbol: "☀" },
];

function getWeatherSymbol(condition) {
  const normalized = condition.toLowerCase();
  const match = weatherSymbols.find((entry) =>
    entry.words.some((word) => normalized.includes(word)),
  );
  return match ? match.symbol : "🌤";
}

function convertedTemperature(value) {
  const temperature = Number(value);
  if (!Number.isFinite(temperature)) return "—";
  const converted = selectedUnit === "f" ? (temperature * 9) / 5 + 32 : temperature;
  return `${Math.round(converted)}°`;
}

function formatUpdated(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function renderWeather() {
  if (!currentWeather) return;

  document.querySelector("#city-name").textContent = currentWeather.city;
  document.querySelector("#country-name").textContent = currentWeather.country || "";
  document.querySelector("#temperature").textContent = convertedTemperature(currentWeather.temperature);
  document.querySelector("#temperature-card").textContent = convertedTemperature(currentWeather.temperature);
  document.querySelector("#feels-like").textContent = convertedTemperature(currentWeather.feels_like);
  document.querySelector("#condition").textContent = currentWeather.condition;
  document.querySelector("#humidity").textContent = `${currentWeather.humidity}%`;
  document.querySelector("#wind-speed").textContent = `${currentWeather.wind_speed} km/h`;
  document.querySelector("#weather-visual").textContent = getWeatherSymbol(currentWeather.condition);
  document.querySelector("#last-updated").textContent = `Updated ${formatUpdated(currentWeather.last_updated)}`;
}

function readHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem(historyKey) || "[]");
    return Array.isArray(saved) ? saved.filter((city) => typeof city === "string") : [];
  } catch (error) {
    console.warn("Could not read recent searches.", error);
    return [];
  }
}

function saveHistory(city) {
  const next = [city, ...readHistory().filter((item) => item.toLowerCase() !== city.toLowerCase())].slice(0, 5);
  try {
    localStorage.setItem(historyKey, JSON.stringify(next));
  } catch (error) {
    console.warn("Could not save recent searches.", error);
  }
  renderHistory();
}

function renderHistory() {
  const cities = readHistory();
  recentSection.hidden = cities.length === 0;
  recentList.replaceChildren();

  for (const city of cities) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "recent-city";
    button.textContent = city;
    button.addEventListener("click", () => searchWeather(city));
    recentList.append(button);
  }
}

async function searchWeather(city) {
  const query = city.trim();
  if (!query) {
    cityInput.focus();
    return;
  }

  const requestId = ++activeRequest;
  cityInput.value = query;
  errorCard.hidden = true;
  loadingState.hidden = false;
  dashboard.hidden = true;
  welcomeCard.hidden = true;
  form.classList.add("is-loading");

  try {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(query)}`);
    const data = await response.json();
    if (requestId !== activeRequest) return;
    if (!response.ok) throw new Error(data.error || "We couldn't load weather for that city.");

    currentWeather = data;
    renderWeather();
    dashboard.hidden = false;
    document.querySelector("#updated-label").textContent = `Updated ${formatUpdated(data.last_updated)}`;
    saveHistory(data.city);
    document.querySelector("#weather-section").scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    if (requestId !== activeRequest) return;
    document.querySelector("#error-text").textContent =
      error instanceof TypeError ? "Please check your connection and try again." : error.message;
    errorCard.hidden = false;
  } finally {
    if (requestId === activeRequest) {
      loadingState.hidden = true;
      form.classList.remove("is-loading");
    }
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchWeather(cityInput.value);
});

document.querySelectorAll(".city-chip").forEach((button) => {
  button.addEventListener("click", () => searchWeather(button.dataset.city));
});

document.querySelectorAll(".unit-button").forEach((button) => {
  button.addEventListener("click", () => {
    selectedUnit = button.dataset.unit;
    document.querySelectorAll(".unit-button").forEach((unitButton) => {
      const selected = unitButton === button;
      unitButton.classList.toggle("is-selected", selected);
      unitButton.setAttribute("aria-pressed", String(selected));
    });
    renderWeather();
  });
});

document.querySelector("#clear-history").addEventListener("click", () => {
  try {
    localStorage.removeItem(historyKey);
  } catch (error) {
    console.warn("Could not clear recent searches.", error);
  }
  renderHistory();
});

document.querySelector("#error-dismiss").addEventListener("click", () => {
  errorCard.hidden = true;
});

renderHistory();
