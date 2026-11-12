import React, { useState } from 'react';
import { 
  X, 
  Navigation, 
  Bookmark, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  CreditCard,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  AlertTriangle,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Carpark, VehicleType } from '../types/carpark';

interface CarparkDetailModalProps {
  carpark: Carpark | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  vehicleType: VehicleType;
}

export const CarparkDetailModal: React.FC<CarparkDetailModalProps> = ({
  carpark,
  onClose,
  isFavorite,
  onToggleFavorite,
  vehicleType
}) => {
  const [copied, setCopied] = useState(false);
  const [calcDurationHours, setCalcDurationHours] = useState<number>(2);
  const [calcDayType, setCalcDayType] = useState<'weekday' | 'saturday' | 'sunday'>('weekday');
  const [calcIsNight, setCalcIsNight] = useState<boolean>(false);

  if (!carpark) return null;

  const lotInfo = vehicleType === 'C'
    ? carpark.vehicleLots.C
    : vehicleType === 'Y'
    ? carpark.vehicleLots.Y || { available: 0, total: 0 }
    : carpark.vehicleLots.H || { available: 0, total: 0 };

  const available = lotInfo.available;
  const total = lotInfo.total || carpark.totalLots;
  const percentage = total > 0 ? Math.round((available / total) * 100) : 0;

  const isFull = available <= 3;
  const isLow = available > 3 && available < 25;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${carpark.name}, ${carpark.address}, Singapore ${carpark.postalCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate estimated parking fee
  const calculateEstimatedFee = (): { total: number; explanation: string } => {
    if (calcDayType === 'sunday' && carpark.freeParking === 'SUN & PH ONLY' && !calcIsNight) {
      return {
        total: 0,
        explanation: 'Free parking under HDB Free Parking Scheme (07:30 - 22:30)'
      };
    }

    if (calcIsNight && carpark.rates.flatNightCap) {
      return {
        total: carpark.rates.perHourEstimate * 0.7, // night rate estimate
        explanation: `Night cap applies (${carpark.rates.flatNightCap})`
      };
    }

    const hourly = carpark.rates.perHourEstimate;
    const estimated = hourly * calcDurationHours;
    return {
      total: Math.max(0.60, Math.round(estimated * 10) / 10),
      explanation: `Based on ~$${hourly.toFixed(2)}/hr rate for ${calcDurationHours} hours`
    };
  };

  const calculatedFee = calculateEstimatedFee();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden my-6 transition-colors"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">{carpark.agency} Carpark</span>
            <span aria-hidden="true">·</span>
            <span>{carpark.region} Region</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{carpark.carparkNo}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={e => onToggleFavorite(carpark.id, e)}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                  : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
              title={isFavorite ? 'Saved' : 'Save'}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Header & Address */}
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              {carpark.name}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>{carpark.address}, Singapore {carpark.postalCode}</span>
              <button
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline font-medium ml-1"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Address'}</span>
              </button>
            </div>
          </div>

          {/* Real-Time Availability Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Cars */}
            <div className={`p-4 rounded-xl border ${
              vehicleType === 'C' ? 'ring-2 ring-emerald-500/50 dark:ring-emerald-400/50' : ''
            } bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700`}>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Car Lots</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white">
                  {carpark.vehicleLots.C.available}
                </span>
                <span className="text-xs text-neutral-400 font-mono tabular-nums">
                  / {carpark.vehicleLots.C.total}
                </span>
              </div>
              <div className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                {carpark.vehicleLots.C.available > 25 ? 'High availability' : carpark.vehicleLots.C.available > 5 ? 'Moderate' : 'Low lots'}
              </div>
            </div>

            {/* Motorcycles */}
            <div className={`p-4 rounded-xl border ${
              vehicleType === 'Y' ? 'ring-2 ring-emerald-500/50 dark:ring-emerald-400/50' : ''
            } bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700`}>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Motorcycle Lots</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white">
                  {carpark.vehicleLots.Y?.available ?? 'N/A'}
                </span>
                {carpark.vehicleLots.Y && (
                  <span className="text-xs text-neutral-400 font-mono tabular-nums">
                    / {carpark.vehicleLots.Y.total}
                  </span>
                )}
              </div>
              <div className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                $0.20/hr or $0.65/day HDB cap
              </div>
            </div>

            {/* Heavy / EV Lots */}
            <div className={`p-4 rounded-xl border ${
              vehicleType === 'H' ? 'ring-2 ring-emerald-500/50 dark:ring-emerald-400/50' : ''
            } bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700`}>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                {carpark.evChargers ? 'EV Charging Bays' : 'Heavy Vehicle Lots'}
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                  {carpark.evChargers ? carpark.evChargers.count : (carpark.vehicleLots.H?.available ?? '0')}
                </span>
                <span className="text-xs text-neutral-400 font-mono tabular-nums">
                  {carpark.evChargers ? 'chargers' : `/ ${carpark.vehicleLots.H?.total ?? 0}`}
                </span>
              </div>
              <div className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                {carpark.evChargers ? carpark.evChargers.provider : 'Lorry / Bus bays'}
              </div>
            </div>
          </div>

          {/* Occupancy Trend Visual (Sparkline) */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-2">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                Recent Availability Curve
              </span>
              <span className="text-neutral-400">Live data sample</span>
            </div>
            <div className="h-16 flex items-end gap-1.5 pt-2">
              {carpark.history.map((val, idx) => {
                const max = Math.max(...carpark.history, carpark.totalLots);
                const heightPct = Math.max(15, Math.round((val / max) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div
                      className="w-full bg-emerald-500/70 hover:bg-emerald-500 rounded-t transition-all"
                      style={{ height: `${heightPct}%` }}
                    />
                    <div className="hidden group-hover:block absolute bottom-full mb-1 z-30 px-1.5 py-0.5 text-[10px] font-mono bg-neutral-900 text-white rounded whitespace-nowrap">
                      {val} lots
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1.5">
              <span>Earlier</span>
              <span>Now ({available} lots)</span>
            </div>
          </div>

          {/* Interactive Singapore Parking Fee Calculator */}
          <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
                <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Estimated Parking Fee Calculator</span>
              </div>
              <span className="text-xs text-neutral-500">
                Grace period: {carpark.rates.gracePeriodMinutes}m
              </span>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-neutral-500 dark:text-neutral-400 mb-1">Stay Duration</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 5].map(hrs => (
                    <button
                      key={hrs}
                      onClick={() => setCalcDurationHours(hrs)}
                      className={`flex-1 py-1.5 rounded-md font-medium font-mono text-center transition-colors ${
                        calcDurationHours === hrs
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {hrs}h
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-neutral-500 dark:text-neutral-400 mb-1">Day of Visit</label>
                <select
                  value={calcDayType}
                  onChange={e => setCalcDayType(e.target.value as any)}
                  className="w-full py-1.5 px-2 bg-neutral-100 dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none"
                >
                  <option value="weekday">Weekday (Mon - Fri)</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday / Public Hol</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-500 dark:text-neutral-400 mb-1">Time of Day</label>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCalcIsNight(false)}
                    className={`flex-1 py-1.5 rounded-md font-medium text-center transition-colors ${
                      !calcIsNight
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    Daytime
                  </button>
                  <button
                    onClick={() => setCalcIsNight(true)}
                    className={`flex-1 py-1.5 rounded-md font-medium text-center transition-colors ${
                      calcIsNight
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    Night / Eve
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Result Box */}
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-800 dark:text-emerald-300 font-medium block">
                  Estimated Total Fee:
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {calculatedFee.explanation}
                </span>
              </div>
              <div className="text-xl font-bold font-mono tabular-nums text-emerald-700 dark:text-emerald-300">
                {calculatedFee.total === 0 ? 'FREE' : `S$${calculatedFee.total.toFixed(2)}`}
              </div>
            </div>
          </div>

          {/* Official Rates Breakdown */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-neutral-900 dark:text-white">Published Tariff Structure</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-600 dark:text-neutral-400">
              <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
                <span className="font-medium text-neutral-800 dark:text-neutral-200 block">Weekday (Day)</span>
                <span>{carpark.rates.weekdayDay}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
                <span className="font-medium text-neutral-800 dark:text-neutral-200 block">Weekday (Night)</span>
                <span>{carpark.rates.weekdayNight}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
                <span className="font-medium text-neutral-800 dark:text-neutral-200 block">Weekend / PH (Day)</span>
                <span>{carpark.rates.weekendDay}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
                <span className="font-medium text-neutral-800 dark:text-neutral-200 block">Weekend / PH (Night)</span>
                <span>{carpark.rates.weekendNight}</span>
              </div>
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/30">
              <span className="text-neutral-400 block">Gantry Clearance</span>
              <span className="font-semibold font-mono text-neutral-900 dark:text-white">
                {carpark.gantryHeight} meters
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/30">
              <span className="text-neutral-400 block">Parking System</span>
              <span className="font-semibold text-neutral-900 dark:text-white truncate block">
                {carpark.systemType}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/30">
              <span className="text-neutral-400 block">Structure</span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                {carpark.carparkSystem}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/30">
              <span className="text-neutral-400 block">Sunday Free Scheme</span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                {carpark.freeParking}
              </span>
            </div>
          </div>

          {/* EV Charging Info if present */}
          {carpark.evChargers && (
            <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-neutral-900 dark:text-white block">
                    {carpark.evChargers.provider} ({carpark.evChargers.count} charging bays)
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {carpark.evChargers.powerKw} · {carpark.evChargers.pricePerKwh}
                  </span>
                </div>
              </div>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-xs">
                Active Station
              </span>
            </div>
          )}

          {/* Driver Notes */}
          {carpark.notes && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 italic">
              Note: {carpark.notes}
            </p>
          )}

        </div>

        {/* Modal Footer / Navigation Buttons */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-neutral-500 font-mono">
            Lat: {carpark.lat}, Lng: {carpark.lng}
          </span>

          <div className="flex items-center gap-2">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${carpark.lat},${carpark.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg shadow-sm transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </a>
            <a
              href={`https://waze.com/ul?ll=${carpark.lat},${carpark.lng}&navigate=yes`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-white hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 rounded-lg transition-colors"
            >
              <span>Waze</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
