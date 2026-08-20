import type { Laptop, UserPreferences, MarketTrendsData, ChatResponse } from '../types/laptop';

const API_BASE = '/api';

export function mapBackendToLaptop(item: any): Laptop {
  const t = item.thermal || {};
  const b = item.benchmarks || {};
  const r = item.retailer_urls || {};
  const rec = item.buy_recommendation || {};

  return {
    id: item.id,
    name: item.name,
    brand: item.brand,
    category: item.workloads && item.workloads.length > 0 ? item.workloads[0] : 'General',
    image: item.image_url || 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
    msrpInr: item.price_inr,
    currentBestPriceInr: item.price_inr,
    studentPriceInr: item.unidays_price_inr,
    powerRating10: item.power_rating_10 || 9.0,
    specs: {
      cpu: item.cpu,
      gpu: item.gpu,
      tgpWatts: item.tgp_watts,
      ramGb: item.ram_gb,
      ramType: item.ram_type,
      ssdStorageGb: item.storage_gb,
      storageType: item.storage_type,
      display: item.display,
      batteryWh: item.battery_wh,
      batteryHours: item.battery_hours_real_world,
      weightKg: item.weight_kg
    },
    cooling: {
      architecture: t.architecture_desc || 'High Performance Dual-Fan Cooling',
      fanCount: t.fan_count || 2,
      heatpipeCount: t.heat_pipe_count || 5,
      maxSurfaceTempC: t.peak_surface_temp_c || 42.0,
      peakNoiseLevelDb: t.noise_level_db || 46.0,
      vaporChamber: Boolean(t.vapor_chamber),
      liquidMetal: Boolean(t.liquid_metal)
    },
    benchmarks: {
      cinebenchR23Multi: b.cinebench_r23_multi || 18000,
      timeSpyGpu: b.time_spy_gpu || 11000,
      geekbench6Multi: b.geekbench_6_multi || 14000
    },
    studentBenefits: {
      unidaysPriceInr: item.unidays_price_inr,
      cashbackInr: item.student_cashback_inr || 5000,
      bundledPerks: item.bundled_items || ["Free Gaming Mouse", "ADP Warranty"],
      extendedWarrantyMonths: item.warranty_months || 24,
      verificationMethod: "UNiDAYS Verified Student Portal",
      officialStoreUrl: r.official || "https://www.google.com"
    },
    retailerPrices: {
      officialStore: item.unidays_price_inr,
      amazonIn: item.price_inr - 1000,
      flipkart: item.price_inr,
      amazonUrl: r.amazon || "https://www.amazon.in",
      flipkartUrl: r.flipkart || "https://www.flipkart.com",
      officialUrl: r.official || "https://www.google.com"
    },
    buyRecommendation: {
      status: rec.status || 'BUY_NOW',
      target_sale: rec.target_sale || 'Current Price is Optimal',
      projected_drop_pct: rec.projected_drop_pct || 2.0,
      reasoning: rec.reasoning || 'Price is optimal for performance.'
    },
    priceHistory: item.price_history || [],
    workloads: item.workloads || ['student'],
    pros: [
      `${item.tgp_watts}W Maximum TGP Graphics Power`,
      `${t.fan_count || 2}-Fan Cooling (${t.noise_level_db || 45}dB Noise)`,
      `${(b.cinebench_r23_multi || 18000).toLocaleString()} Cinebench R23 Score`
    ],
    cons: [
      `Chassis Weight: ${item.weight_kg} kg`,
      `Peak Surface Temp: ${t.peak_surface_temp_c || 42}°C`
    ],
    calculatedMatchPct: item.calculated_match_pct || 90.0,
    effectivePriceInr: item.effective_price_inr || item.price_inr,
    forecast: item.forecast
  };
}

