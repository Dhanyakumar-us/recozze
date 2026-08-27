import type { Laptop } from '../types/laptop';

export function getLaptopImage(laptop: Laptop): string {
  return (
    laptop.image ||
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80'
  );
}

export function getLaptopPrice(laptop: Laptop, unidaysActive = false): number {
  if (unidaysActive && laptop.studentPriceInr) {
    return laptop.studentPriceInr;
  }
  return laptop.currentBestPriceInr || laptop.msrpInr || 0;
}

export function getLaptopCpu(laptop: Laptop): string {
  return laptop.specs?.cpu || 'Multi-Core Processor';
}

export function getLaptopGpu(laptop: Laptop): string {
  return laptop.specs?.gpu || 'Dedicated GPU';
}

export function getLaptopTgp(laptop: Laptop): number {
  return laptop.specs?.tgpWatts || 90;
}

export function getLaptopRam(laptop: Laptop): number {
  return laptop.specs?.ramGb || 16;
}

export function getLaptopSsd(laptop: Laptop): number {
  return laptop.specs?.ssdStorageGb || 512;
}

export function getLaptopWeight(laptop: Laptop): number {
  return laptop.specs?.weightKg || 1.8;
}

export function getLaptopRefreshHz(laptop: Laptop): number {
  return laptop.specs?.display?.refresh_rate_hz || 144;
}

export function getLaptopResolution(laptop: Laptop): string {
  return laptop.specs?.display?.resolution || 'FHD IPS';
}

export function getLaptopScreenSize(laptop: Laptop): number {
  return laptop.specs?.display?.size_inches || 15.6;
}

export function getLaptopBatteryHours(laptop: Laptop): number {
  return laptop.specs?.batteryHours || 6;
}

export function getLaptopMatchScore(laptop: Laptop): number {
  return laptop.calculatedMatchPct || laptop.realtimeScore || 92;
}

export function getLaptopMsrpPrice(laptop: Laptop): number {
  return laptop.msrpInr || (laptop as any).price_inr || laptop.currentBestPriceInr || 0;
}

export function getLaptopStudentDiscountPct(laptop: Laptop): number {
  const msrp = getLaptopMsrpPrice(laptop);
  const studentPrice = laptop.studentPriceInr || (laptop as any).unidays_price_inr;
  if (!msrp || !studentPrice || studentPrice >= msrp) return 0;
  return Math.round(((msrp - studentPrice) / msrp) * 100);
}

export function getLaptopStudentSavingsInr(laptop: Laptop): number {
  const msrp = getLaptopMsrpPrice(laptop);
  const studentPrice = laptop.studentPriceInr || (laptop as any).unidays_price_inr;
  if (!msrp || !studentPrice || studentPrice >= msrp) return 0;
  return msrp - studentPrice;
}

export function getLaptopStudentCashbackInr(laptop: Laptop): number {
  return (laptop as any).student_cashback_inr || (laptop as any).studentCashbackInr || 0;
}

