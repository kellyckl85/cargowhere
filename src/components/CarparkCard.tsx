import React from 'react';
import { 
  Navigation, 
  Bookmark, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Maximize2,
  ExternalLink
} from 'lucide-react';
import { Carpark, VehicleType } from '../types/carpark';

interface CarparkCardProps {
  carpark: Carpark;
  vehicleType: VehicleType;
  isSelected: boolean;
  isFavorite: boolean;
  onSelect: (carpark: Carpark) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const CarparkCard: React.FC<CarparkCardProps> = ({
  carpark,
  vehicleType,
  isSelected,
  isFavorite,
  onSelect,
  onToggleFavorite
}) => {
  // Determine lot info for chosen vehicle type
  const lotInfo = vehicleType === 'C'
    ? carpark.vehicleLots.C
    : vehicleType === 'Y'
    ? carpark.vehicleLots.Y || { available: 0, total: 0 }
    : carpark.vehicleLots.H || { available: 0, total: 0 };

  const available = lotInfo.available;
  const total = lotInfo.total || carpark.totalLots;
  const percentage = total > 0 ? Math.round((available / total) * 100) : 0;

  // Status calculation
  const isFull = available <= 3;
  const isLow = available > 3 && (available < 25 || percentage < 15);
  const isGood = !isFull && !isLow;

  const statusColorClass = isFull
    ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900'
    : isLow
    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900'
    : 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900';

  const barColorClass = isFull
    ? 'bg-rose-500'
    : isLow
    ? 'bg-amber-500'
    : 'bg-emerald-500';

  const openGoogleMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${carpark.lat},${carpark.lng}`, '_blank');
  };

  const openWaze = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://waze.com/ul?ll=${carpark.lat},${carpark.lng}&navigate=yes`, '_blank');
  };

  return (
    <div
      onClick={() => onSelect(carpark)}
      className={`group relative bg-white dark:bg-neutral-900 rounded-xl border p-4 transition-all cursor-pointer hover:shadow-md ${
        isSelected
          ? 'border-neutral-900 dark:border-white ring-1 ring-neutral-900 dark:ring-white'
          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700'
      }`}
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-1">
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">{carpark.agency}</span>
            <span aria-hidden="true">·</span>
            <span>{carpark.region}</span>
            <span aria-hidden="true">·</span>
            <span>{carpark.carparkSystem}</span>
            {carpark.distanceKm !== undefined && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400 font-medium">
                  {carpark.distanceKm} km away
                </span>
              </>
            )}
          </div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
            {carpark.name}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
            {carpark.address} (S{carpark.postalCode})
          </p>
        </div>

        {/* Favorite Bookmark Button */}
        <button
          onClick={(e) => onToggleFavorite(carpark.id, e)}
          className={`p-2 rounded-lg transition-colors shrink-0 ${
            isFavorite
              ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30'
              : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
          aria-label={isFavorite ? 'Remove from saved' : 'Save carpark'}
        >
          <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Real-Time Availability Block */}
      <div className={`mt-3 p-3 rounded-lg border flex items-center justify-between gap-4 ${statusColorClass}`}>
        <div>
          <div className="text-xs font-medium uppercase tracking-wide opacity-80">
            {vehicleType === 'C' ? 'Car Lots' : vehicleType === 'Y' ? 'Motorcycle Lots' : 'Heavy Vehicle Lots'} Available
          </div>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-2xl font-bold font-mono tabular-nums tracking-tight">
              {available}
            </span>
            <span className="text-xs opacity-75 font-mono tabular-nums">
              / {total} total
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold uppercase tracking-wider block">
            {isFull ? 'Nearly Full' : isLow ? 'Filling Fast' : 'Lots Available'}
          </span>
          <span className="text-xs font-mono tabular-nums opacity-80">
            {percentage}% capacity free
          </span>
        </div>
      </div>

      {/* Fill Progress Bar */}
      <div className="mt-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColorClass}`}
          style={{ width: `${Math.min(100, Math.max(3, percentage))}%` }}
        />
      </div>

      {/* Info Highlights (Unboxed metadata with separators) */}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-600 dark:text-neutral-400">
        <div>
          <span className="text-neutral-400 dark:text-neutral-500">Rate: </span>
          <span className="font-semibold text-neutral-900 dark:text-white font-mono tabular-nums">
            ${carpark.rates.perHourEstimate.toFixed(2)}/hr
          </span>
        </div>
        <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
        <div>
          <span className="text-neutral-400 dark:text-neutral-500">Clearance: </span>
          <span className="font-mono tabular-nums">{carpark.gantryHeight}m</span>
        </div>
        <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
        <div>
          <span className="text-neutral-400 dark:text-neutral-500">Grace: </span>
          <span>{carpark.rates.gracePeriodMinutes} mins</span>
        </div>
      </div>

      {/* Feature Tags (EV & Free Parking) */}
      {(carpark.evChargers || carpark.freeParking === 'SUN & PH ONLY') && (
        <div className="mt-2.5 flex items-center gap-3 text-xs">
          {carpark.evChargers && (
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <Zap className="w-3.5 h-3.5 shrink-0" />
              <span>{carpark.evChargers.provider} ({carpark.evChargers.count} lots)</span>
            </div>
          )}
          {carpark.freeParking === 'SUN & PH ONLY' && (
            <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Sunday Free Scheme</span>
            </div>
          )}
        </div>
      )}

      {/* Card Actions: Direct Navigation links */}
      <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
        <span className="text-xs text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors flex items-center gap-1">
          <Maximize2 className="w-3 h-3" />
          <span>View rates & calculator</span>
        </span>

        <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
          <button
            onClick={openGoogleMaps}
            title="Navigate via Google Maps"
            className="px-2.5 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-md transition-colors flex items-center gap-1"
          >
            <Navigation className="w-3 h-3 text-emerald-500" />
            <span>Maps</span>
          </button>
          <button
            onClick={openWaze}
            title="Navigate via Waze"
            className="px-2.5 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-md transition-colors flex items-center gap-1"
          >
            <span>Waze</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </button>
        </div>
      </div>
    </div>
  );
};
