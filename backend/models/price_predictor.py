"""
RECO Price Forecasting Model
Provides predictive analysis for laptop market prices, Buy Now vs Wait recommendation signals,
and upcoming festival discount impacts.
"""

from typing import Dict, Any, List

def forecast_laptop_price(laptop: Dict[str, Any], unidays_active: bool = False) -> Dict[str, Any]:
    """Generates 6-month projected price trend and Buy vs Wait signal."""
    current_price = laptop["unidays_price_inr"] if unidays_active else laptop["price_inr"]
    rec = laptop.get("buy_recommendation", {})
    history = laptop.get("price_history", [])
    
    # Calculate 6-month projected monthly prices
    projected = []
    base_price = current_price
    drop_pct = rec.get("projected_drop_pct", 5.0) / 100.0
    
    months = ["Feb 2026", "Mar 2026", "Apr 2026", "May 2026", "Jun 2026", "Jul 2026"]
    
    for idx, m in enumerate(months):
        if rec.get("status") == "WAIT":
            # Price drops ahead of target sale (month 1-2) then plateaus
            factor = 1.0 - (drop_pct * min(1.0, (idx + 1) / 2.0))
        else:
            # BUY NOW status - stable price with slight seasonal fluctuation
            factor = 1.0 - (0.01 * (idx % 2))
            
        projected.append({
            "month": m,
            "projected_price": int(base_price * factor),
            "savings_vs_today": int(base_price * (1.0 - factor))
        })
        
    return {
        "laptop_id": laptop["id"],
        "laptop_name": laptop["name"],
        "current_price": current_price,
        "recommendation_status": rec.get("status", "BUY_NOW"),
        "target_sale": rec.get("target_sale", "Current Best Price"),
        "projected_drop_pct": rec.get("projected_drop_pct", 0.0),
        "reasoning": rec.get("reasoning", "Optimal price stability window."),
        "historical_prices": history,
        "six_month_forecast": projected
    }
