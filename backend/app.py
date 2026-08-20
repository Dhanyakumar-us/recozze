"""
RECO — Intelligent Laptop Recommendation & Price Forecasting Engine
FastAPI Backend Application
"""

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from database import LAPTOPS_DATA, MARKET_TRENDS_DATA
from recommendation.engine import rank_laptops
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


class RecommendRequest(BaseModel):
    workload: str = "student"
    budget_min: float = 40000
    budget_max: float = 350000
    ram_min: int = 8
    tgp_tier: Optional[str] = None
    unidays_active: bool = False
    search_query: Optional[str] = None


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
    search: Optional[str] = Query(None, description="Search keyword")
):
    """Retrieve filtered and ranked laptops based on hardware & budget criteria."""
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
    return {
        "count": len(ranked),
        "workload": workload,
        "unidays_active": unidays_active,
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


@app.post("/api/recommend")
def recommend_laptops(payload: RecommendRequest):
    """POST endpoint for advanced multi-factor laptop ranking."""
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
    return {
        "count": len(ranked),
        "workload": payload.workload,
        "unidays_active": payload.unidays_active,
        "laptops": ranked
    }


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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
