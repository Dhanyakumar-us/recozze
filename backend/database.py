"""
RECO Engine Database Layer
Provides typed laptop datasets, thermal metrics, benchmark scores, student benefits,
historical price tracking, and component market index trends.
Structured for PostgreSQL / Supabase migration compatibility.
"""

from typing import List, Dict, Any, Optional

LAPTOPS_DATA: List[Dict[str, Any]] = [
    {
        "id": "legion-pro-7i-gen9",
        "name": "Lenovo Legion Pro 7i Gen 9",
        "brand": "Lenovo",
        "price_inr": 249990,
        "unidays_price_inr": 224990,
        "student_cashback_inr": 10000,
        "bundled_items": ["Legion M600 Wireless Mouse", "Legion Armor Backpack", "3-Year ADP Warranty"],
        "warranty_months": 36,
        "cpu": "Intel Core i9-14900HX (24-Core, 5.8 GHz)",
        "gpu": "NVIDIA GeForce RTX 4080 Laptop",
        "tgp_watts": 175,
        "ram_gb": 32,
        "ram_type": "DDR5-5600MHz Dual-Channel",
        "storage_gb": 1024,
        "storage_type": "PCIe Gen4 NVMe SSD",
        "display": {
            "size_inches": 16.0,
            "resolution": "2560 x 1600 (WQXGA)",
            "refresh_rate_hz": 240,
            "panel_type": "IPS G-Sync",
            "brightness_nits": 500,
            "color_gamut": "100% DCI-P3"
        },
        "battery_wh": 99.9,
        "battery_hours_real_world": 5.5,
        "weight_kg": 2.62,
        "thermal": {
            "fan_count": 2,
            "heat_pipe_count": 6,
            "vapor_chamber": True,
            "peak_surface_temp_c": 41.5,
            "noise_level_db": 48.2,
            "liquid_metal": True,
            "architecture_desc": "Legion Coldfront 5.0 Vapor Chamber + Liquid Metal on CPU"
        },
        "benchmarks": {
            "cinebench_r23_multi": 34500,
            "time_spy_gpu": 19400,
            "geekbench_6_multi": 17800
        },
        "workloads": ["aaa_gaming", "ai_ml", "creator", "esports"],
        "power_rating_10": 9.8,
        "image_url": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://www.lenovo.com/in/en/p/laptops/legion-laptops/legion-7-series/legion-pro-7i-gen-9",
            "amazon": "https://www.amazon.in/dp/B0D1LEGION7I",
            "flipkart": "https://www.flipkart.com/search?q=legion+pro+7i+gen+9"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 269990},
            {"date": "2025-10-15", "price": 254990},
            {"date": "2025-11-20", "price": 259990},
            {"date": "2025-12-10", "price": 249990},
            {"date": "2026-01-15", "price": 249990},
            {"date": "2026-02-01", "price": 249990}
        ],
        "buy_recommendation": {
            "status": "WAIT",
            "target_sale": "Back to College Sale (March 2026)",
            "projected_drop_pct": 8.5,
            "reasoning": "NAND SSD surplus will drive down Gen9 prices ahead of Gen10 announcements in Q2."
        }
    },
    {
        "id": "rog-strix-g16-2024",
        "name": "ASUS ROG Strix G16 (2024)",
        "brand": "ASUS",
        "price_inr": 179990,
        "unidays_price_inr": 164990,
        "student_cashback_inr": 7500,
        "bundled_items": ["ROG Impact Gaming Mouse", "ROG Backpack", "Xbox Game Pass 3 Months"],
        "warranty_months": 24,
        "cpu": "Intel Core i7-14700HX (20-Core, 5.5 GHz)",
        "gpu": "NVIDIA GeForce RTX 4070 Laptop",
        "tgp_watts": 140,
        "ram_gb": 16,
        "ram_type": "DDR5-5600MHz",
        "storage_gb": 1024,
        "storage_type": "PCIe Gen4 NVMe SSD",
        "display": {
            "size_inches": 16.0,
            "resolution": "2560 x 1600 (Nebula Display)",
            "refresh_rate_hz": 240,
            "panel_type": "IPS G-Sync",
            "brightness_nits": 500,
            "color_gamut": "100% DCI-P3"
        },
        "battery_wh": 90.0,
        "battery_hours_real_world": 6.0,
        "weight_kg": 2.50,
        "thermal": {
            "fan_count": 3,
            "heat_pipe_count": 7,
            "vapor_chamber": False,
            "peak_surface_temp_c": 42.0,
            "noise_level_db": 46.8,
            "liquid_metal": True,
            "architecture_desc": "Tri-Fan Technology + Conductonaut Extreme Liquid Metal"
        },
        "benchmarks": {
            "cinebench_r23_multi": 28900,
            "time_spy_gpu": 12850,
            "geekbench_6_multi": 15400
        },
        "workloads": ["aaa_gaming", "esports", "ai_ml", "student"],
        "power_rating_10": 9.2,
        "image_url": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://rog.asus.com/in/laptops/rog-strix/rog-strix-g16-2024-series/",
            "amazon": "https://www.amazon.in/dp/B0D1STRIXG16",
            "flipkart": "https://www.flipkart.com/search?q=rog+strix+g16+2024"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 194990},
            {"date": "2025-10-15", "price": 182990},
            {"date": "2025-11-20", "price": 179990},
            {"date": "2025-12-10", "price": 179990},
            {"date": "2026-01-15", "price": 179990},
            {"date": "2026-02-01", "price": 179990}
        ],
        "buy_recommendation": {
            "status": "BUY_NOW",
            "target_sale": "Current Price is Optimal",
            "projected_drop_pct": 2.0,
            "reasoning": "Price has stabilized post-festival sales with UNiDAYS providing an effective ₹22,500 total savings."
        }
    },
    {
        "id": "macbook-pro-16-m3-max",
        "name": "Apple MacBook Pro 16 M3 Max",
        "brand": "Apple",
        "price_inr": 349900,
        "unidays_price_inr": 319900,
        "student_cashback_inr": 10000,
        "bundled_items": ["AirPods 3rd Gen (Free with Student ID)", "AppleCare+ 20% Discount"],
        "warranty_months": 12,
        "cpu": "Apple M3 Max (16-Core CPU, 40-Core GPU)",
        "gpu": "Apple M3 Max Integrated 40-Core GPU",
        "tgp_watts": 100,
        "ram_gb": 48,
        "ram_type": "Unified Memory (300 GB/s)",
        "storage_gb": 1024,
        "storage_type": "Apple Ultra-Fast NVMe SSD",
        "display": {
            "size_inches": 16.2,
            "resolution": "3456 x 2234 (Liquid Retina XDR)",
            "refresh_rate_hz": 120,
            "panel_type": "Mini-LED ProMotion",
            "brightness_nits": 1600,
            "color_gamut": "100% P3 Wide Color"
        },
        "battery_wh": 100.0,
        "battery_hours_real_world": 18.5,
        "weight_kg": 2.14,
        "thermal": {
            "fan_count": 2,
            "heat_pipe_count": 2,
            "vapor_chamber": False,
            "peak_surface_temp_c": 36.8,
            "noise_level_db": 34.5,
            "liquid_metal": False,
            "architecture_desc": "Ultra-Quiet Dual Fan Unibody Aluminum Heatsink System"
        },
        "benchmarks": {
            "cinebench_r23_multi": 24200,
            "time_spy_gpu": 14600,
            "geekbench_6_multi": 21300
        },
        "workloads": ["creator", "ai_ml", "student", "everyday"],
        "power_rating_10": 9.7,
        "image_url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://www.apple.com/in/shop/buy-mac/macbook-pro/16-inch",
            "amazon": "https://www.amazon.in/dp/B0CM5KMBP16",
            "flipkart": "https://www.flipkart.com/search?q=macbook+pro+16+m3+max"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 349900},
            {"date": "2025-10-15", "price": 349900},
            {"date": "2025-11-20", "price": 349900},
            {"date": "2025-12-10", "price": 349900},
            {"date": "2026-01-15", "price": 349900},
            {"date": "2026-02-01", "price": 349900}
        ],
        "buy_recommendation": {
            "status": "BUY_NOW",
            "target_sale": "Apple Education Promo Active",
            "projected_drop_pct": 0.0,
            "reasoning": "Apple pricing remains fixed; UNiDAYS education bundle (Free AirPods + ₹30,000 instant cut) represents peak value."
        }
    },
    {
        "id": "lenovo-loq-15-2024",
        "name": "Lenovo LOQ 15 (2024)",
        "brand": "Lenovo",
        "price_inr": 78990,
        "unidays_price_inr": 71990,
        "student_cashback_inr": 3500,
        "bundled_items": ["Lenovo IdeaPad Gaming Mouse", "Backpack"],
        "warranty_months": 24,
        "cpu": "AMD Ryzen 7 7435HS (8-Core, 4.5 GHz)",
        "gpu": "NVIDIA GeForce RTX 4050 Laptop",
        "tgp_watts": 105,
        "ram_gb": 16,
        "ram_type": "DDR5-4800MHz",
        "storage_gb": 512,
        "storage_type": "PCIe Gen4 NVMe SSD",
        "display": {
            "size_inches": 15.6,
            "resolution": "1920 x 1080 (FHD)",
            "refresh_rate_hz": 144,
            "panel_type": "IPS G-Sync",
            "brightness_nits": 300,
            "color_gamut": "100% sRGB"
        },
        "battery_wh": 60.0,
        "battery_hours_real_world": 4.5,
        "weight_kg": 2.38,
        "thermal": {
            "fan_count": 2,
            "heat_pipe_count": 4,
            "vapor_chamber": False,
            "peak_surface_temp_c": 43.8,
            "noise_level_db": 45.0,
            "liquid_metal": False,
            "architecture_desc": "Dual-Fan Hyperchamber Thermal Design"
        },
        "benchmarks": {
            "cinebench_r23_multi": 14800,
            "time_spy_gpu": 8600,
            "geekbench_6_multi": 11200
        },
        "workloads": ["esports", "student", "everyday", "aaa_gaming"],
        "power_rating_10": 8.1,
        "image_url": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://www.lenovo.com/in/en/p/laptops/loq/loq-15",
            "amazon": "https://www.amazon.in/dp/B0CFLOQ15",
            "flipkart": "https://www.flipkart.com/search?q=lenovo+loq+15"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 84990},
            {"date": "2025-10-15", "price": 76990},
            {"date": "2025-11-20", "price": 79990},
            {"date": "2025-12-10", "price": 78990},
            {"date": "2026-01-15", "price": 78990},
            {"date": "2026-02-01", "price": 78990}
        ],
        "buy_recommendation": {
            "status": "BUY_NOW",
            "target_sale": "Best Budget Choice",
            "projected_drop_pct": 3.5,
            "reasoning": "Unbeatable price-to-performance ratio under ₹80k with 105W unlocked RTX 4050."
        }
    },
    {
        "id": "asus-tuf-gaming-a15",
        "name": "ASUS TUF Gaming A15",
        "brand": "ASUS",
        "price_inr": 96990,
        "unidays_price_inr": 88990,
        "student_cashback_inr": 4000,
        "bundled_items": ["TUF Gaming Backpack", "TUF Mouse Pad"],
        "warranty_months": 12,
        "cpu": "AMD Ryzen 7 8845HS (8-Core AI PC)",
        "gpu": "NVIDIA GeForce RTX 4060 Laptop",
        "tgp_watts": 140,
        "ram_gb": 16,
        "ram_type": "DDR5-5600MHz",
        "storage_gb": 1024,
        "storage_type": "PCIe Gen4 NVMe SSD",
        "display": {
            "size_inches": 15.6,
            "resolution": "1920 x 1080 (FHD)",
            "refresh_rate_hz": 144,
            "panel_type": "IPS G-Sync",
            "brightness_nits": 300,
            "color_gamut": "100% sRGB"
        },
        "battery_wh": 90.0,
        "battery_hours_real_world": 8.0,
        "weight_kg": 2.20,
        "thermal": {
            "fan_count": 2,
            "heat_pipe_count": 5,
            "vapor_chamber": False,
            "peak_surface_temp_c": 41.0,
            "noise_level_db": 44.2,
            "liquid_metal": False,
            "architecture_desc": "Arc Flow Fans with 84 Blades & Self-Cleaning Dust Channels"
        },
        "benchmarks": {
            "cinebench_r23_multi": 16900,
            "time_spy_gpu": 10900,
            "geekbench_6_multi": 13100
        },
        "workloads": ["aaa_gaming", "esports", "ai_ml", "student"],
        "power_rating_10": 8.7,
        "image_url": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://www.asus.com/in/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-a15-2024/",
            "amazon": "https://www.amazon.in/dp/B0D1TUFA15",
            "flipkart": "https://www.flipkart.com/search?q=asus+tuf+a15+rtx+4060"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 104990},
            {"date": "2025-10-15", "price": 94990},
            {"date": "2025-11-20", "price": 98990},
            {"date": "2025-12-10", "price": 96990},
            {"date": "2026-01-15", "price": 96990},
            {"date": "2026-02-01", "price": 96990}
        ],
        "buy_recommendation": {
            "status": "BUY_NOW",
            "target_sale": "Prime Value Window",
            "projected_drop_pct": 2.5,
            "reasoning": "Full 140W RTX 4060 power delivery paired with 90Wh battery makes it the best sub-₹1 Lakh all-rounder."
        }
    },
    {
        "id": "hp-omen-16-2024",
        "name": "HP OMEN 16 (2024)",
        "brand": "HP",
        "price_inr": 139990,
        "unidays_price_inr": 127990,
        "student_cashback_inr": 6000,
        "bundled_items": ["HyperX Cloud II Gaming Headset", "OMEN Vector Mouse"],
        "warranty_months": 24,
        "cpu": "Intel Core i7-14700HX (20-Core)",
        "gpu": "NVIDIA GeForce RTX 4060 Laptop",
        "tgp_watts": 140,
        "ram_gb": 16,
        "ram_type": "DDR5-5600MHz",
        "storage_gb": 1024,
        "storage_type": "PCIe Gen4 NVMe SSD",
        "display": {
            "size_inches": 16.1,
            "resolution": "2560 x 1440 (QHD)",
            "refresh_rate_hz": 240,
            "panel_type": "IPS G-Sync",
            "brightness_nits": 300,
            "color_gamut": "100% sRGB"
        },
        "battery_wh": 83.0,
        "battery_hours_real_world": 5.0,
        "weight_kg": 2.37,
        "thermal": {
            "fan_count": 2,
            "heat_pipe_count": 5,
            "vapor_chamber": False,
            "peak_surface_temp_c": 39.5,
            "noise_level_db": 43.5,
            "liquid_metal": False,
            "architecture_desc": "OMEN Tempest Cooling with 4-sided Venting & IR Sensor"
        },
        "benchmarks": {
            "cinebench_r23_multi": 27400,
            "time_spy_gpu": 11200,
            "geekbench_6_multi": 15100
        },
        "workloads": ["aaa_gaming", "creator", "esports", "student"],
        "power_rating_10": 8.9,
        "image_url": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://www.hp.com/in-en/shop/laptops/omen-gaming.html",
            "amazon": "https://www.amazon.in/dp/B0D1HPOMEN16",
            "flipkart": "https://www.flipkart.com/search?q=hp+omen+16+2024"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 149990},
            {"date": "2025-10-15", "price": 136990},
            {"date": "2025-11-20", "price": 139990},
            {"date": "2025-12-10", "price": 139990},
            {"date": "2026-01-15", "price": 139990},
            {"date": "2026-02-01", "price": 139990}
        ],
        "buy_recommendation": {
            "status": "BUY_NOW",
            "target_sale": "UNiDAYS Bundle Benefit",
            "projected_drop_pct": 3.0,
            "reasoning": "Extremely quiet thermal profile (43.5dB) under heavy workload with free HyperX headset via UNiDAYS."
        }
    },
    {
        "id": "acer-predator-helios-16",
        "name": "Acer Predator Helios 16",
        "brand": "Acer",
        "price_inr": 199990,
        "unidays_price_inr": 182990,
        "student_cashback_inr": 8000,
        "bundled_items": ["Predator Cestus Gaming Mouse", "Predator Utility Backpack"],
        "warranty_months": 24,
        "cpu": "Intel Core i9-14900HX (24-Core)",
        "gpu": "NVIDIA GeForce RTX 4080 Laptop",
        "tgp_watts": 175,
        "ram_gb": 32,
        "ram_type": "DDR5-5600MHz",
        "storage_gb": 1024,
        "storage_type": "PCIe Gen4 RAID 0 SSD",
        "display": {
            "size_inches": 16.0,
            "resolution": "2560 x 1600 (WQXGA)",
            "refresh_rate_hz": 240,
            "panel_type": "Mini-LED 1000 nits",
            "brightness_nits": 1000,
            "color_gamut": "100% DCI-P3"
        },
        "battery_wh": 90.0,
        "battery_hours_real_world": 4.0,
        "weight_kg": 2.65,
        "thermal": {
            "fan_count": 2,
            "heat_pipe_count": 5,
            "vapor_chamber": False,
            "peak_surface_temp_c": 44.0,
            "noise_level_db": 51.0,
            "liquid_metal": True,
            "architecture_desc": "5th Gen AeroBlade 3D Metal Fans + Liquid Metal Thermal Grease"
        },
        "benchmarks": {
            "cinebench_r23_multi": 33900,
            "time_spy_gpu": 19100,
            "geekbench_6_multi": 17500
        },
        "workloads": ["aaa_gaming", "ai_ml", "creator"],
        "power_rating_10": 9.5,
        "image_url": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://store.acer.com/en-in/predator-helios-16",
            "amazon": "https://www.amazon.in/dp/B0D1HELIOS16",
            "flipkart": "https://www.flipkart.com/search?q=predator+helios+16+rtx+4080"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 219990},
            {"date": "2025-10-15", "price": 194990},
            {"date": "2025-11-20", "price": 199990},
            {"date": "2025-12-10", "price": 199990},
            {"date": "2026-01-15", "price": 199990},
            {"date": "2026-02-01", "price": 199990}
        ],
        "buy_recommendation": {
            "status": "WAIT",
            "target_sale": "Big Billion Days / Summer Sale",
            "projected_drop_pct": 7.0,
            "reasoning": "Mini-LED stock replenishment expected in April will push standard Helios 16 prices below ₹1.85 Lakh."
        }
    },
    {
        "id": "dell-xps-16-9640",
        "name": "Dell XPS 16 (9640)",
        "brand": "Dell",
        "price_inr": 289990,
        "unidays_price_inr": 264990,
        "student_cashback_inr": 12000,
        "bundled_items": ["Dell Premier Wireless ANC Headset", "3-Year Premium Support Plus"],
        "warranty_months": 36,
        "cpu": "Intel Core Ultra 9 185H (16-Core NPU)",
        "gpu": "NVIDIA GeForce RTX 4070 Laptop",
        "tgp_watts": 60,
        "ram_gb": 32,
        "ram_type": "LPDDR5X-7467MHz",
        "storage_gb": 1024,
        "storage_type": "PCIe Gen4 NVMe SSD",
        "display": {
            "size_inches": 16.3,
            "resolution": "3840 x 2400 (4K+ Touch)",
            "refresh_rate_hz": 120,
            "panel_type": "OLED Touch",
            "brightness_nits": 400,
            "color_gamut": "100% DCI-P3"
        },
        "battery_wh": 99.5,
        "battery_hours_real_world": 9.5,
        "weight_kg": 2.13,
        "thermal": {
            "fan_count": 2,
            "heat_pipe_count": 3,
            "vapor_chamber": True,
            "peak_surface_temp_c": 38.2,
            "noise_level_db": 38.0,
            "liquid_metal": False,
            "architecture_desc": "Ultra-Slim Vapor Chamber & Graphite Heat Spreading Sheets"
        },
        "benchmarks": {
            "cinebench_r23_multi": 18200,
            "time_spy_gpu": 9800,
            "geekbench_6_multi": 14100
        },
        "workloads": ["creator", "student", "everyday", "ai_ml"],
        "power_rating_10": 9.0,
        "image_url": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://www.dell.com/en-in/shop/dell-laptops/xps-16-laptop",
            "amazon": "https://www.amazon.in/dp/B0D1DELLXPS16",
            "flipkart": "https://www.flipkart.com/search?q=dell+xps+16+9640"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 299990},
            {"date": "2025-10-15", "price": 289990},
            {"date": "2025-11-20", "price": 289990},
            {"date": "2025-12-10", "price": 289990},
            {"date": "2026-01-15", "price": 289990},
            {"date": "2026-02-01", "price": 289990}
        ],
        "buy_recommendation": {
            "status": "BUY_NOW",
            "target_sale": "Corporate & Student Special",
            "projected_drop_pct": 1.5,
            "reasoning": "Supreme build luxury with 4K+ OLED screen and silent thermal engineering."
        }
    },
    {
        "id": "macbook-air-m3-15",
        "name": "Apple MacBook Air 15 M3",
        "brand": "Apple",
        "price_inr": 134900,
        "unidays_price_inr": 124900,
        "student_cashback_inr": 5000,
        "bundled_items": ["Free AirPods 3rd Gen (UNiDAYS Offer)"],
        "warranty_months": 12,
        "cpu": "Apple M3 (8-Core CPU, 10-Core GPU)",
        "gpu": "Apple M3 Integrated 10-Core GPU",
        "tgp_watts": 25,
        "ram_gb": 16,
        "ram_type": "Unified Memory",
        "storage_gb": 512,
        "storage_type": "Apple NVMe SSD",
        "display": {
            "size_inches": 15.3,
            "resolution": "2880 x 1864 (Liquid Retina)",
            "refresh_rate_hz": 60,
            "panel_type": "IPS True Tone",
            "brightness_nits": 500,
            "color_gamut": "100% P3"
        },
        "battery_wh": 66.5,
        "battery_hours_real_world": 15.0,
        "weight_kg": 1.51,
        "thermal": {
            "fan_count": 0,
            "heat_pipe_count": 0,
            "vapor_chamber": False,
            "peak_surface_temp_c": 39.0,
            "noise_level_db": 0.0,
            "liquid_metal": False,
            "architecture_desc": "Fanless Passive Thermal Dissipation Aluminum Unibody"
        },
        "benchmarks": {
            "cinebench_r23_multi": 10400,
            "time_spy_gpu": 3600,
            "geekbench_6_multi": 12100
        },
        "workloads": ["student", "everyday", "creator"],
        "power_rating_10": 8.8,
        "image_url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://www.apple.com/in/shop/buy-mac/macbook-air/15-inch",
            "amazon": "https://www.amazon.in/dp/B0CX23MACAIR15",
            "flipkart": "https://www.flipkart.com/search?q=macbook+air+15+m3"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 134900},
            {"date": "2025-10-15", "price": 134900},
            {"date": "2025-11-20", "price": 134900},
            {"date": "2025-12-10", "price": 134900},
            {"date": "2026-01-15", "price": 134900},
            {"date": "2026-02-01", "price": 134900}
        ],
        "buy_recommendation": {
            "status": "BUY_NOW",
            "target_sale": "Back to School Promotion",
            "projected_drop_pct": 0.0,
            "reasoning": "The absolute benchmark for thin-and-light battery endurance and zero-fan silence."
        }
    },
    {
        "id": "asus-zenbook-14-oled-2024",
        "name": "ASUS Zenbook 14 OLED (2024)",
        "brand": "ASUS",
        "price_inr": 109990,
        "unidays_price_inr": 99990,
        "student_cashback_inr": 5000,
        "bundled_items": ["ASUS Sleeve", "ASUS Pen 2.0 Stylus"],
        "warranty_months": 12,
        "cpu": "Intel Core Ultra 7 155H (16-Core NPU)",
        "gpu": "Intel Arc Graphics (Integrated 8 Xe Cores)",
        "tgp_watts": 28,
        "ram_gb": 16,
        "ram_type": "LPDDR5X-7467MHz",
        "storage_gb": 1024,
        "storage_type": "PCIe Gen4 NVMe SSD",
        "display": {
            "size_inches": 14.0,
            "resolution": "2880 x 1800 (3K OLED)",
            "refresh_rate_hz": 120,
            "panel_type": "OLED HDR True Black",
            "brightness_nits": 600,
            "color_gamut": "100% DCI-P3"
        },
        "battery_wh": 75.0,
        "battery_hours_real_world": 11.5,
        "weight_kg": 1.20,
        "thermal": {
            "fan_count": 1,
            "heat_pipe_count": 2,
            "vapor_chamber": False,
            "peak_surface_temp_c": 37.5,
            "noise_level_db": 33.0,
            "liquid_metal": False,
            "architecture_desc": "ASUS IceBlade Ultra-Quiet Single Fan Cooling"
        },
        "benchmarks": {
            "cinebench_r23_multi": 13900,
            "time_spy_gpu": 3900,
            "geekbench_6_multi": 12800
        },
        "workloads": ["student", "everyday", "creator", "ai_ml"],
        "power_rating_10": 9.1,
        "image_url": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://www.asus.com/in/laptops/for-home/zenbook/asus-zenbook-14-oled-ux3405/",
            "amazon": "https://www.amazon.in/dp/B0D1ZENBOOK14",
            "flipkart": "https://www.flipkart.com/search?q=zenbook+14+oled+ultra+7"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 114990},
            {"date": "2025-10-15", "price": 107990},
            {"date": "2025-11-20", "price": 109990},
            {"date": "2025-12-10", "price": 109990},
            {"date": "2026-01-15", "price": 109990},
            {"date": "2026-02-01", "price": 109990}
        ],
        "buy_recommendation": {
            "status": "BUY_NOW",
            "target_sale": "Student Special Deal",
            "projected_drop_pct": 3.0,
            "reasoning": "Sub-₹1 Lakh 3K 120Hz OLED screen with NPU acceleration for AI tasks and incredible 1.2kg weight."
        }
    },
    {
        "id": "msi-vector-16-hx",
        "name": "MSI Vector 16 HX",
        "brand": "MSI",
        "price_inr": 219990,
        "unidays_price_inr": 199990,
        "student_cashback_inr": 8000,
        "bundled_items": ["MSI Gaming Headset", "MSI Gaming Backpack"],
        "warranty_months": 24,
        "cpu": "Intel Core i9-14900HX (24-Core)",
        "gpu": "NVIDIA GeForce RTX 4080 Laptop",
        "tgp_watts": 175,
        "ram_gb": 32,
        "ram_type": "DDR5-5600MHz",
        "storage_gb": 1024,
        "storage_type": "PCIe Gen4 NVMe SSD",
        "display": {
            "size_inches": 16.0,
            "resolution": "2560 x 1600 (WQXGA)",
            "refresh_rate_hz": 240,
            "panel_type": "IPS 100% DCI-P3",
            "brightness_nits": 500,
            "color_gamut": "100% DCI-P3"
        },
        "battery_wh": 90.0,
        "battery_hours_real_world": 3.8,
        "weight_kg": 2.70,
        "thermal": {
            "fan_count": 2,
            "heat_pipe_count": 6,
            "vapor_chamber": False,
            "peak_surface_temp_c": 45.0,
            "noise_level_db": 52.5,
            "liquid_metal": False,
            "architecture_desc": "Cooler Boost 5 with 2 Fans and 6 Dedicated Heat Pipes"
        },
        "benchmarks": {
            "cinebench_r23_multi": 34100,
            "time_spy_gpu": 19250,
            "geekbench_6_multi": 17600
        },
        "workloads": ["aaa_gaming", "ai_ml", "creator"],
        "power_rating_10": 9.4,
        "image_url": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://www.msi.com/Laptop/Vector-16-HX-A14VX",
            "amazon": "https://www.amazon.in/dp/B0D1MSIVECTOR",
            "flipkart": "https://www.flipkart.com/search?q=msi+vector+16+hx"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 234990},
            {"date": "2025-10-15", "price": 214990},
            {"date": "2025-11-20", "price": 219990},
            {"date": "2025-12-10", "price": 219990},
            {"date": "2026-01-15", "price": 219990},
            {"date": "2026-02-01", "price": 219990}
        ],
        "buy_recommendation": {
            "status": "WAIT",
            "target_sale": "Pre-Summer Clearance",
            "projected_drop_pct": 6.5,
            "reasoning": "Raw performance powerhouse; prices expected to dip below ₹2.05L during March sales."
        }
    },
    {
        "id": "acer-nitro-v15",
        "name": "Acer Nitro V 15",
        "brand": "Acer",
        "price_inr": 62990,
        "unidays_price_inr": 57990,
        "student_cashback_inr": 2500,
        "bundled_items": ["Nitro Gaming Mouse Pad"],
        "warranty_months": 12,
        "cpu": "Intel Core i5-13420H (8-Core)",
        "gpu": "NVIDIA GeForce RTX 4050 Laptop",
        "tgp_watts": 75,
        "ram_gb": 16,
        "ram_type": "DDR5-5200MHz",
        "storage_gb": 512,
        "storage_type": "PCIe Gen4 NVMe SSD",
        "display": {
            "size_inches": 15.6,
            "resolution": "1920 x 1080 (FHD)",
            "refresh_rate_hz": 144,
            "panel_type": "IPS Matte",
            "brightness_nits": 250,
            "color_gamut": "65% sRGB"
        },
        "battery_wh": 57.0,
        "battery_hours_real_world": 4.5,
        "weight_kg": 2.10,
        "thermal": {
            "fan_count": 2,
            "heat_pipe_count": 3,
            "vapor_chamber": False,
            "peak_surface_temp_c": 44.5,
            "noise_level_db": 47.0,
            "liquid_metal": False,
            "architecture_desc": "Dual Fan Intake System with NitroSense Software"
        },
        "benchmarks": {
            "cinebench_r23_multi": 11500,
            "time_spy_gpu": 7400,
            "geekbench_6_multi": 9600
        },
        "workloads": ["student", "everyday", "esports"],
        "power_rating_10": 7.6,
        "image_url": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://store.acer.com/en-in/acer-nitro-v-15",
            "amazon": "https://www.amazon.in/dp/B0D1NITROV15",
            "flipkart": "https://www.flipkart.com/search?q=acer+nitro+v15+rtx+4050"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 66990},
            {"date": "2025-10-15", "price": 60990},
            {"date": "2025-11-20", "price": 62990},
            {"date": "2025-12-10", "price": 62990},
            {"date": "2026-01-15", "price": 62990},
            {"date": "2026-02-01", "price": 62990}
        ],
        "buy_recommendation": {
            "status": "BUY_NOW",
            "target_sale": "Best Entry Gaming",
            "projected_drop_pct": 2.0,
            "reasoning": "Most affordable path to RTX 4050 DLSS 3 frame generation for budget buyers."
        }
    },
    {
        "id": "dell-xps-16-2024",
        "name": "Dell XPS 16 (2024)",
        "brand": "Dell",
        "price_inr": 299990,
        "unidays_price_inr": 274990,
        "student_cashback_inr": 12000,
        "bundled_items": ["Dell Premier Wireless Mouse", "Dell EcoLoop Leather Sleeve"],
        "warranty_months": 24,
        "cpu": "Intel Core Ultra 9 185H (16-Core, 5.1 GHz)",
        "gpu": "NVIDIA GeForce RTX 4070 Laptop",
        "tgp_watts": 60,
        "ram_gb": 32,
        "ram_type": "LPDDR5x-7467MHz Dual-Channel",
        "storage_gb": 1024,
        "storage_type": "PCIe Gen4 NVMe SSD",
        "display": {
            "size_inches": 16.3,
            "resolution": "3840 x 2400 (4K+ Touch OLED)",
            "refresh_rate_hz": 120,
            "panel_type": "OLED Touch",
            "brightness_nits": 400,
            "color_gamut": "100% DCI-P3"
        },
        "battery_wh": 99.5,
        "battery_hours_real_world": 8.0,
        "weight_kg": 2.13,
        "thermal": {
            "fan_count": 2,
            "heat_pipe_count": 4,
            "vapor_chamber": True,
            "peak_surface_temp_c": 42.0,
            "noise_level_db": 38.5,
            "liquid_metal": False,
            "architecture_desc": "Dual Opposing Fan Thermal Architecture with Vapor Chamber"
        },
        "benchmarks": {
            "cinebench_r23_multi": 19200,
            "time_spy_gpu": 11500,
            "geekbench_6_multi": 13800
        },
        "workloads": ["creator", "ai_ml", "everyday", "student"],
        "power_rating_10": 9.1,
        "image_url": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://www.dell.com/en-in/shop/dell-laptops/xps-16-laptop",
            "amazon": "https://www.amazon.in/dp/B0D1DELLXPS16",
            "flipkart": "https://www.flipkart.com/search?q=dell+xps+16+2024"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 319990},
            {"date": "2025-10-15", "price": 304990},
            {"date": "2025-11-20", "price": 299990},
            {"date": "2025-12-10", "price": 299990},
            {"date": "2026-01-15", "price": 299990},
            {"date": "2026-02-01", "price": 299990}
        ],
        "buy_recommendation": {
            "status": "BUY_NOW",
            "target_sale": "Creator Workstation Special",
            "projected_drop_pct": 3.5,
            "reasoning": "Unmatched 4K OLED touch display and CNC aluminum craftsmanship for elite executives & creators."
        }
    },
    {
        "id": "asus-tuf-a15-2024",
        "name": "ASUS TUF Gaming A15 (2024)",
        "brand": "ASUS",
        "price_inr": 114990,
        "unidays_price_inr": 104990,
        "student_cashback_inr": 5000,
        "bundled_items": ["TUF Gaming Backpack", "TUF Gaming Mouse"],
        "warranty_months": 12,
        "cpu": "AMD Ryzen 7 7735HS (8-Core, 4.75 GHz)",
        "gpu": "NVIDIA GeForce RTX 4060 Laptop",
        "tgp_watts": 140,
        "ram_gb": 16,
        "ram_type": "DDR5-4800MHz Dual-Channel",
        "storage_gb": 1024,
        "storage_type": "PCIe Gen4 NVMe SSD",
        "display": {
            "size_inches": 15.6,
            "resolution": "1920 x 1080 (FHD)",
            "refresh_rate_hz": 144,
            "panel_type": "IPS Anti-Glare",
            "brightness_nits": 300,
            "color_gamut": "100% sRGB"
        },
        "battery_wh": 90.0,
        "battery_hours_real_world": 8.5,
        "weight_kg": 2.20,
        "thermal": {
            "fan_count": 2,
            "heat_pipe_count": 5,
            "vapor_chamber": False,
            "peak_surface_temp_c": 43.5,
            "noise_level_db": 46.0,
            "liquid_metal": False,
            "architecture_desc": "Arc Flow Fans with 84 Blades & 4 Exhaust Outlets"
        },
        "benchmarks": {
            "cinebench_r23_multi": 14600,
            "time_spy_gpu": 10800,
            "geekbench_6_multi": 11200
        },
        "workloads": ["aaa_gaming", "esports", "student"],
        "power_rating_10": 8.5,
        "image_url": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://www.asus.com/in/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-a15-2024",
            "amazon": "https://www.amazon.in/dp/B0D1ASUSTUFA15",
            "flipkart": "https://www.flipkart.com/search?q=asus+tuf+gaming+a15+rtx+4060"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 124990},
            {"date": "2025-10-15", "price": 112990},
            {"date": "2025-11-20", "price": 114990},
            {"date": "2025-12-10", "price": 114990},
            {"date": "2026-01-15", "price": 114990},
            {"date": "2026-02-01", "price": 114990}
        ],
        "buy_recommendation": {
            "status": "BUY_NOW",
            "target_sale": "Best Battery Gaming Laptop",
            "projected_drop_pct": 3.0,
            "reasoning": "Outstanding 90Wh battery runtime coupled with full 140W RTX 4060 graphics."
        }
    },
    {
        "id": "lenovo-yoga-pro-9i-gen9",
        "name": "Lenovo Yoga Pro 9i Gen 9",
        "brand": "Lenovo",
        "price_inr": 219990,
        "unidays_price_inr": 199990,
        "student_cashback_inr": 10000,
        "bundled_items": ["Lenovo Yoga Precision Pen", "Lenovo Yoga Sleeve", "3-Year ADP Warranty"],
        "warranty_months": 36,
        "cpu": "Intel Core Ultra 9 185H (16-Core)",
        "gpu": "NVIDIA GeForce RTX 4070 Laptop",
        "tgp_watts": 100,
        "ram_gb": 32,
        "ram_type": "LPDDR5x-7467MHz",
        "storage_gb": 1024,
        "storage_type": "PCIe Gen4 NVMe SSD",
        "display": {
            "size_inches": 16.0,
            "resolution": "3200 x 2000 (3.2K Mini-LED Touch)",
            "refresh_rate_hz": 165,
            "panel_type": "Mini-LED PureSight Pro",
            "brightness_nits": 1200,
            "color_gamut": "100% DCI-P3 / 100% AdobeRGB"
        },
        "battery_wh": 84.0,
        "battery_hours_real_world": 7.0,
        "weight_kg": 2.05,
        "thermal": {
            "fan_count": 2,
            "heat_pipe_count": 4,
            "vapor_chamber": True,
            "peak_surface_temp_c": 39.5,
            "noise_level_db": 39.0,
            "liquid_metal": False,
            "architecture_desc": "Lenovo X Power Thermal Tuning with Custom Vapor Chamber"
        },
        "benchmarks": {
            "cinebench_r23_multi": 20400,
            "time_spy_gpu": 12800,
            "geekbench_6_multi": 14200
        },
        "workloads": ["creator", "ai_ml", "everyday", "student"],
        "power_rating_10": 9.4,
        "image_url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://www.lenovo.com/in/en/p/laptops/yoga/yoga-pro-series/yoga-pro-9i-gen-9",
            "amazon": "https://www.amazon.in/dp/B0D1YOGAPRO9I",
            "flipkart": "https://www.flipkart.com/search?q=lenovo+yoga+pro+9i+gen+9"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 239990},
            {"date": "2025-10-15", "price": 224990},
            {"date": "2025-11-20", "price": 219990},
            {"date": "2025-12-10", "price": 219990},
            {"date": "2026-01-15", "price": 219990},
            {"date": "2026-02-01", "price": 219990}
        ],
        "buy_recommendation": {
            "status": "BUY_NOW",
            "target_sale": "Best Windows Creator Display",
            "projected_drop_pct": 2.5,
            "reasoning": "1200 nits Mini-LED touch display delivers true HDR grading capability."
        }
    },
    {
        "id": "msi-raider-ge78-hx",
        "name": "MSI Raider GE78 HX",
        "brand": "MSI",
        "price_inr": 349990,
        "unidays_price_inr": 329990,
        "student_cashback_inr": 15000,
        "bundled_items": ["MSI Gaming Headset", "MSI Dual Drive 128GB", "3-Year International Warranty"],
        "warranty_months": 36,
        "cpu": "Intel Core i9-14900HX (24-Core, 5.8 GHz)",
        "gpu": "NVIDIA GeForce RTX 4090 Laptop",
        "tgp_watts": 175,
        "ram_gb": 64,
        "ram_type": "DDR5-5600MHz Dual-Channel",
        "storage_gb": 2048,
        "storage_type": "PCIe Gen4 NVMe SSD RAID 0",
        "display": {
            "size_inches": 17.0,
            "resolution": "2560 x 1600 (QHD+)",
            "refresh_rate_hz": 240,
            "panel_type": "IPS DCI-P3 100%",
            "brightness_nits": 500,
            "color_gamut": "100% DCI-P3"
        },
        "battery_wh": 99.9,
        "battery_hours_real_world": 4.0,
        "weight_kg": 3.10,
        "thermal": {
            "fan_count": 2,
            "heat_pipe_count": 6,
            "vapor_chamber": True,
            "peak_surface_temp_c": 42.5,
            "noise_level_db": 51.5,
            "liquid_metal": True,
            "architecture_desc": "MSI Cooler Boost 5 with Liquid Metal Thermal Interface"
        },
        "benchmarks": {
            "cinebench_r23_multi": 35200,
            "time_spy_gpu": 22400,
            "geekbench_6_multi": 18500
        },
        "workloads": ["aaa_gaming", "ai_ml", "creator"],
        "power_rating_10": 9.9,
        "image_url": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://www.msi.com/Laptop/Raider-GE78-HX-14VX",
            "amazon": "https://www.amazon.in/dp/B0D1MSIRAIDER",
            "flipkart": "https://www.flipkart.com/search?q=msi+raider+ge78+hx+rtx+4090"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 379990},
            {"date": "2025-10-15", "price": 359990},
            {"date": "2025-11-20", "price": 349990},
            {"date": "2025-12-10", "price": 349990},
            {"date": "2026-01-15", "price": 349990},
            {"date": "2026-02-01", "price": 349990}
        ],
        "buy_recommendation": {
            "status": "WAIT",
            "target_sale": "Extreme AI Workstation Fest",
            "projected_drop_pct": 5.0,
            "reasoning": "24GB VRAM RTX 4090 flagship; price expected to soften before RTX 50 series announcements."
        }
    },
    {
        "id": "macbook-pro-14-m3-pro",
        "name": "Apple MacBook Pro 14 (M3 Pro)",
        "brand": "Apple",
        "price_inr": 199900,
        "unidays_price_inr": 184900,
        "student_cashback_inr": 10000,
        "bundled_items": ["Free AirPods 3rd Gen", "AppleCare+ 20% Off"],
        "warranty_months": 12,
        "cpu": "Apple M3 Pro (11-Core CPU, 14-Core GPU)",
        "gpu": "Apple M3 Pro Integrated 14-Core GPU",
        "tgp_watts": 45,
        "ram_gb": 18,
        "ram_type": "Unified Memory (150GB/s Bandwidth)",
        "storage_gb": 512,
        "storage_type": "High-Speed Apple NVMe SSD",
        "display": {
            "size_inches": 14.2,
            "resolution": "3024 x 1964 (Liquid Retina XDR)",
            "refresh_rate_hz": 120,
            "panel_type": "Mini-LED ProMotion",
            "brightness_nits": 1000,
            "color_gamut": "100% P3 Wide Color"
        },
        "battery_wh": 70.0,
        "battery_hours_real_world": 14.5,
        "weight_kg": 1.61,
        "thermal": {
            "fan_count": 1,
            "heat_pipe_count": 2,
            "vapor_chamber": False,
            "peak_surface_temp_c": 33.5,
            "noise_level_db": 30.0,
            "liquid_metal": False,
            "architecture_desc": "Single Ultra-Quiet High-Efficiency Blower Fan"
        },
        "benchmarks": {
            "cinebench_r23_multi": 15800,
            "time_spy_gpu": 9800,
            "geekbench_6_multi": 14900
        },
        "workloads": ["student", "creator", "everyday", "ai_ml"],
        "power_rating_10": 9.3,
        "image_url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://www.apple.com/in/macbook-pro/",
            "amazon": "https://www.amazon.in/dp/B0D1MBP14M3PRO",
            "flipkart": "https://www.flipkart.com/search?q=macbook+pro+14+m3+pro"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 199900},
            {"date": "2025-10-15", "price": 199900},
            {"date": "2025-11-20", "price": 199900},
            {"date": "2025-12-10", "price": 199900},
            {"date": "2026-01-15", "price": 199900},
            {"date": "2026-02-01", "price": 199900}
        ],
        "buy_recommendation": {
            "status": "BUY_NOW",
            "target_sale": "UNiDAYS Back to School",
            "projected_drop_pct": 7.5,
            "reasoning": "Perfect 14-inch compact form factor with 14.5 hours of real battery life."
        }
    },
    {
        "id": "hp-envy-x360-14-2024",
        "name": "HP Envy x360 14 (2024)",
        "brand": "HP",
        "price_inr": 89990,
        "unidays_price_inr": 81990,
        "student_cashback_inr": 4000,
        "bundled_items": ["HP Rechargeable MPP 2.0 Tilt Pen", "HP Wireless Mouse"],
        "warranty_months": 12,
        "cpu": "Intel Core Ultra 7 155H (16-Core NPU Accelerated)",
        "gpu": "Intel Arc Graphics (Integrated 8 Xe Cores)",
        "tgp_watts": 30,
        "ram_gb": 16,
        "ram_type": "LPDDR5x-6400MHz",
        "storage_gb": 512,
        "storage_type": "PCIe Gen4 NVMe SSD",
        "display": {
            "size_inches": 14.0,
            "resolution": "2880 x 1800 (2.8K OLED Touch)",
            "refresh_rate_hz": 120,
            "panel_type": "OLED 360-Degree Convertible",
            "brightness_nits": 500,
            "color_gamut": "100% DCI-P3"
        },
        "battery_wh": 68.0,
        "battery_hours_real_world": 9.5,
        "weight_kg": 1.39,
        "thermal": {
            "fan_count": 2,
            "heat_pipe_count": 2,
            "vapor_chamber": False,
            "peak_surface_temp_c": 36.0,
            "noise_level_db": 32.5,
            "liquid_metal": False,
            "architecture_desc": "HP Dual-Fan Silent Thermal Engineering"
        },
        "benchmarks": {
            "cinebench_r23_multi": 12800,
            "time_spy_gpu": 3800,
            "geekbench_6_multi": 11800
        },
        "workloads": ["student", "everyday", "creator"],
        "power_rating_10": 8.4,
        "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://www.hp.com/in-en/shop/hp-envy-x360-laptop-14-fc0000tu.html",
            "amazon": "https://www.amazon.in/dp/B0D1HPENVYX360",
            "flipkart": "https://www.flipkart.com/search?q=hp+envy+x360+14+2024"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 94990},
            {"date": "2025-10-15", "price": 88990},
            {"date": "2025-11-20", "price": 89990},
            {"date": "2025-12-10", "price": 89990},
            {"date": "2026-01-15", "price": 89990},
            {"date": "2026-02-01", "price": 89990}
        ],
        "buy_recommendation": {
            "status": "BUY_NOW",
            "target_sale": "Best Student 2-in-1 Touchscreen",
            "projected_drop_pct": 4.0,
            "reasoning": "Versatile 360-degree hinge with included stylus pen and brilliant 2.8K OLED screen."
        }
    },
    {
        "id": "gigabyte-aorus-16x-2024",
        "name": "Gigabyte AORUS 16X (2024)",
        "brand": "Gigabyte",
        "price_inr": 169990,
        "unidays_price_inr": 154990,
        "student_cashback_inr": 7000,
        "bundled_items": ["AORUS M3 Gaming Mouse", "AORUS Backpack"],
        "warranty_months": 24,
        "cpu": "Intel Core i7-14650HX (16-Core, 5.2 GHz)",
        "gpu": "NVIDIA GeForce RTX 4070 Laptop",
        "tgp_watts": 140,
        "ram_gb": 32,
        "ram_type": "DDR5-5600MHz Dual-Channel",
        "storage_gb": 1024,
        "storage_type": "PCIe Gen4 NVMe SSD",
        "display": {
            "size_inches": 16.0,
            "resolution": "2560 x 1600 (WQXGA)",
            "refresh_rate_hz": 165,
            "panel_type": "IPS G-Sync Panton Validated",
            "brightness_nits": 400,
            "color_gamut": "100% sRGB"
        },
        "battery_wh": 99.0,
        "battery_hours_real_world": 6.5,
        "weight_kg": 2.30,
        "thermal": {
            "fan_count": 2,
            "heat_pipe_count": 5,
            "vapor_chamber": False,
            "peak_surface_temp_c": 41.0,
            "noise_level_db": 45.5,
            "liquid_metal": False,
            "architecture_desc": "WINDFORCE Infinity Cooling Technology with 3D VortX Air Channel"
        },
        "benchmarks": {
            "cinebench_r23_multi": 22100,
            "time_spy_gpu": 12600,
            "geekbench_6_multi": 14500
        },
        "workloads": ["aaa_gaming", "creator", "esports", "ai_ml"],
        "power_rating_10": 8.9,
        "image_url": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
        "retailer_urls": {
            "official": "https://www.gigabyte.com/Laptop/AORUS-16X--2024",
            "amazon": "https://www.amazon.in/dp/B0D1AORUS16X",
            "flipkart": "https://www.flipkart.com/search?q=gigabyte+aorus+16x"
        },
        "price_history": [
            {"date": "2025-09-01", "price": 179990},
            {"date": "2025-10-15", "price": 166990},
            {"date": "2025-11-20", "price": 169990},
            {"date": "2025-12-10", "price": 169990},
            {"date": "2026-01-15", "price": 169990},
            {"date": "2026-02-01", "price": 169990}
        ],
        "buy_recommendation": {
            "status": "BUY_NOW",
            "target_sale": "Best Value 32GB RTX 4070",
            "projected_drop_pct": 3.0,
            "reasoning": "Pre-installed 32GB RAM & 99Wh battery make this the most complete mid-range powerhouse."
        }
    }
]

