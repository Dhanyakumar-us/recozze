"""
RECO Student Auth & Verification Service
Handles student .edu/.ac.in domain validation and Firebase Auth integration (FIREBASE_API_KEY).
"""

import os
import requests
from typing import Dict, Any

def verify_student_credentials(email: str, id_token: str = "") -> Dict[str, Any]:
    """Verifies student status via .edu / .ac.in academic domain or Firebase Auth REST API."""
    firebase_key = os.getenv("FIREBASE_API_KEY", "").strip()

    email_lower = email.lower().strip()
    is_academic_domain = any(email_lower.endswith(domain) for domain in [
        ".edu", ".ac.in", ".edu.in", ".ac.uk", ".edu.au", ".std.edu"
    ])

    if firebase_key and id_token:
        try:
            # Firebase Auth REST API verifyIdToken endpoint
            url = f"https://identitytoolkit.googleapis.com/v1/accounts:lookup?key={firebase_key}"
            res = requests.post(url, json={"idToken": id_token}, timeout=5)
            if res.status_code == 200:
                user_info = res.json().get("users", [{}])[0]
                user_email = user_info.get("email", email_lower)
                is_academic = any(user_email.endswith(d) for d in [".edu", ".ac.in", ".edu.in"])
                return {
                    "verified": True,
                    "email": user_email,
                    "auth_provider": "Firebase Auth (Connected API Key)",
                    "student_discount_active": is_academic or is_academic_domain,
                    "unidays_perks_unlocked": ["7-15% Instant Discount", "₹10,000 Cashback", "Free ADP Warranty"]
                }
        except Exception as e:
            print(f"[Firebase Auth Error]: {e}")

    # Fallback / Domain validation
    return {
        "verified": is_academic_domain,
        "email": email,
        "auth_provider": "RECO Academic Verification",
        "student_discount_active": is_academic_domain,
        "unidays_perks_unlocked": ["7-15% Instant Discount", "Cashback Voucher", "Bundled Accessories"] if is_academic_domain else [],
        "api_connected": "Firebase API Key" if firebase_key else "Local Domain Validator"
    }