export async function fetchLaptops(prefs: UserPreferences): Promise<Laptop[]> {
  try {
    const params = new URLSearchParams();
    params.append('workload', prefs.workload);
    params.append('budget_min', prefs.budgetMin.toString());
    params.append('budget_max', prefs.budgetMax.toString());
    params.append('ram_min', prefs.minRamGb.toString());
    if (prefs.tgpTier !== 'all') {
      params.append('tgp_tier', prefs.tgpTier);
    }
    params.append('unidays_active', prefs.unidaysActive ? 'true' : 'false');
    if (prefs.searchQuery.trim()) {
      params.append('search', prefs.searchQuery.trim());
    }

    const res = await fetch(`${API_BASE}/laptops?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }
    const data = await res.json();
    return data.laptops.map(mapBackendToLaptop);
  } catch (err) {
    console.warn('Backend API request failed, utilizing client-side fallback:', err);
    return getFallbackLaptops(prefs);
  }
}

export async function fetchLaptopDetail(id: string, unidaysActive: boolean): Promise<Laptop> {
  try {
    const res = await fetch(`${API_BASE}/laptops/${id}?unidays_active=${unidaysActive}`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();
    return mapBackendToLaptop(data);
  } catch (err) {
    console.warn('Backend detail request failed, using client fallback:', err);
    const laptops = await fetchLaptops({
      workload: 'student',
      budgetMin: 0,
      budgetMax: 500000,
      minRamGb: 0,
      minSsdGb: 0,
      tgpTier: 'all',
      batteryTargetHours: 0,
      unidaysActive,
      searchQuery: '',
      activeTab: 'recommendations',
      theme: 'dark'
    });
    const found = laptops.find(l => l.id === id);
    if (!found) throw new Error('Laptop not found');
    return found;
  }
}

export async function fetchMarketTrends(): Promise<MarketTrendsData> {
  try {
    const res = await fetch(`${API_BASE}/market-trends`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Market trends API failed, using client fallback:', err);
    return getFallbackMarketTrends();
  }
}

export async function compareLaptopsApi(ids: string[], unidaysActive: boolean): Promise<Laptop[]> {
  try {
    const res = await fetch(`${API_BASE}/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ laptop_ids: ids, unidays_active: unidaysActive })
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();
    return data.laptops.map(mapBackendToLaptop);
  } catch (err) {
    console.warn('Compare API failed, using fallback:', err);
    const laptops = await fetchLaptops({
      workload: 'student',
      budgetMin: 0,
      budgetMax: 500000,
      minRamGb: 0,
      minSsdGb: 0,
      tgpTier: 'all',
      batteryTargetHours: 0,
      unidaysActive,
      searchQuery: '',
      activeTab: 'recommendations',
      theme: 'dark'
    });
    return laptops.filter(l => ids.includes(l.id));
  }
}

export async function chatAdvisorApi(query: string, unidaysActive: boolean): Promise<ChatResponse> {
  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, unidays_active: unidaysActive })
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Chat API failed, using fallback:', err);
    return {
      query,
      topic: 'GPU TGP & Hardware Advisor',
      response: '⚡ **TGP (Total Graphics Power)** determines maximum GPU electric wattage. Higher wattage (e.g. 140W RTX 4070 vs 45W) unlocks significantly higher gaming framerates and faster 3D rendering.',
      suggested_prompts: [
        'What is GPU TGP Wattage?',
        'How do I claim UNiDAYS student discount?',
        'Best gaming laptop under ₹1.5 Lakhs?'
      ]
    };
  }
}