MARKET_TRENDS_DATA: Dict[str, Any] = {
    "component_index": [
        {"month": "Sep 2025", "dram_index": 100, "nand_flash_index": 100, "gpu_silicon_index": 100},
        {"month": "Oct 2025", "dram_index": 102, "nand_flash_index": 97, "gpu_silicon_index": 98},
        {"month": "Nov 2025", "dram_index": 105, "nand_flash_index": 94, "gpu_silicon_index": 95},
        {"month": "Dec 2025", "dram_index": 108, "nand_flash_index": 91, "gpu_silicon_index": 93},
        {"month": "Jan 2026", "dram_index": 112, "nand_flash_index": 89, "gpu_silicon_index": 91},
        {"month": "Feb 2026", "dram_index": 115, "nand_flash_index": 87, "gpu_silicon_index": 90},
        {"month": "Mar 2026 (Est)", "dram_index": 118, "nand_flash_index": 85, "gpu_silicon_index": 88},
        {"month": "Apr 2026 (Est)", "dram_index": 122, "nand_flash_index": 84, "gpu_silicon_index": 86}
    ],
    "upcoming_sales": [
        {
            "name": "UNiDAYS Back to College Fest",
            "dates": "March 1 - March 15, 2026",
            "expected_discount": "8% - 15% + Cashback",
            "best_category": "MacBooks, Thin & Lights, Mid-Tier Gaming"
        },
        {
            "name": "Summer Tech Carnival",
            "dates": "April 20 - April 28, 2026",
            "expected_discount": "10% - 18%",
            "best_category": "High-TGP RTX 4070 & 4080 Laptops"
        },
        {
            "name": "Amazon Great Summer Sale",
            "dates": "May 4 - May 10, 2026",
            "expected_discount": "12% - 22%",
            "best_category": "Budget Gaming & Student Ultrabooks"
        }
    ]
}
