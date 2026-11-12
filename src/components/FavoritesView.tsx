import React from 'react';
import { 
  Bookmark, 
  MapPin, 
  Navigation, 
  Trash2, 
  Car, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Carpark, VehicleType } from '../types/carpark';

interface FavoritesViewProps {
  favoriteCarparks: Carpark[];
  onSelectCarpark: (carpark: Carpark) => void;
  onRemoveFavorite: (id: string) => void;
  onExploreMap: () => void;
  vehicleType: VehicleType;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteCarparks,
  onSelectCarpark,
  onRemoveFavorite,
  onExploreMap,
  vehicleType
}) => {
  if (favoriteCarparks.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
          <Bookmark className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
          No Saved Carparks Yet
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
          Bookmark your daily home HDB carpark, office building in the CBD, or favourite weekend malls for instant one-tap lot availability checks.
        </p>
        <button
          onClick={onExploreMap}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-all shadow-sm"
        >
          <span>Explore Live Singapore Map</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Saved Carparks
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Real-time occupancy for your bookmarked locations
          </p>
        </div>
        <span className="text-xs font-mono tabular-nums text-neutral-500">
          {favoriteCarparks.length} saved
        </span>
      </div>

      {/* Grid of Saved Carparks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {favoriteCarparks.map(cp => {
          const lotInfo = vehicleType === 'C'
            ? cp.vehicleLots.C
            : vehicleType === 'Y'
            ? cp.vehicleLots.Y || { available: 0, total: 0 }
            : cp.vehicleLots.H || { available: 0, total: 0 };

          const available = lotInfo.available;
          const total = lotInfo.total || cp.totalLots;
          const percentage = total > 0 ? Math.round((available / total) * 100) : 0;

          const isFull = available <= 3;
          const isLow = available > 3 && available < 25;

          return (
            <div
              key={cp.id}
              onClick={() => onSelectCarpark(cp)}
              className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">{cp.agency}</span>
                      <span aria-hidden="true">·</span>
                      <span>{cp.region}</span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
                      {cp.name}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {cp.address}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(cp.id);
                    }}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Availability Row */}
                <div className="mt-4 p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl flex items-center justify-between border border-neutral-100 dark:border-neutral-800">
                  <div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block">Lots Available</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white">
                        {available}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">
                        / {total}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs font-semibold block ${
                      isFull ? 'text-rose-600 dark:text-rose-400' : isLow ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {isFull ? 'Nearly Full' : isLow ? 'Filling Up' : 'Lots Available'}
                    </span>
                    <span className="text-xs font-mono tabular-nums text-neutral-400">
                      {percentage}% free
                    </span>
                  </div>
                </div>

                {/* Rates info */}
                <div className="mt-3 flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                  <span>Rate: ~${cp.rates.perHourEstimate.toFixed(2)}/hr</span>
                  <span aria-hidden="true">·</span>
                  <span>Clearance: {cp.gantryHeight}m</span>
                  {cp.rates.freeParkingRule && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">Sunday Free</span>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Click to view full rates & trends
                </span>

                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${cp.lat},${cp.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Navigate</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