// Fallback Mock Data Generator
function getFallbackLaptops(prefs: UserPreferences): Laptop[] {
  const MOCK_RAW = [
    {
      id: "legion-pro-7i-gen9",
      name: "Lenovo Legion Pro 7i Gen 9",
      brand: "Lenovo",
      price_inr: 249990,
      unidays_price_inr: 224990,
      student_cashback_inr: 10000,
      bundled_items: ["Legion M600 Wireless Mouse", "Legion Backpack", "3-Year ADP Warranty"],
      warranty_months: 36,
      cpu: "Intel Core i9-14900HX (24-Core)",
      gpu: "NVIDIA GeForce RTX 4080 Laptop",
      tgp_watts: 175,
      ram_gb: 32,
      ram_type: "DDR5-5600MHz",
      storage_gb: 1024,
      storage_type: "PCIe Gen4 NVMe SSD",
      display: {
        size_inches: 16.0,
        resolution: "2560 x 1600 (WQXGA)",
        refresh_rate_hz: 240,
        panel_type: "IPS G-Sync",
        brightness_nits: 500,
        color_gamut: "100% DCI-P3"
      },
      battery_wh: 99.9,
      battery_hours_real_world: 5.5,
      weight_kg: 2.62,
      thermal: {
        fan_count: 2,
        heat_pipe_count: 6,
        vapor_chamber: true,
        peak_surface_temp_c: 41.5,
        noise_level_db: 48.2,
        liquid_metal: true,
        architecture_desc: "Coldfront 5.0 Vapor Chamber + Liquid Metal"
      },
      benchmarks: {
        cinebench_r23_multi: 34500,
        time_spy_gpu: 19400,
        geekbench_6_multi: 17800
      },
      workloads: ["gaming", "coding", "creator"],
      power_rating_10: 9.8,
      image_url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
      retailer_urls: {
        official: "https://www.lenovo.com/in/en/",
        amazon: "https://www.amazon.in",
        flipkart: "https://www.flipkart.com"
      },
      price_history: [
        { date: "2025-10-15", price: 254990 },
        { date: "2026-02-01", price: 249990 }
      ],
      buy_recommendation: {
        status: "WAIT",
        target_sale: "Back to College Sale (March 2026)",
        projected_drop_pct: 8.5,
        reasoning: "NAND SSD surplus will drive down Gen9 prices ahead of Gen10 announcements."
      }
    },
    {
      id: "rog-strix-g16-2024",
      name: "ASUS ROG Strix G16 (2024)",
      brand: "ASUS",
      price_inr: 179990,
      unidays_price_inr: 164990,
      student_cashback_inr: 7500,
      bundled_items: ["ROG Impact Gaming Mouse", "ROG Backpack"],
      warranty_months: 24,
      cpu: "Intel Core i7-14700HX (20-Core)",
      gpu: "NVIDIA GeForce RTX 4070 Laptop",
      tgp_watts: 140,
      ram_gb: 16,
      ram_type: "DDR5-5600MHz",
      storage_gb: 1024,
      storage_type: "PCIe Gen4 NVMe SSD",
      display: {
        size_inches: 16.0,
        resolution: "2560 x 1600 (Nebula)",
        refresh_rate_hz: 240,
        panel_type: "IPS G-Sync",
        brightness_nits: 500,
        color_gamut: "100% DCI-P3"
      },
      battery_wh: 90.0,
      battery_hours_real_world: 6.0,
      weight_kg: 2.50,
      thermal: {
        fan_count: 3,
        heat_pipe_count: 7,
        vapor_chamber: false,
        peak_surface_temp_c: 42.0,
        noise_level_db: 46.8,
        liquid_metal: true,
        architecture_desc: "Tri-Fan Technology + Conductonaut Liquid Metal"
      },
      benchmarks: {
        cinebench_r23_multi: 28900,
        time_spy_gpu: 12850,
        geekbench_6_multi: 15400
      },
      workloads: ["gaming", "student", "coding"],
      power_rating_10: 9.2,
      image_url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
      retailer_urls: {
        official: "https://rog.asus.com/in/",
        amazon: "https://www.amazon.in",
        flipkart: "https://www.flipkart.com"
      },
      price_history: [
        { date: "2025-10-15", price: 182990 },
        { date: "2026-02-01", price: 179990 }
      ],
      buy_recommendation: {
        status: "BUY_NOW",
        target_sale: "Current Price is Optimal",
        projected_drop_pct: 2.0,
        reasoning: "Price has stabilized with UNiDAYS providing an effective ₹22,500 total savings."
      }
    },
    {
      id: "macbook-pro-16-m3-max",
      name: "Apple MacBook Pro 16 M3 Max",
      brand: "Apple",
      price_inr: 349900,
      unidays_price_inr: 319900,
      student_cashback_inr: 10000,
      bundled_items: ["Free AirPods 3rd Gen", "AppleCare+ 20% Discount"],
      warranty_months: 12,
      cpu: "Apple M3 Max (16-Core CPU)",
      gpu: "Apple M3 Max Integrated 40-Core GPU",
      tgp_watts: 100,
      ram_gb: 48,
      ram_type: "Unified Memory",
      storage_gb: 1024,
      storage_type: "Apple NVMe SSD",
      display: {
        size_inches: 16.2,
        resolution: "3456 x 2234 (Liquid Retina XDR)",
        refresh_rate_hz: 120,
        panel_type: "Mini-LED ProMotion",
        brightness_nits: 1600,
        color_gamut: "100% P3"
      },
      battery_wh: 100.0,
      battery_hours_real_world: 18.5,
      weight_kg: 2.14,
      thermal: {
        fan_count: 2,
        heat_pipe_count: 2,
        vapor_chamber: false,
        peak_surface_temp_c: 36.8,
        noise_level_db: 34.5,
        liquid_metal: false,
        architecture_desc: "Ultra-Quiet Dual Fan Unibody System"
      },
      benchmarks: {
        cinebench_r23_multi: 24200,
        time_spy_gpu: 14600,
        geekbench_6_multi: 21300
      },
      workloads: ["creator", "coding", "student", "business"],
      power_rating_10: 9.7,
      image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
      retailer_urls: {
        official: "https://www.apple.com/in/",
        amazon: "https://www.amazon.in",
        flipkart: "https://www.flipkart.com"
      },
      price_history: [
        { date: "2025-10-15", price: 349900 },
        { date: "2026-02-01", price: 349900 }
      ],
      buy_recommendation: {
        status: "BUY_NOW",
        target_sale: "Apple Education Active",
        projected_drop_pct: 0.0,
        reasoning: "Fixed Apple pricing; UNiDAYS education promo gives peak value with free AirPods."
      }
    }
  ];

  return MOCK_RAW.map(mapBackendToLaptop).filter(l => {
    const price = prefs.unidaysActive ? l.studentPriceInr : l.currentBestPriceInr;
    if (price < prefs.budgetMin || price > prefs.budgetMax) return false;
    if (l.specs.ramGb < prefs.minRamGb) return false;
    if (prefs.tgpTier === 'thin_light' && l.specs.tgpWatts > 50) return false;
    if (prefs.tgpTier === 'balanced' && (l.specs.tgpWatts < 50 || l.specs.tgpWatts > 120)) return false;
    if (prefs.tgpTier === 'unlocked' && l.specs.tgpWatts < 120) return false;
    if (prefs.searchQuery.trim()) {
      const q = prefs.searchQuery.toLowerCase();
      const text = `${l.name} ${l.brand} ${l.specs.cpu} ${l.specs.gpu}`.toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });
}

function getFallbackMarketTrends(): MarketTrendsData {
  return {
    component_index: [
      { month: "Sep 2025", dram_index: 100, nand_flash_index: 100, gpu_silicon_index: 100 },
      { month: "Nov 2025", dram_index: 105, nand_flash_index: 94, gpu_silicon_index: 95 },
      { month: "Jan 2026", dram_index: 112, nand_flash_index: 89, gpu_silicon_index: 91 },
      { month: "Mar 2026 (Est)", dram_index: 118, nand_flash_index: 85, gpu_silicon_index: 88 }
    ],
    upcoming_sales: [
      {
        name: "UNiDAYS Back to College Fest",
        dates: "March 1 - March 15, 2026",
        expected_discount: "8% - 15% + Cashback",
        best_category: "MacBooks, Thin & Lights, Mid-Tier Gaming"
      },
      {
        name: "Summer Tech Carnival",
        dates: "April 20 - April 28, 2026",
        expected_discount: "10% - 18%",
        best_category: "High-TGP RTX 4070 & 4080 Laptops"
      }
    ]
  };
}
