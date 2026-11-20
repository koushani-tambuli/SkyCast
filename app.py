import logging

import requests
from flask import Flask, jsonify, render_template, request

from weather import get_weather


app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.get("/")
def home():
    return render_template("index.html")


@app.get("/api/weather")
def weather():
    city = request.args.get("city", "").strip()
    if not city:
        return jsonify({"error": "Please enter a city name."}), 400

    try:
        result = get_weather(city)
    except (requests.RequestException, KeyError, TypeError, ValueError):
        logger.exception("Weather lookup failed for %r", city)
        return jsonify({
            "error": "Weather data is temporarily unavailable. Please try again."
        }), 502

    if "error" in result:
        return jsonify(result), 404

    return jsonify(result)


if __name__ == "__main__":
    app.run()
