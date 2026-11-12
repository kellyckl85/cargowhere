import React from 'react';
import { 
  Zap, 
  MapPin, 
  Navigation, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Clock,
  BatteryCharging
} from 'lucide-react';
import { Carpark } from '../types/carpark';

interface EVStationsViewProps {
  carparks: Carpark[];
  onSelectCarpark: (carpark: Carpark) => void;
}

export const EVStationsView: React.FC<EVStationsViewProps> = ({
  carparks,
  onSelectCarpark
}) => {
  const evCarparks = carparks.filter(c => c.evChargers && c.evChargers.count > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          <Zap className="w-4 h-4" />
          <span>Singapore EV Charging Network</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
          Carparks with Real-Time EV Charging Stations
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Find available carparks with active AC & DC fast chargers across SP Mobility, CDG ENGIE, Shell Recharge, Charge+, and Tesla Supercharger networks.
        </p>
      </div>

      {/* Network Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">EV Equipped Sites</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white mt-1">
            {evCarparks.length}
          </div>
          <span className="text-[11px] text-neutral-400">Across all SG regions</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">Total Charging Bays</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-1">
            {evCarparks.reduce((sum, c) => sum + (c.evChargers?.count || 0), 0)}
          </div>
          <span className="text-[11px] text-neutral-400">CCS2 & Type 2 ports</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">Fast DC Chargers</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-blue-600 dark:text-blue-400 mt-1">
            50kW - 120kW
          </div>
          <span className="text-[11px] text-neutral-400">Rapid top-up</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">Typical Tariffs</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white mt-1">
            $0.58 - $0.68
          </div>
          <span className="text-[11px] text-neutral-400">SGD per kWh</span>
        </div>
      </div>

      {/* EV Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {evCarparks.map(cp => {
          const charger = cp.evChargers!;
          const isDc = charger.powerKw.includes('DC') || charger.powerKw.includes('Supercharger');

          return (
            <div
              key={cp.id}
              onClick={() => onSelectCarpark(cp)}
              className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{cp.region}</span>
                    <span aria-hidden="true">·</span>
                    <span>{cp.type}</span>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded font-mono ${
                    isDc 
                      ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400' 
                      : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                  }`}>
                    {isDc ? 'DC Fast' : 'AC Standard'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-900 dark:text-white mt-1">
                  {cp.name}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {cp.address} (S{cp.postalCode})
                </p>

                {/* EV Specs Card */}
                <div className="mt-4 p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl space-y-2 border border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500 dark:text-neutral-400">Operator</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">{charger.provider}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500 dark:text-neutral-400">Power Output</span>
                    <span className="font-mono font-medium text-neutral-900 dark:text-white">{charger.powerKw}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500 dark:text-neutral-400">Energy Tariff</span>
                    <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">{charger.pricePerKwh}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-200/50 dark:border-neutral-700/50">
                    <span className="text-neutral-500 dark:text-neutral-400">Available EV Bays</span>
                    <span className="font-mono font-bold text-neutral-900 dark:text-white">{charger.count} dedicated bays</span>
                  </div>
                </div>

                {/* Carpark Live Status */}
                <div className="mt-3 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
                  <span>General Car Lots:</span>
                  <span className="font-mono tabular-nums font-semibold text-neutral-900 dark:text-white">
                    {cp.lotsAvailable} lots free
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Rate: ${cp.rates.perHourEstimate.toFixed(2)}/hr
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
