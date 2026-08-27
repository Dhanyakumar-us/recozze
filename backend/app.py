"""
RECO — Intelligent Laptop Recommendation & Price Forecasting Engine
FastAPI Backend Application
"""

from dotenv import load_dotenv
import os

load_dotenv()

from fastapi import FastAPI, Query, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from database import LAPTOPS_DATA, MARKET_TRENDS_DATA
from recommendation.engine import rank_laptops
from recommendation.realtime import realtime_manager, apply_realtime_boosts
from models.price_predictor import forecast_laptop_price
from chatbot.advisor import generate_chat_response

app = FastAPI(
    title="RECO Engine API",
    description="Intelligent Laptop Recommendation, Thermal/TGP Evaluation & Price Forecasting Engine",
    version="1.0.0"
)

# Enable CORS for Vite frontend on any port during local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TrackEventRequest(BaseModel):
    session_id: str
    event_type: str  # view_laptop, filter_change, compare_laptop, search_query
    laptop_id: Optional[str] = None
    context: Optional[Dict[str, Any]] = None


class RecommendRequest(BaseModel):
    workload: str = "student"
    budget_min: float = 40000
    budget_max: float = 350000
    ram_min: int = 8
    tgp_tier: Optional[str] = None
    unidays_active: bool = False
    search_query: Optional[str] = None
    session_id: Optional[str] = None


class CompareRequest(BaseModel):
    laptop_ids: List[str]
    unidays_active: bool = False


class ChatRequest(BaseModel):
    query: str
    unidays_active: bool = False


@app.get("/")
def read_root():
    return {
        "status": "online",
        "app": "RECO — Intelligent Laptop Recommendation & Price Forecasting Engine",
        "version": "1.0.0",
        "total_laptops": len(LAPTOPS_DATA)
    }


@app.get("/api/laptops")
def get_laptops(
    workload: str = Query("student", description="Target workload (student, aaa_gaming, esports, ai_ml, creator, everyday)"),
    budget_min: float = Query(40000, description="Minimum budget in INR"),
    budget_max: float = Query(350000, description="Maximum budget in INR"),
    ram_min: int = Query(8, description="Minimum RAM capacity in GB"),
    tgp_tier: Optional[str] = Query(None, description="TGP Tier (thin_light, balanced, unlocked)"),
    unidays_active: bool = Query(False, description="Enable UNiDAYS student pricing"),
    search: Optional[str] = Query(None, description="Search keyword"),
    session_id: Optional[str] = Query(None, description="Session ID for real-time personalization")
):
    """Retrieve filtered and ranked laptops based on hardware & budget criteria with optional real-time session boosting."""
    ranked = rank_laptops(
        LAPTOPS_DATA,
        workload=workload,
        budget_min=budget_min,
        budget_max=budget_max,
        ram_min=ram_min,
        tgp_tier=tgp_tier,
        unidays_active=unidays_active,
        search_query=search
    )
    if session_id:
        ranked = apply_realtime_boosts(ranked, session_id=session_id)
        
    return {
        "count": len(ranked),
        "workload": workload,
        "unidays_active": unidays_active,
        "session_id": session_id,
        "laptops": ranked
    }


@app.get("/api/laptops/{laptop_id}")
def get_laptop_detail(laptop_id: str, unidays_active: bool = False):
    """Get complete hardware details, thermal specs, benchmarks, and price forecast for a single laptop."""
    laptop = next((l for l in LAPTOPS_DATA if l["id"] == laptop_id), None)
    if not laptop:
        raise HTTPException(status_code=404, detail="Laptop not found")
        
    forecast = forecast_laptop_price(laptop, unidays_active)
    
    res = dict(laptop)
    res["effective_price_inr"] = laptop["unidays_price_inr"] if unidays_active else laptop["price_inr"]
    res["forecast"] = forecast
    return res


@app.post("/api/events/track")
def track_user_event(payload: TrackEventRequest):
    """Real-Time Interaction Event Ingestion Pipeline Endpoint."""
    laptop_data = None
    if payload.laptop_id:
        laptop_data = next((l for l in LAPTOPS_DATA if l["id"] == payload.laptop_id), None)
        
    res = realtime_manager.track_event(
        session_id=payload.session_id,
        event_type=payload.event_type,
        laptop_id=payload.laptop_id,
        laptop_data=laptop_data,
        context=payload.context
    )
    return res


@app.post("/api/recommend")
@app.post("/api/recommend/realtime")
def recommend_laptops_realtime(payload: RecommendRequest):
    """POST endpoint for multi-factor laptop ranking augmented with real-time session vectors."""
    ranked = rank_laptops(
        LAPTOPS_DATA,
        workload=payload.workload,
        budget_min=payload.budget_min,
        budget_max=payload.budget_max,
        ram_min=payload.ram_min,
        tgp_tier=payload.tgp_tier,
        unidays_active=payload.unidays_active,
        search_query=payload.search_query
    )
    
    if payload.session_id:
        ranked = apply_realtime_boosts(ranked, session_id=payload.session_id)

    return {
        "count": len(ranked),
        "workload": payload.workload,
        "unidays_active": payload.unidays_active,
        "session_id": payload.session_id,
        "laptops": ranked
    }


@app.websocket("/ws/recommendations/{session_id}")
async def websocket_recommendations(websocket: WebSocket, session_id: str):
    """WebSocket endpoint for real-time recommendation updates stream."""
    await websocket.accept()
    try:
        # Send initial real-time session status
        session_info = realtime_manager.get_session(session_id) or {}
        await websocket.send_json({
            "type": "connection_established",
            "session_id": session_id,
            "events_count": len(session_info.get("events", []))
        })
        while True:
            # Keep connection open and listen for client pings or updates
            data = await websocket.receive_text()
            if data == "ping":
                await websocket.send_json({"type": "pong", "session_id": session_id})
    except WebSocketDisconnect:
        pass



