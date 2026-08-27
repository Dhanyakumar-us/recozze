"""
RECO Real-Time Recommendation Pipeline & Session Behavioral Engine
Tracks user interaction events (views, filter tweaks, comparisons, search intent),
maintains dynamic session preference vectors, and computes real-time recommendation boosts.
"""

import time
import threading
from typing import Dict, List, Any, Optional

class RealtimeSessionManager:
    """In-memory session manager with thread-safe event storage and TTL cleanup."""
    def __init__(self, ttl_seconds: int = 3600):
        self.ttl_seconds = ttl_seconds
        self.sessions: Dict[str, Dict[str, Any]] = {}
        self._lock = threading.Lock()

    def _get_or_create_session(self, session_id: str) -> Dict[str, Any]:
        now = time.time()
        if session_id not in self.sessions:
            self.sessions[session_id] = {
                "created_at": now,
                "last_active": now,
                "events": [],
                "preferred_brands": {},
                "high_tgp_interest_count": 0,
                "ram_interest_count": 0,
                "cooling_interest_count": 0,
                "viewed_laptop_ids": [],
                "compared_laptop_ids": []
            }
        session = self.sessions[session_id]
        session["last_active"] = now
        return session

    def track_event(
        self,
        session_id: str,
        event_type: str,
        laptop_id: Optional[str] = None,
        laptop_data: Optional[Dict[str, Any]] = None,
        context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Record an event (view_laptop, filter_change, compare_laptop, search_query) for a session."""
        with self._lock:
            self._cleanup_expired()
            session = self._get_or_create_session(session_id)
            
            event_entry = {
                "event_type": event_type,
                "laptop_id": laptop_id,
                "timestamp": time.time(),
                "context": context or {}
            }
            session["events"].append(event_entry)

            # Analyze signals from laptop interactions
            if laptop_id and laptop_id not in session["viewed_laptop_ids"] and event_type == "view_laptop":
                session["viewed_laptop_ids"].append(laptop_id)

            if laptop_id and laptop_id not in session["compared_laptop_ids"] and event_type == "compare_laptop":
                session["compared_laptop_ids"].append(laptop_id)

            if laptop_data:
                brand = laptop_data.get("brand")
                if brand:
                    session["preferred_brands"][brand] = session["preferred_brands"].get(brand, 0) + 1
                
                tgp = laptop_data.get("tgp_watts", 45)
                if tgp >= 100:
                    session["high_tgp_interest_count"] += 1
                
                ram = laptop_data.get("ram_gb", 16)
                if ram >= 32:
                    session["ram_interest_count"] += 1
                
                thermal = laptop_data.get("thermal", {})
                if thermal.get("vapor_chamber") or thermal.get("liquid_metal"):
                    session["cooling_interest_count"] += 1

            # Analyze signals from context (e.g. filter changes)
            if context:
                tgp_tier = context.get("tgp_tier")
                if tgp_tier == "unlocked":
                    session["high_tgp_interest_count"] += 1
                
                ram_min = context.get("ram_min")
                if ram_min and ram_min >= 32:
                    session["ram_interest_count"] += 1

            return {
                "status": "success",
                "session_id": session_id,
                "total_events": len(session["events"]),
                "signals": {
                    "high_tgp_interest": session["high_tgp_interest_count"],
                    "ram_interest": session["ram_interest_count"],
                    "cooling_interest": session["cooling_interest_count"],
                    "viewed_count": len(session["viewed_laptop_ids"])
                }
            }

    def get_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        with self._lock:
            return self.sessions.get(session_id)

    def _cleanup_expired(self):
        now = time.time()
        expired = [
            sid for sid, sdata in self.sessions.items()
            if now - sdata["last_active"] > self.ttl_seconds
        ]
        for sid in expired:
            del self.sessions[sid]

# Global session manager singleton
realtime_manager = RealtimeSessionManager()


def apply_realtime_boosts(
    laptops: List[Dict[str, Any]],
    session_id: Optional[str] = None
) -> List[Dict[str, Any]]:
    """Applies dynamic real-time scoring boosts based on user session signals."""
    if not session_id:
        return laptops

    session = realtime_manager.get_session(session_id)
    if not session or not session.get("events"):
        return laptops

    high_tgp_interest = session.get("high_tgp_interest_count", 0)
    ram_interest = session.get("ram_interest_count", 0)
    cooling_interest = session.get("cooling_interest_count", 0)
    viewed_ids = session.get("viewed_laptop_ids", [])
    compared_ids = session.get("compared_laptop_ids", [])
    preferred_brands = session.get("preferred_brands", {})

    boosted_laptops = []
    for laptop in laptops:
        item = dict(laptop)
        base_score = item.get("calculated_match_pct", 75.0)
        boost = 0.0
        reasons = []

        # 1. High TGP Affinity Boost
        tgp = item.get("tgp_watts", 45)
        if high_tgp_interest >= 2 and tgp >= 120:
            boost += 4.5
            reasons.append(f"⚡ Boosted for High TGP preference ({tgp}W)")

        # 2. Advanced Thermal / Vapor Chamber Affinity Boost
        thermal = item.get("thermal", {})
        if cooling_interest >= 2 and (thermal.get("vapor_chamber") or thermal.get("liquid_metal")):
            boost += 3.5
            reasons.append("❄️ Premium Liquid Metal / Vapor Chamber Cooling")

        # 3. High RAM Capacity Boost
        ram = item.get("ram_gb", 16)
        if ram_interest >= 2 and ram >= 32:
            boost += 3.0
            reasons.append(f"🧠 High Memory capacity ({ram}GB RAM)")

        # 4. Brand Affinity Boost
        brand = item.get("brand")
        if brand and preferred_brands.get(brand, 0) >= 2:
            boost += 2.5
            reasons.append(f"🏷️ Matches your frequent interest in {brand}")

        # 5. Compared Model Boost
        if item["id"] in compared_ids:
            boost += 2.0
            reasons.append("⚖️ Currently pinned in your side-by-side comparison")

        # Calculate final realtime score capped at 99.5
        realtime_score = round(min(99.5, base_score + boost), 1)
        item["realtime_score"] = realtime_score
        item["calculated_match_pct"] = realtime_score
        item["realtime_boost_reason"] = " • ".join(reasons) if reasons else None
        boosted_laptops.append(item)

    # Re-sort laptops by dynamic real-time score descending
    boosted_laptops.sort(key=lambda x: x.get("realtime_score", x.get("calculated_match_pct", 0)), reverse=True)
    return boosted_laptops
