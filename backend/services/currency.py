"""
RECO Multi-Currency Exchange Rate Service
Fetches real-time exchange rates for global currency selection (INR, USD, EUR, GBP, AED, CAD, AUD).
Integrates EXCHANGE_RATE_API_KEY with free fallback support.
"""

import os
import time
import requests
from typing import Dict, Any

# In-memory cache for currency rates (cached for 1 hour)
_RATES_CACHE: Dict[str, Any] = {}
_LAST_FETCH_TIMESTAMP: float = 0.0
CACHE_DURATION_SECONDS = 3600

DEFAULT_INR_BASE_RATES = {
    "INR": 1.0,
    "USD": 0.0115,   # ~87 INR / USD
    "EUR": 0.0105,   # ~95 INR / EUR
    "GBP": 0.0089,   # ~112 INR / GBP
    "AED": 0.0422,   # ~23.7 INR / AED
    "CAD": 0.0162,   # ~61.5 INR / CAD
    "AUD": 0.0177    # ~56.5 INR / AUD
}


def get_live_exchange_rates() -> Dict[str, Any]:
    """Retrieves live currency rates with caching and API key support."""
    global _RATES_CACHE, _LAST_FETCH_TIMESTAMP

    now = time.time()
    if _RATES_CACHE and (now - _LAST_FETCH_TIMESTAMP < CACHE_DURATION_SECONDS):
        return _RATES_CACHE

    api_key = os.getenv("EXCHANGE_RATE_API_KEY", "").strip()

    rates = dict(DEFAULT_INR_BASE_RATES)
    api_source = "Built-in Defaults"

    if api_key:
        try:
            url = f"https://v6.exchangerate-api.com/v6/{api_key}/latest/INR"
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                data = response.json()
                if data.get("result") == "success":
                    fetched = data.get("conversion_rates", {})
                    for curr in ["USD", "EUR", "GBP", "AED", "CAD", "AUD", "INR"]:
                        if curr in fetched:
                            rates[curr] = fetched[curr]
                    api_source = "ExchangeRate-API (Authenticated Key)"
        except Exception as e:
            print(f"[Currency API Error]: {e}")
    else:
        # Fallback to free public endpoint if no key is provided
        try:
            url = "https://open.er-api.com/v6/latest/INR"
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                data = response.json()
                fetched = data.get("rates", {})
                for curr in ["USD", "EUR", "GBP", "AED", "CAD", "AUD", "INR"]:
                    if curr in fetched:
                        rates[curr] = fetched[curr]
                api_source = "Open Exchange Rates (Free Tier)"
        except Exception as e:
            print(f"[Free Currency API Error]: {e}")

    result = {
        "base_currency": "INR",
        "rates": rates,
        "api_source": api_source,
        "last_updated": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(now))
    }

    _RATES_CACHE = result
    _LAST_FETCH_TIMESTAMP = now
    return result