@app.get("/api/market-trends")
def get_market_trends():
    """Retrieve DRAM, NAND Flash, GPU silicon component price indices & upcoming sale calendars."""
    return MARKET_TRENDS_DATA


@app.post("/api/compare")
def compare_laptops(payload: CompareRequest):
    """Side-by-side comparison endpoint for up to 3 pinned laptops."""
    if len(payload.laptop_ids) > 3:
        raise HTTPException(status_code=400, detail="Cannot compare more than 3 laptops simultaneously")
        
    selected = [l for l in LAPTOPS_DATA if l["id"] in payload.laptop_ids]
    
    # Calculate side-by-side pros, cons, and total student savings
    comparison_matrix = []
    total_student_savings = 0
    
    for l in selected:
        eff_price = l["unidays_price_inr"] if payload.unidays_active else l["price_inr"]
        savings = l["price_inr"] - l["unidays_price_inr"]
        total_student_savings += savings
        
        item = dict(l)
        item["effective_price_inr"] = eff_price
        item["student_savings_inr"] = savings
        item["pros"] = [
            f"{l['tgp_watts']}W Maximum TGP Power",
            f"{l['thermal']['fan_count']}-Fan Cooling ({l['thermal']['noise_level_db']}dB)",
            f"{l['benchmarks']['cinebench_r23_multi']:,} Cinebench R23 Score"
        ]
        item["cons"] = [
            f"Weight: {l['weight_kg']} kg",
            f"Peak Surface Temp: {l['thermal']['peak_surface_temp_c']}°C"
        ]
        comparison_matrix.append(item)
        
    return {
        "count": len(comparison_matrix),
        "unidays_active": payload.unidays_active,
        "total_student_savings_inr": total_student_savings if payload.unidays_active else 0,
        "laptops": comparison_matrix
    }


@app.post("/api/chat")
@app.post("/api/chatbot")
def chat_advisor(payload: ChatRequest):
    """Hardware AI Advisor endpoint answering technical, TGP, thermal, and discount queries."""
    active_laptops = rank_laptops(LAPTOPS_DATA, unidays_active=payload.unidays_active)
    return generate_chat_response(payload.query, active_laptops)


@app.get("/api/currency-rates")
def get_currency_rates():
    """Retrieve live multi-currency exchange rates (INR, USD, EUR, GBP, AED, CAD, AUD)."""
    from services.currency import get_live_exchange_rates
    return get_live_exchange_rates()


@app.get("/api/live-price/{laptop_id}")
def get_live_laptop_price(laptop_id: str):
    """Fetch live retailer prices from Amazon/Flipkart via RapidAPI/SerpAPI."""
    from services.prices import fetch_live_retailer_prices
    laptop = next((l for l in LAPTOPS_DATA if l["id"] == laptop_id), None)
    if not laptop:
        raise HTTPException(status_code=404, detail="Laptop not found")
    return fetch_live_retailer_prices(laptop["name"], laptop["price_inr"])


class StudentVerifyRequest(BaseModel):
    email: str
    id_token: Optional[str] = ""


@app.post("/api/verify-student")
def verify_student(payload: StudentVerifyRequest):
    """Verify student credentials via academic domain or Firebase Auth API."""
    from services.auth import verify_student_credentials
    return verify_student_credentials(payload.email, payload.id_token or "")


class CopartYardsRequest(BaseModel):
    query: str = "dallas"
    api_key: Optional[str] = None


@app.post("/api/copart/yards")
@app.get("/api/copart/yards")
def get_copart_yards(query: Optional[str] = Query("dallas"), payload: Optional[CopartYardsRequest] = None):
    """Fetch salvage yards from Copart Salvage Auto Auction API via RapidAPI."""
    from services.copart import fetch_copart_yards
    target_query = payload.query if (payload and payload.query) else (query or "dallas")
    api_key_override = payload.api_key if payload else None
    return fetch_copart_yards(query=target_query, api_key=api_key_override)


@app.get("/api/predict-rating/{laptop_id}")
def predict_laptop_rating(laptop_id: str):
    """Predict live AI performance rating scores via Groq LLM API."""
    from services.rating_predictor import predict_laptop_rating_groq
    laptop = next((l for l in LAPTOPS_DATA if l["id"] == laptop_id), None)
    if not laptop:
        raise HTTPException(status_code=404, detail="Laptop not found")
    return predict_laptop_rating_groq(laptop)


@app.get("/api/api-status")
def get_api_status():
    """Check connection status of all RECO Platform API keys."""
    return {
        "groq_ai": bool(os.getenv("GROQ_API_KEY", "").strip()),
        "gemini_ai": bool(os.getenv("GEMINI_API_KEY", "").strip()),
        "openai_ai": bool(os.getenv("OPENAI_API_KEY", "").strip()),
        "exchange_rate_api": bool(os.getenv("EXCHANGE_RATE_API_KEY", "").strip()),
        "rapidapi": bool(os.getenv("RAPIDAPI_KEY", "").strip()),
        "serpapi": bool(os.getenv("SERPAPI_KEY", "").strip()),
        "rainforest_api": bool(os.getenv("RAINFOREST_API_KEY", "").strip()),
        "keepa_api": bool(os.getenv("KEEPA_API_KEY", "").strip()),
        "firebase_auth": bool(os.getenv("FIREBASE_API_KEY", "").strip()),
        "database_url": bool(os.getenv("DATABASE_URL", "").strip()),
        "supabase_key": bool(os.getenv("SUPABASE_SECRET_KEY", "").strip() or os.getenv("SUPABASE_KEY", "").strip()),
        "env_file_loaded": True
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)

