export type WorkloadType =
  | 'student'
  | 'gaming'
  | 'coding'
  | 'creator'
  | 'business'
  | 'budget';

export type TgpTierType = 'all' | 'thin_light' | 'balanced' | 'unlocked';

export interface DisplaySpecs {
  size_inches: number;
  resolution: string;
  refresh_rate_hz: number;
  panel_type: string;
  brightness_nits: number;
  color_gamut: string;
}

export interface Specs {
  cpu: string;
  gpu: string;
  tgpWatts: number;
  ramGb: number;
  ramType: string;
  ssdStorageGb: number;
  storageType: string;
  display: DisplaySpecs;
  batteryWh: number;
  batteryHours: number;
  weightKg: number;
}

export interface CoolingSpecs {
  architecture: string;
  fanCount: number;
  heatpipeCount: number;
  maxSurfaceTempC: number;
  peakNoiseLevelDb: number;
  vaporChamber: boolean;
  liquidMetal: boolean;
}

export interface Benchmarks {
  cinebenchR23Multi: number;
  timeSpyGpu: number;
  geekbench6Multi: number;
}

export interface StudentBenefits {
  unidaysPriceInr: number;
  cashbackInr: number;
  bundledPerks: string[];
  extendedWarrantyMonths: number;
  verificationMethod: string;
  officialStoreUrl: string;
}

export interface RetailerPrices {
  officialStore: number;
  amazonIn: number;
  flipkart: number;
  amazonUrl: string;
  flipkartUrl: string;
  officialUrl: string;
}

export interface PriceForecastPoint {
  month: string;
  projected_price: number;
  savings_vs_today: number;
}

export interface BuyRecommendation {
  status: 'BUY_NOW' | 'WAIT';
  target_sale: string;
  projected_drop_pct: number;
  reasoning: string;
}

export interface PriceForecast {
  laptop_id: string;
  laptop_name: string;
  current_price: number;
  recommendation_status: 'BUY_NOW' | 'WAIT';
  target_sale: string;
  projected_drop_pct: number;
  reasoning: string;
  historical_prices: Array<{ date: string; price: number }>;
  six_month_forecast: PriceForecastPoint[];
}

export interface Laptop {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  msrpInr: number;
  currentBestPriceInr: number;
  studentPriceInr: number;
  powerRating10: number;
  specs: Specs;
  cooling: CoolingSpecs;
  benchmarks: Benchmarks;
  studentBenefits: StudentBenefits;
  retailerPrices: RetailerPrices;
  buyRecommendation: BuyRecommendation;
  priceHistory: Array<{ date: string; price: number }>;
  workloads: WorkloadType[];
  pros: string[];
  cons: string[];
  calculatedMatchPct?: number;
  effectivePriceInr?: number;
  forecast?: PriceForecast;
}

export interface MarketTrend {
  month: string;
  dram_index: number;
  nand_flash_index: number;
  gpu_silicon_index: number;
}

export interface SeasonalEvent {
  name: string;
  dates: string;
  expected_discount: string;
  best_category: string;
}

export interface MarketTrendsData {
  component_index: MarketTrend[];
  upcoming_sales: SeasonalEvent[];
}

export interface UserPreferences {
  workload: WorkloadType;
  budgetMin: number;
  budgetMax: number;
  minRamGb: number;
  minSsdGb: number;
  tgpTier: TgpTierType;
  batteryTargetHours: number;
  unidaysActive: boolean;
  searchQuery: string;
  activeTab: 'recommendations' | 'matcher' | 'market' | 'compare';
  theme: 'dark' | 'light';
}

export interface ChatResponse {
  query: string;
  topic: string;
  response: string;
  suggested_prompts: string[];
}
