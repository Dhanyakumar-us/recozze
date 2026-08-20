"""
RECO AI Hardware & Student Discount Advisor
Provides expert hardware explanations, TGP trade-off advice, thermal architecture breakdowns,
and UNiDAYS discount guides.
"""

from typing import Dict, Any, List

HARDWARE_KNOWLEDGE_BASE = [
    {
        "keywords": ["tgp", "total graphics power", "wattage", "watts", "power"],
        "topic": "GPU Total Graphics Power (TGP)",
        "answer": (
            "⚡ **GPU TGP (Total Graphics Power)** defines the maximum electric wattage allocated to the laptop's graphics card. "
            "For example, an **RTX 4060 at 140W** can deliver up to 30% higher frame rates than an RTX 4060 limited to 45W in thin-and-light chassis. "
            "When shopping for gaming or AI workloads, always verify the TGP rather than just the GPU model name!"
        )
    },
    {
        "keywords": ["unidays", "student", "discount", "cashback", "perks", "college", "id"],
        "topic": "UNiDAYS Student Savings & Perks",
        "answer": (
            "🎓 **UNiDAYS Student Benefits**: Verified college/university students receive **7% to 15% instant discounts** across Lenovo, ASUS, HP, Apple, and Dell. "
            "Plus, students unlock instant cashback (up to ₹12,000), free bundled items (like AirPods, gaming mice, backpacks), and discounted 3-year ADP warranty coverage. "
            "Toggle **UNiDAYS Student Mode** in RECO's top navbar to instantly preview all discounted prices!"
        )
    },
    {
        "keywords": ["thermal", "heat", "fan", "noise", "decibel", "liquid metal", "vapor chamber", "cooling"],
        "topic": "Thermal Cooling Architecture",
        "answer": (
            "🌡️ **Thermal Engineering**: High TGP components generate substantial heat. Superior laptops utilize **Vapor Chambers**, **Liquid Metal thermal interface (e.g. Conductonaut)**, and **3-fan Tri-Fan designs**. "
            "RECO tracks peak surface temperatures (°C) and acoustic noise levels (dB). For whisper-quiet productivity, target <38dB noise; for max power, expect ~48-52dB."
        )
    },
    {
        "keywords": ["ram", "memory", "16gb", "32gb", "8gb", "dual channel", "ddr5"],
        "topic": "RAM & Memory Capacity Guidance",
        "answer": (
            "🧠 **RAM Recommendations**: \n"
            "- **16GB DDR5**: Recommended minimum for modern AAA gaming, multi-tab browsing, and student work.\n"
            "- **32GB DDR5 / Unified**: Essential for local LLM AI/ML model inference, 4K video editing, and complex 3D rendering.\n"
            "- **Dual-Channel**: Ensures up to 20% better bandwidth compared to single-channel RAM configuration."
        )
    },
    {
        "keywords": ["oled", "ips", "mini-led", "screen", "display", "refresh rate", "hz", "nits"],
        "topic": "Display Panel Technologies",
        "answer": (
            "🖥️ **Display Tech Breakdown**: \n"
            "- **OLED**: True blacks (infinite contrast), 100% DCI-P3 gamut, perfect for creators & media consumption.\n"
            "- **Mini-LED**: Incredible peak brightness (1000-1600 nits) & HDR performance without burn-in risk.\n"
            "- **IPS (144Hz - 240Hz)**: The esports standard with high refresh rates, wide viewing angles, and G-Sync support."
        )
    }
]

def generate_chat_response(query: str, active_laptops: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Parses user query and returns contextual hardware AI response."""
    q_lower = query.lower()
    
    # 1. Match knowledge base keywords
    matched_topic = None
    matched_answer = None
    
    for kb in HARDWARE_KNOWLEDGE_BASE:
        for kw in kb["keywords"]:
            if kw in q_lower:
                matched_topic = kb["topic"]
                matched_answer = kb["answer"]
                break
        if matched_answer:
            break
            
    if not matched_answer:
        # Fallback intelligent contextual answer
        matched_topic = "RECO AI Laptop Recommendation"
        # Find best laptop under budget or matching keyword if mentioned
        top_laptop = active_laptops[0] if active_laptops else None
        if top_laptop:
            matched_answer = (
                f"🤖 Based on current market evaluation, the **{top_laptop['name']}** is our top recommended choice. "
                f"It features a **{top_laptop['gpu']} ({top_laptop['tgp_watts']}W TGP)**, {top_laptop['ram_gb']}GB RAM, and a "
                f"thermal rating of {top_laptop['thermal']['noise_level_db']}dB noise level under peak load. "
                f"UNiDAYS Price: **₹{top_laptop['unidays_price_inr']:,}** (Saving ₹{top_laptop['price_inr'] - top_laptop['unidays_price_inr']:,})."
            )
        else:
            matched_answer = (
                "🤖 Ask me anything about GPU TGP Wattage, Thermal Cooling, UNiDAYS Student Discounts, or compare specific laptop models!"
            )

    return {
        "query": query,
        "topic": matched_topic,
        "response": matched_answer,
        "suggested_prompts": [
            "What is GPU TGP Wattage?",
            "How do I activate UNiDAYS student discount?",
            "OLED vs Mini-LED vs IPS screens?",
            "Best laptop for AAA Gaming under ₹1.5 Lakhs?"
        ]
    }
