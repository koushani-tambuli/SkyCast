# ☁️ SkyCast — Weather Forecast Web Application

**SkyCast** is a weather web application that provides real-time weather information for different cities. Built using Python, Flask, HTML, CSS, and JavaScript, it retrieves weather data through the Open-Meteo API and presents it through a user-friendly web interface.

## ✨ Features

- **City-Based Weather Search:** Search for weather information by entering a city name.
- **Current Temperature:** View the current temperature of a selected city.
- **Feels-Like Temperature:** Check how warm or cold it feels.
- **Humidity:** View current humidity levels.
- **Wind Speed:** Get information about wind conditions.
- **Weather Conditions:** Display readable weather descriptions.
- **Last Updated:** View when the weather information was retrieved.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| Flask | Web framework |
| HTML5 | Website structure |
| CSS3 | Styling and layout |
| JavaScript | Frontend interactions |
| Open-Meteo API | Weather data |
| Git & GitHub | Version control |

## ⚙️ How It Works

1. The user enters a city name.
2. The Flask backend receives the request.
3. The Open-Meteo Geocoding API finds the city's geographical coordinates.
4. The Open-Meteo Weather API retrieves the weather information.
5. Flask processes the response and sends the data to the frontend.
6. JavaScript dynamically displays the weather information.

## 🚀 Getting Started

### Prerequisites

- Python 3.10 or above
- Git
- VS Code or another code editor

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/SkyCast.git
```

### 2. Navigate to the project directory

```bash
cd SkyCast
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

**Windows PowerShell:**

```powershell
.\venv\Scripts\Activate.ps1
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Run the application

```bash
python app.py
```

### 7. Open in your browser

Visit:

```text
http://127.0.0.1:5000
```

## 🔮 Future Enhancements

Planned features and improvements:

- Hourly weather forecasts
- 7-day weather forecasts
- Air Quality Index (AQI)
- Sunrise and sunset information
- Celsius and Fahrenheit conversion
- Favourite cities and search history
- Interactive weather charts
- AI-powered weather assistant
- Weather alerts and notifications

## 🎯 Project Objective

The objective of SkyCast is to develop a practical web application while learning about API integration, backend development, frontend communication, and real-world data handling.

## 👩‍💻 Author

**Koushani Tambuli**

B.Tech Computer Science and Engineering Student

---

⭐ If you find this project interesting, feel free to explore the repository!
