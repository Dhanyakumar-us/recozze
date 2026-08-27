import type {
  Laptop,
  UserPreferences,
  MarketTrendsData,
  ChatResponse,
  CurrencyType,
  CurrencyRates,
  LivePriceResult,
  StudentVerifyResult,
  ApiStatusResult
} from '../types/laptop';

const API_BASE = '/api';

export function getSessionId(): string {
  let sid = sessionStorage.getItem('reco_session_id');
  if (!sid) {
    sid = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    sessionStorage.setItem('reco_session_id', sid);
  }
  return sid;
}

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
    calculatedMatchPct: item.realtime_score || item.calculated_match_pct || 90.0,
    effectivePriceInr: item.effective_price_inr || item.price_inr,
    forecast: item.forecast,
    realtimeBoostReason: item.realtime_boost_reason,
    realtimeScore: item.realtime_score
  };
}

export async function fetchLaptops(prefs: UserPreferences): Promise<Laptop[]> {
  try {
    const sid = getSessionId();
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
    params.append('session_id', sid);

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

export async function trackEventApi(
  eventType: 'view_laptop' | 'filter_change' | 'compare_laptop' | 'search_query',
  laptopId?: string,
  context?: Record<string, any>
): Promise<void> {
  try {
    const sid = getSessionId();
    await fetch(`${API_BASE}/events/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sid,
        event_type: eventType,
        laptop_id: laptopId,
        context
      })
    });
  } catch (err) {
    console.warn('Track event API failed:', err);
  }
}

export async function fetchRealtimeRecommendationsApi(prefs: UserPreferences): Promise<Laptop[]> {
  try {
    const sid = getSessionId();
    const res = await fetch(`${API_BASE}/recommend/realtime`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workload: prefs.workload,
        budget_min: prefs.budgetMin,
        budget_max: prefs.budgetMax,
        ram_min: prefs.minRamGb,
        tgp_tier: prefs.tgpTier !== 'all' ? prefs.tgpTier : null,
        unidays_active: prefs.unidaysActive,
        search_query: prefs.searchQuery,
        session_id: sid
      })
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();
    return data.laptops.map(mapBackendToLaptop);
  } catch (err) {
    console.warn('Real-Time recommendations API failed, falling back to fetchLaptops:', err);
    return fetchLaptops(prefs);
  }
}

export function connectRealtimeWebSocket(onMessage?: (data: any) => void): WebSocket | null {
  try {
    const sid = getSessionId();
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/recommendations/${sid}`;
    const ws = new WebSocket(wsUrl);
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (onMessage) onMessage(data);
      } catch (e) {
        console.error('Failed to parse WebSocket message:', e);
      }
    };
    
    return ws;
  } catch (err) {
    console.warn('Could not establish WebSocket connection:', err);
    return null;
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

export async function fetchCurrencyRates(): Promise<CurrencyRates> {
  try {
    const res = await fetch(`${API_BASE}/currency-rates`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Currency rates API failed, using fallback rates:', err);
    return {
      base_currency: 'INR',
      rates: { INR: 1.0, USD: 0.0115, EUR: 0.0105, GBP: 0.0089, AED: 0.0422, CAD: 0.0162, AUD: 0.0177 },
      api_source: 'Client Fallback Rates',
      last_updated: new Date().toISOString()
    };
  }
}

export async function fetchLiveLaptopPrice(id: string): Promise<LivePriceResult> {
  try {
    const res = await fetch(`${API_BASE}/live-price/${id}`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Live price API failed, using fallback:', err);
    return {
      laptop: id,
      source: 'RECO Pricing Engine',
      connected_apis: [],
      is_live_api: false
    };
  }
}

export async function verifyStudentApi(email: string, idToken?: string): Promise<StudentVerifyResult> {
  try {
    const res = await fetch(`${API_BASE}/verify-student`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, id_token: idToken || '' })
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Student verification API failed, using domain fallback:', err);
    const isEdu = email.endsWith('.edu') || email.endsWith('.ac.in');
    return {
      verified: isEdu,
      email,
      auth_provider: 'Client Validation',
      student_discount_active: isEdu,
      unidays_perks_unlocked: isEdu ? ['7-15% Instant Discount', 'Cashback Voucher'] : []
    };
  }
}

export async function fetchApiStatus(): Promise<ApiStatusResult> {
  try {
    const res = await fetch(`${API_BASE}/api-status`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      groq_ai: false,
      gemini_ai: false,
      openai_ai: false,
      exchange_rate_api: false,
      rapidapi: false,
      serpapi: false,
      keepa_api: false,
      firebase_auth: false,
      database_url: false,
      supabase_key: false,
      env_file_loaded: false
    };
  }
}

export async function searchCopartYards(query: string = "dallas", apiKey?: string): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/copart/yards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, api_key: apiKey || null })
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Copart Yards API failed, using fallback:', err);
    return {
      status: 'error',
      message: 'Failed to connect to Copart Salvage API endpoint.',
      query,
      data: null
    };
  }
}

export function formatPrice(
  priceInr: number,
  currency: CurrencyType = 'INR',
  rates?: Record<string, number>
): string {
  const rate = rates && rates[currency] ? rates[currency] : 1.0;
  const val = priceInr * (currency === 'INR' ? 1 : rate);

  switch (currency) {
    case 'USD':
      return `$${Math.round(val).toLocaleString('en-US')}`;
    case 'EUR':
      return `€${Math.round(val).toLocaleString('de-DE')}`;
    case 'GBP':
      return `£${Math.round(val).toLocaleString('en-GB')}`;
    case 'AED':
      return `AED ${Math.round(val).toLocaleString('en-AE')}`;
    case 'CAD':
      return `CA$${Math.round(val).toLocaleString('en-CA')}`;
    case 'AUD':
      return `AU$${Math.round(val).toLocaleString('en-AU')}`;
    case 'INR':
    default:
      return `₹${Math.round(priceInr).toLocaleString('en-IN')}`;
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
