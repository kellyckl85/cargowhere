export type CarparkType = 'HDB' | 'URA' | 'Shopping Mall' | 'Commercial';

export type SingaporeRegion = 'Central' | 'East' | 'West' | 'North' | 'North-East';

export type VehicleType = 'C' | 'Y' | 'H'; // C: Car, Y: Motorcycle, H: Heavy Vehicle

export interface VehicleLotInfo {
  available: number;
  total: number;
}

export interface EVChargerInfo {
  count: number;
  provider: 'SP Mobility' | 'CDG ENGIE' | 'Shell Recharge' | 'Charge+' | 'Tesla Supercharger';
  powerKw: string;
  pricePerKwh: string;
}

export interface CarparkRates {
  weekdayDay: string;
  weekdayNight: string;
  weekendDay: string;
  weekendNight: string;
  perHourEstimate: number; // SGD
  flatNightCap?: string;
  gracePeriodMinutes: number;
  freeParkingRule?: string; // e.g., 'Free on Sundays & PH (7:30am - 10:30pm)'
}

export interface Carpark {
  id: string;
  carparkNo: string;
  name: string;
  address: string;
  postalCode: string;
  region: SingaporeRegion;
  type: CarparkType;
  agency: 'HDB' | 'URA' | 'LTA' | 'Private';
  lat: number;
  lng: number;
  gantryHeight: number; // in meters
  carparkSystem: 'Multi-storey' | 'Surface' | 'Basement' | 'Mechanised';
  systemType: 'Electronic Parking System (EPS)' | 'Coupons';
  nightParking: boolean;
  freeParking: 'NO' | 'SUN & PH ONLY' | 'AFTER 5PM' | 'NONE';
  lotsAvailable: number;
  totalLots: number;
  vehicleLots: {
    C: VehicleLotInfo;
    Y?: VehicleLotInfo;
    H?: VehicleLotInfo;
  };
  evChargers?: EVChargerInfo | null;
  rates: CarparkRates;
  history: number[]; // 24-hr availability curve
  lastUpdated: string; // ISO string
  notes?: string;
  distanceKm?: number; // calculated on user geolocation
}

export interface CarparkFilterState {
  searchQuery: string;
  region: 'All' | SingaporeRegion;
  type: 'All' | CarparkType;
  vehicleType: VehicleType;
  availability: 'all' | 'available' | 'high_availability' | 'critical';
  evOnly: boolean;
  sundayFreeOnly: boolean;
  highClearanceOnly: boolean; // >= 2.0m
  sortBy: 'recommended' | 'lots' | 'rate' | 'distance';
}
