"""
RECO AI Hardware & Student Discount Advisor
Provides expert hardware explanations, TGP trade-off advice, thermal architecture breakdowns,
and UNiDAYS discount guides with Gemini / OpenAI Live Generative AI integration & heuristic fallback.
"""

import os
from typing import Dict, Any, List, Optional

# Heuristic Knowledge Base Fallback
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


def _call_gemini_ai(api_key: str, query: str, context_str: str) -> Optional[str]:
    """Call Google Gemini Generative AI API for live hardware advice."""
    try:
        from google import genai
        client = genai.Client(api_key=api_key)
        prompt = (
            "You are RECO AI, an elite hardware engineering assistant and laptop buying advisor.\n"
            "Answer the user's question concisely using markdown, bold headers, and relevant emojis.\n"
            "Use the following real-time catalog data when relevant to make specific laptop recommendations:\n\n"
            f"{context_str}\n\n"
            f"User Question: {query}"
        )
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        return response.text
    except Exception as e:
        try:
            import google.generativeai as ggi
            ggi.configure(api_key=api_key)
            model = ggi.GenerativeModel("gemini-1.5-flash")
            prompt = (
                "You are RECO AI, an elite hardware engineering assistant and laptop buying advisor.\n"
                "Answer the user's question concisely using markdown, bold headers, and relevant emojis.\n"
                "Use the following real-time catalog data when relevant to make specific laptop recommendations:\n\n"
                f"{context_str}\n\n"
                f"User Question: {query}"
            )
            res = model.generate_content(prompt)
            return res.text
        except Exception as ex:
            print(f"[Gemini AI Error]: {ex}")
            return None


def _call_openai_ai(api_key: str, query: str, context_str: str) -> Optional[str]:
    """Call OpenAI API for live hardware advice."""
    try:
        from openai import OpenAI
        client = OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are RECO AI, an elite hardware engineering assistant and laptop buying advisor. "
                        "Answer user questions accurately using markdown, bold text, bullet points, and emojis. "
                        f"Here is current live catalog context:\n{context_str}"
                    )
                },
                {"role": "user", "content": query}
            ],
            max_tokens=400
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"[OpenAI Error]: {e}")
        return None


def _call_groq_ai(api_key: str, query: str, context_str: str) -> Optional[str]:
    """Call Groq API (Ultra-Fast Open Weights LLMs) for live hardware advice."""
    try:
        from openai import OpenAI
        client = OpenAI(
            api_key=api_key,
            base_url="https://api.groq.com/openai/v1"
        )
        
        candidate_models = [
            "llama-3.3-70b-versatile",
            "llama3-70b-8192",
            "mixtral-8x7b-32768",
            "llama-3.1-8b-instant"
        ]
        
        for model_name in candidate_models:
            try:
                response = client.chat.completions.create(
                    model=model_name,
                    messages=[
                        {
                            "role": "system",
                            "content": (
                                "You are RECO AI, an elite hardware engineering assistant and laptop buying advisor. "
                                "Answer user questions accurately using markdown, bold headers, bullet points, and emojis. "
                                f"Here is real-time laptop catalog context:\n{context_str}"
                            )
                        },
                        {"role": "user", "content": query}
                    ],
                    max_tokens=500
                )
                if response.choices and response.choices[0].message.content:
                    return response.choices[0].message.content
            except Exception as e:
                print(f"[Groq Model {model_name} Error]: {e}")
                continue
    except Exception as err:
        print(f"[Groq Client Error]: {err}")

    return None


def is_valid_key(key: str) -> bool:
    """Helper to check if API key is not empty and not a placeholder."""
    if not key:
        return False
    k = key.lower()
    return not ("your_" in k or "here" in k or "placeholder" in k or "sample" in k)


