"""
RECO Multi-Factor Recommendation & Ranking Engine
Evaluates TGP wattage, thermal cooling capacity, synthetic benchmarks, RAM overhead,
and student discount values to compute precise Workload Match % and Power Ratings.
"""

from typing import List, Dict, Any, Optional

WORKLOAD_PROFILES = {
    "aaa_gaming": {
        "tgp_weight": 0.35,
        "benchmark_gpu_weight": 0.25,
        "thermal_weight": 0.20,
        "ram_weight": 0.10,
        "display_weight": 0.10,
        "min_recommended_tgp": 100
    },
    "esports": {
        "tgp_weight": 0.20,
        "benchmark_cpu_weight": 0.25,
        "display_weight": 0.35,  # Refresh rate priority
        "ram_weight": 0.10,
        "thermal_weight": 0.10,
        "min_recommended_tgp": 60
    },
    "ai_ml": {
        "tgp_weight": 0.30,
        "ram_weight": 0.35,
        "benchmark_gpu_weight": 0.20,
        "thermal_weight": 0.15,
        "min_recommended_tgp": 90
    },
    "creator": {
        "display_weight": 0.30,
        "ram_weight": 0.25,
        "benchmark_cpu_weight": 0.25,
        "thermal_weight": 0.10,
        "tgp_weight": 0.10,
        "min_recommended_tgp": 45
    },
    "student": {
        "price_value_weight": 0.35,
        "battery_weight": 0.25,
        "weight_kg_weight": 0.20,
        "ram_weight": 0.10,
        "display_weight": 0.10,
        "min_recommended_tgp": 25
    },
    "everyday": {
        "price_value_weight": 0.40,
        "battery_weight": 0.30,
        "weight_kg_weight": 0.20,
        "display_weight": 0.10,
        "min_recommended_tgp": 25
    }
}

def calculate_match_score(
    laptop: Dict[str, Any],
    workload: str,
    budget_max: float,
    unidays_active: bool = False
) -> float:
    """Computes a 0 to 100 Match Percentage for a laptop against a workload profile."""
    profile = WORKLOAD_PROFILES.get(workload, WORKLOAD_PROFILES["student"])
    effective_price = laptop["unidays_price_inr"] if unidays_active else laptop["price_inr"]
    
    score = 70.0  # Base match
    
    # 1. Budget Fit Score
    if effective_price <= budget_max:
        budget_ratio = effective_price / budget_max
        # Rewarded for utilizing budget efficiently without exceeding
        budget_score = 100.0 if budget_ratio > 0.6 else (budget_ratio * 140)
    else:
        # Penalty for exceeding budget
        over_pct = (effective_price - budget_max) / budget_max
        budget_score = max(0.0, 100.0 - (over_pct * 250.0))
        
    score += (budget_score - 70.0) * profile.get("price_value_weight", 0.15)
    
    # 2. TGP & Hardware Power Score
    tgp = laptop.get("tgp_watts", 45)
    min_tgp = profile.get("min_recommended_tgp", 45)
    if tgp >= min_tgp:
        tgp_score = min(100.0, 75.0 + ((tgp - min_tgp) / 100.0) * 25.0)
    else:
        tgp_score = max(30.0, 75.0 - ((min_tgp - tgp) * 1.5))
    score += (tgp_score - 70.0) * profile.get("tgp_weight", 0.15)
    
    # 3. Thermal Efficiency Score
    thermal = laptop.get("thermal", {})
    surface_temp = thermal.get("peak_surface_temp_c", 42.0)
    noise_db = thermal.get("noise_level_db", 45.0)
    # Lower surface temp and noise = better thermal score
    thermal_score = max(40.0, 100.0 - (surface_temp - 35.0) * 3.0 - (noise_db - 35.0) * 1.5)
    if thermal.get("vapor_chamber"):
        thermal_score += 5.0
    if thermal.get("liquid_metal"):
        thermal_score += 5.0
    thermal_score = min(100.0, thermal_score)
    score += (thermal_score - 70.0) * profile.get("thermal_weight", 0.15)

    # 4. RAM Capacity Score
    ram = laptop.get("ram_gb", 16)
    if workload in ["ai_ml", "creator"]:
        ram_score = 100.0 if ram >= 32 else (70.0 if ram >= 16 else 40.0)
    else:
        ram_score = 100.0 if ram >= 16 else 60.0
    score += (ram_score - 70.0) * profile.get("ram_weight", 0.10)

    # 5. Workload Tag Boost
    if workload in laptop.get("workloads", []):
        score += 8.0

    return round(max(35.0, min(99.0, score)), 1)


def rank_laptops(
    laptops: List[Dict[str, Any]],
    workload: str = "student",
    budget_min: float = 40000,
    budget_max: float = 350000,
    ram_min: int = 8,
    tgp_tier: Optional[str] = None,
    unidays_active: bool = False,
    search_query: Optional[str] = None
) -> List[Dict[str, Any]]:
    """Filters, ranks, and annotates laptops with computed match scores."""
    filtered = []
    
    for laptop in laptops:
        price = laptop["unidays_price_inr"] if unidays_active else laptop["price_inr"]
        
        # Hard filters
        if price < budget_min or price > budget_max:
            continue
        if laptop["ram_gb"] < ram_min:
            continue
            
        # TGP Tier filtering
        tgp = laptop.get("tgp_watts", 45)
        if tgp_tier == "thin_light" and tgp > 50:
            continue
        elif tgp_tier == "balanced" and (tgp < 50 or tgp > 120):
            continue
        elif tgp_tier == "unlocked" and tgp < 120:
            continue

        # Search query matching
        if search_query:
            q = search_query.lower()
            text = f"{laptop['name']} {laptop['brand']} {laptop['cpu']} {laptop['gpu']}".lower()
            if q not in text:
                continue

        # Calculate match percentage
        match_pct = calculate_match_score(laptop, workload, budget_max, unidays_active)
        
        # Create augmented object
        item = dict(laptop)
        item["calculated_match_pct"] = match_pct
        item["effective_price_inr"] = price
        filtered.append(item)

    # Rank by calculated match score descending
    filtered.sort(key=lambda x: x["calculated_match_pct"], reverse=True)
    return filtered
