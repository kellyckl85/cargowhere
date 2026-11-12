import React from 'react';
import { 
  Search, 
  X, 
  Zap, 
  ArrowUpDown, 
  SlidersHorizontal,
  ShieldCheck,
  Truck,
  Car,
  Bike
} from 'lucide-react';
import { CarparkFilterState, SingaporeRegion, CarparkType, VehicleType } from '../types/carpark';

interface FilterBarProps {
  filters: CarparkFilterState;
  setFilters: React.Dispatch<React.SetStateAction<CarparkFilterState>>;
  totalCount: number;
  filteredCount: number;
  hasUserLocation: boolean;
}

const REGIONS: Array<'All' | SingaporeRegion> = ['All', 'Central', 'East', 'West', 'North', 'North-East'];
const TYPES: Array<'All' | CarparkType> = ['All', 'HDB', 'Shopping Mall', 'Commercial', 'URA'];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  totalCount,
  filteredCount,
  hasUserLocation
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  const clearSearch = () => {
    setFilters(prev => ({ ...prev, searchQuery: '' }));
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 p-4 transition-colors">
      <div className="max-w-7xl mx-auto space-y-3">
        
        {/* Row 1: Search & Vehicle Type & Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={handleSearchChange}
              placeholder="Search carpark, mall, HDB block, road or postal code..."
              className="w-full pl-9 pr-9 py-2 text-sm bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            />
            {filters.searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Vehicle Selector (Segmented control) */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg self-start sm:self-auto shrink-0">
            <button
              onClick={() => setFilters(prev => ({ ...prev, vehicleType: 'C' }))}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                filters.vehicleType === 'C'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Cars</span>
            </button>
            <button
              onClick={() => setFilters(prev => ({ ...prev, vehicleType: 'Y' }))}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                filters.vehicleType === 'Y'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Motorcycles</span>
            </button>
            <button
              onClick={() => setFilters(prev => ({ ...prev, vehicleType: 'H' }))}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                filters.vehicleType === 'H'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Heavy</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative inline-flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 absolute left-3 text-neutral-400 pointer-events-none" />
              <select
                value={filters.sortBy}
                onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="pl-8 pr-8 py-2 text-xs font-medium bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer appearance-none"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="lots">Sort: Most Available Lots</option>
                <option value="rate">Sort: Lowest Hourly Rate</option>
                {hasUserLocation && <option value="distance">Sort: Nearest Distance</option>}
              </select>
            </div>
          </div>

        </div>

        {/* Row 2: Region Tabs & Feature Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          
          {/* Region Tabs (Segmented control) */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {REGIONS.map(reg => (
              <button
                key={reg}
                onClick={() => setFilters(prev => ({ ...prev, region: reg }))}
                className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  filters.region === reg
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {reg === 'All' ? 'All Regions' : reg}
              </button>
            ))}
          </div>

          {/* Feature toggles */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {/* EV Charger Toggle */}
            <button
              onClick={() => setFilters(prev => ({ ...prev, evOnly: !prev.evOnly }))}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
                filters.evOnly
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-400'
                  : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>EV Charging</span>
            </button>

            {/* Sunday Free Parking */}
            <button
              onClick={() => setFilters(prev => ({ ...prev, sundayFreeOnly: !prev.sundayFreeOnly }))}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
                filters.sundayFreeOnly
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-700 dark:text-amber-400'
                  : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sunday Free Scheme</span>
            </button>

            {/* High Clearance >= 2.0m */}
            <button
              onClick={() => setFilters(prev => ({ ...prev, highClearanceOnly: !prev.highClearanceOnly }))}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
                filters.highClearanceOnly
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-700 dark:text-blue-400'
                  : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              <span>Clearance ≥ 2.0m</span>
            </button>

            {/* Counter display (Anti-pill text) */}
            <span className="text-xs text-neutral-400 dark:text-neutral-500 whitespace-nowrap pl-2">
              <span className="font-mono tabular-nums font-semibold text-neutral-700 dark:text-neutral-300">
                {filteredCount}
              </span> of {totalCount} carparks
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
