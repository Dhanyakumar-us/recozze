"""
Copart Salvage Auto Auction API Service
Integrates RapidAPI Copart Salvage Auto Auction API for location/yard searches and salvage vehicle auctions.
"""

import os
import requests
from typing import Dict, Any, Optional

RAPIDAPI_COPART_HOST = "copart-salvage-auto-auction-api.p.rapidapi.com"
RAPIDAPI_COPART_URL = f"https://{RAPIDAPI_COPART_HOST}/copart/v1/yards"


def fetch_copart_yards(query: str = "dallas", api_key: Optional[str] = None) -> Dict[str, Any]:
    """
    Search Copart auction yards by location query string.
    
    :param query: Location or city search keyword (e.g. 'dallas', 'texas', 'chicago')
    :param api_key: Optional RapidAPI key override, defaults to RAPIDAPI_KEY env var
    :return: Dict containing status, response data, or error details
    """
    key = (api_key or os.getenv("RAPIDAPI_KEY", "")).strip()

    if not key:
        return {
            "status": "error",
            "message": "RAPIDAPI_KEY is not configured in backend/.env",
            "query": query,
            "data": None
        }

    headers = {
        "Content-Type": "application/json",
        "x-rapidapi-host": RAPIDAPI_COPART_HOST,
        "x-rapidapi-key": key
    }
    
    payload = {"query": query}

    try:
        response = requests.post(RAPIDAPI_COPART_URL, headers=headers, json=payload, timeout=10)
        
        try:
            data = response.json()
        except Exception:
            data = response.text

        if response.status_code == 200:
            return {
                "status": "success",
                "status_code": 200,
                "query": query,
                "data": data
            }
        elif response.status_code == 403:
            return {
                "status": "subscription_required",
                "status_code": 403,
                "message": data.get("message", "You are not subscribed to the Copart Salvage Auto Auction API on RapidAPI."),
                "rapidapi_url": f"https://rapidapi.com/api-search-api-search-default/api/{RAPIDAPI_COPART_HOST}",
                "query": query,
                "data": data
            }
        else:
            return {
                "status": "error",
                "status_code": response.status_code,
                "message": f"RapidAPI Copart service returned HTTP {response.status_code}",
                "query": query,
                "data": data
            }
            
    except requests.exceptions.Timeout:
        return {
            "status": "error",
            "status_code": 504,
            "message": "Request to Copart RapidAPI endpoint timed out.",
            "query": query,
            "data": None
        }
    except Exception as e:
        return {
            "status": "error",
            "status_code": 500,
            "message": f"Copart API request error: {str(e)}",
            "query": query,
            "data": None
        }