def generate_chat_response(query: str, active_laptops: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Parses user query and returns contextual hardware AI response."""
    groq_key = os.getenv("GROQ_API_KEY", "").strip()
    gemini_key = os.getenv("GEMINI_API_KEY", "").strip()
    openai_key = os.getenv("OPENAI_API_KEY", "").strip()
    
    # Prepare top 5 laptops context string for RAG
    laptop_summaries = []
    for l in active_laptops[:5]:
        t = l.get("thermal", {})
        b = l.get("benchmarks", {})
        price = l.get("effective_price_inr") or l.get("unidays_price_inr") or l.get("price_inr", 0)
        laptop_summaries.append(
            f"- {l['name']} ({l['brand']}): GPU {l['gpu']} ({l['tgp_watts']}W TGP), CPU {l['cpu']}, {l['ram_gb']}GB RAM, "
            f"Price: ₹{price:,}, Cinebench R23: {b.get('cinebench_r23_multi', 'N/A')}, "
            f"Cooling: {t.get('fan_count', 2)} fans ({t.get('noise_level_db', 'N/A')}dB, {t.get('peak_surface_temp_c', 'N/A')}°C)"
        )
    context_str = "\n".join(laptop_summaries)

    # 1. Try Groq API
    if is_valid_key(groq_key) and groq_key.startswith("gsk_"):
        ai_response = _call_groq_ai(groq_key, query, context_str)
        if ai_response:
            return {
                "query": query,
                "topic": "⚡ Groq Llama-3.3 AI Advisor (Ultra-Fast)",
                "response": ai_response,
                "api_connected": "Groq Llama-3.3 API",
                "suggested_prompts": [
                    "Which laptop has the best cooling thermal design?",
                    "Compare top 2 models for local LLM AI inference",
                    "Is UNiDAYS student discount worth it?",
                    "TGP Wattage breakdown for RTX 4070 vs 4080"
                ]
            }

    # 2. Try Gemini API
    if is_valid_key(gemini_key):
        ai_response = _call_gemini_ai(gemini_key, query, context_str)
        if ai_response:
            return {
                "query": query,
                "topic": "✨ Gemini AI Live Hardware Advisor",
                "response": ai_response,
                "api_connected": "Google Gemini API",
                "suggested_prompts": [
                    "Which laptop has the best cooling thermal design?",
                    "Compare top 2 models for local LLM AI inference",
                    "Is UNiDAYS student discount worth it?",
                    "TGP Wattage breakdown for RTX 4070 vs 4080"
                ]
            }

    # 3. Try OpenAI API
    if is_valid_key(openai_key):
        ai_response = _call_openai_ai(openai_key, query, context_str)
        if ai_response:
            return {
                "query": query,
                "topic": "🤖 OpenAI GPT Live Hardware Advisor",
                "response": ai_response,
                "api_connected": "OpenAI API",
                "suggested_prompts": [
                    "Which laptop has the best cooling thermal design?",
                    "Compare top 2 models for local LLM AI inference",
                    "Is UNiDAYS student discount worth it?",
                    "TGP Wattage breakdown for RTX 4070 vs 4080"
                ]
            }

    # 4. Fallback Heuristic matching rule engine
    q_lower = query.lower()
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
        matched_topic = "RECO Hardware Advisor"
        top_laptop = active_laptops[0] if active_laptops else None
        if top_laptop:
            matched_answer = (
                f"🤖 Based on current market evaluation, the **{top_laptop['name']}** is our top recommended choice. "
                f"It features a **{top_laptop['gpu']} ({top_laptop['tgp_watts']}W TGP)**, {top_laptop['ram_gb']}GB RAM, and a "
                f"thermal rating of {top_laptop['thermal']['noise_level_db']}dB noise level under peak load.\n\n"
                "💡 *Tip: Add your `GROQ_API_KEY` or `GEMINI_API_KEY` to `backend/.env` to enable full Generative AI reasoning!*"
            )
        else:
            matched_answer = (
                "🤖 Ask me anything about GPU TGP Wattage, Thermal Cooling, UNiDAYS Student Discounts, or compare specific laptop models!\n\n"
                "💡 *Tip: Add your `GROQ_API_KEY` or `GEMINI_API_KEY` to `backend/.env` to enable live AI responses!*"
            )

    return {
        "query": query,
        "topic": matched_topic,
        "response": matched_answer,
        "api_connected": None,
        "suggested_prompts": [
            "What is GPU TGP Wattage?",
            "How do I activate UNiDAYS student discount?",
            "OLED vs Mini-LED vs IPS screens?",
            "Best laptop for AAA Gaming under ₹1.5 Lakhs?"
        ]
    }
