import React, { useState } from 'react';
import { 
  Calculator, 
  Clock, 
  Calendar, 
  HelpCircle, 
  Check, 
  AlertCircle,
  Car,
  Bike,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import { VehicleType } from '../types/carpark';

export const RatesCalculatorModal: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<VehicleType>('C');
  const [durationHours, setDurationHours] = useState<number>(3);
  const [entryTime, setEntryTime] = useState<string>('14:00');
  const [dayType, setDayType] = useState<'weekday' | 'saturday' | 'sunday'>('weekday');

  // Parse entry hour
  const entryHour = parseInt(entryTime.split(':')[0], 10) || 14;
  const exitHour = (entryHour + durationHours) % 24;
  const spansNight = entryHour >= 18 || exitHour >= 22 || (exitHour < entryHour && exitHour > 0);

  // Compute fee models for Singapore parking
  // 1. Standard HDB Carpark (Outside Central Area)
  const calcHdbStandard = () => {
    if (vehicleType === 'Y') {
      return { fee: 0.65, label: 'Fixed per session / day cap', note: 'Standard HDB motorcycle rate' };
    }
    if (dayType === 'sunday') {
      if (entryHour >= 7 && exitHour <= 22 && !spansNight) {
        return { fee: 0.00, label: 'FREE (Sunday FPS)', note: 'HDB Free Parking Scheme (7:30am - 10:30pm)' };
      }
    }
    const blocksOf30Min = durationHours * 2;
    const baseFee = blocksOf30Min * 0.60;
    const finalFee = spansNight ? Math.min(baseFee, 5.00 + (durationHours > 6 ? 2.40 : 0)) : baseFee;
    return { fee: finalFee, label: `$0.60 / 30 mins`, note: 'Non-central HDB with $5.00 night cap' };
  };

  // 2. Central Area HDB / URA (e.g. Bras Basah, Tanjong Pagar, Bugis)
  const calcHdbCentral = () => {
    if (vehicleType === 'Y') {
      return { fee: 0.65, label: 'Fixed per session', note: 'Standard motorcycle rate' };
    }
    const blocksOf30Min = durationHours * 2;
    // $1.20 per 30 mins from 7am to 5pm
    const isPeak = entryHour >= 7 && entryHour < 17;
    const ratePerBlock = isPeak && dayType !== 'sunday' ? 1.20 : 0.60;
    const fee = blocksOf30Min * ratePerBlock;
    return { fee, label: isPeak ? '$1.20 / 30 mins (Peak)' : '$0.60 / 30 mins', note: 'Central Area tariff' };
  };

  // 3. Orchard / Downtown Shopping Mall (e.g., ION, Takashimaya, Paragon)
  const calcOrchardMall = () => {
    if (vehicleType === 'Y') {
      return { fee: 2.50, label: '$2.00 - $3.00 flat entry', note: 'Motorcycle mall per-entry' };
    }
    // Evening per entry after 5pm/6pm
    if (entryHour >= 18) {
      return { fee: 4.50, label: '$4.50 flat entry', note: 'Dinner / evening per-entry rate' };
    }
    const firstHour = dayType === 'weekday' ? 3.00 : 4.00;
    const subsequentHours = (durationHours - 1) * (dayType === 'weekday' ? 3.00 : 4.00);
    const fee = durationHours <= 1 ? firstHour : firstHour + subsequentHours;
    return { fee, label: `1st hr $${firstHour.toFixed(2)}, then $1.50/30m`, note: 'Prime shopping district rate' };
  };

  // 4. Suburban Shopping Mall (e.g., Jurong Point, Tampines Mall, NEX, Waterway Point)
  const calcSuburbanMall = () => {
    if (vehicleType === 'Y') {
      return { fee: 1.50, label: '$1.50 flat entry', note: 'Suburban mall motorcycle' };
    }
    if (entryHour >= 18) {
      return { fee: 2.80, label: '$2.80 flat entry', note: 'Evening dinner flat rate' };
    }
    const firstHour = 1.80;
    const subsequent = (durationHours - 1) * 2.00;
    const fee = durationHours <= 1 ? firstHour : firstHour + subsequent;
    return { fee, label: '1st hr $1.80, then $0.50/15m', note: 'Heartland shopping mall rate' };
  };

  // 5. CBD Commercial Tower (e.g., One Raffles Quay, Guoco Tower)
  const calcCbdTower = () => {
    if (vehicleType === 'Y') {
      return { fee: 3.50, label: 'Commercial per-entry', note: 'Office tower rate' };
    }
    if (dayType === 'sunday' || entryHour >= 18) {
      return { fee: 4.00, label: '$4.00 per entry', note: 'Off-peak evening/weekend flat rate' };
    }
    const fee = (durationHours * 2) * 3.50; // $7/hr
    return { fee, label: '$3.50 / 30 mins ($7.00/hr)', note: 'CBD peak commercial office tariff' };
  };

  const results = [
    {
      category: 'HDB Outside Central Area',
      tag: 'Best Value',
      calc: calcHdbStandard(),
      recommended: true,
      color: 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
    },
    {
      category: 'Suburban Shopping Mall',
      tag: 'Convenient Heartland',
      calc: calcSuburbanMall(),
      recommended: false,
      color: 'border-neutral-200 dark:border-neutral-800'
    },
    {
      category: 'Central Area HDB / URA',
      tag: 'City Fringe',
      calc: calcHdbCentral(),
      recommended: false,
      color: 'border-neutral-200 dark:border-neutral-800'
    },
    {
      category: 'Orchard Shopping Mall',
      tag: 'Town / Retail',
      calc: calcOrchardMall(),
      recommended: false,
      color: 'border-neutral-200 dark:border-neutral-800'
    },
    {
      category: 'CBD Commercial Tower',
      tag: 'Downtown Office',
      calc: calcCbdTower(),
      recommended: false,
      color: 'border-neutral-200 dark:border-neutral-800'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Title & Introduction */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Singapore Carpark Rates & Parking Fee Estimator
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Compare estimated parking charges across HDB Multi-Storey carparks, URA lots, suburban heartland malls, and Orchard/CBD commercial buildings.
        </p>
      </div>

      {/* Interactive Controls Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        
        {/* Vehicle Selection */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Vehicle Type:
          </span>
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <button
              onClick={() => setVehicleType('C')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                vehicleType === 'C'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Motor Car</span>
            </button>
            <button
              onClick={() => setVehicleType('Y')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                vehicleType === 'Y'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Motorcycle</span>
            </button>
          </div>
        </div>

        {/* Duration, Day, & Entry Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Duration Selector */}
          <div>
            <label className="block text-neutral-600 dark:text-neutral-400 font-medium mb-1.5">
              Parking Duration ({durationHours} hours)
            </label>
            <input
              type="range"
              min="0.5"
              max="12"
              step="0.5"
              value={durationHours}
              onChange={e => setDurationHours(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-neutral-400 mt-1">
              <span>30m</span>
              <span>3h</span>
              <span>6h</span>
              <span>12h</span>
            </div>
          </div>

          {/* Day of Visit */}
          <div>
            <label className="block text-neutral-600 dark:text-neutral-400 font-medium mb-1.5">
              Day of Week
            </label>
            <div className="grid grid-cols-3 gap-1">
              {(['weekday', 'saturday', 'sunday'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setDayType(d)}
                  className={`py-2 px-1 text-center rounded-lg font-medium capitalize transition-colors ${
                    dayType === d
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {d === 'weekday' ? 'Mon-Fri' : d === 'saturday' ? 'Sat' : 'Sun/PH'}
                </button>
              ))}
            </div>
          </div>

          {/* Entry Time */}
          <div>
            <label className="block text-neutral-600 dark:text-neutral-400 font-medium mb-1.5">
              Entry Time
            </label>
            <input
              type="time"
              value={entryTime}
              onChange={e => setEntryTime(e.target.value)}
              className="w-full py-1.5 px-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white font-mono focus:outline-none"
            />
            <span className="text-[11px] text-neutral-400 mt-1 block">
              Estimated exit at: <span className="font-mono text-neutral-700 dark:text-neutral-300">{(entryHour + Math.floor(durationHours)) % 24}:00</span>
            </span>
          </div>

        </div>

      </div>

      {/* Comparison Matrix Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
            Cost Comparison for {durationHours}h stay on {dayType === 'weekday' ? 'Weekday' : dayType === 'saturday' ? 'Saturday' : 'Sunday/PH'}
          </h3>
          <span className="text-xs text-neutral-400">All fees in Singapore Dollars (SGD)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {results.map((res, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border bg-white dark:bg-neutral-900 transition-all ${res.color}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {res.tag}
                  </span>
                  <h4 className="text-base font-semibold text-neutral-900 dark:text-white">
                    {res.category}
                  </h4>
                </div>
                {res.recommended && (
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    Cheapest
                  </span>
                )}
              </div>

              {/* Price display */}
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white">
                  {res.calc.fee === 0 ? 'FREE' : `S$${res.calc.fee.toFixed(2)}`}
                </span>
                {res.calc.fee > 0 && (
                  <span className="text-xs text-neutral-400 font-mono">est.</span>
                )}
              </div>

              <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                {res.calc.label}
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{res.calc.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules & Practical Driver Tips */}
      <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 text-xs space-y-2">
        <h4 className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-neutral-500" />
          <span>Singapore Parking Knowledge & Hacks</span>
        </h4>
        <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-400 list-disc list-inside">
          <li><strong>Grace Period:</strong> Most EPS carparks in Singapore provide a 10 to 15-minute grace period for drop-offs and pick-ups with zero charge.</li>
          <li><strong>Sunday Free Parking (FPS):</strong> Many HDB multi-storey carparks outside central area offer 100% free parking on Sundays and Public Holidays from 7:30 AM to 10:30 PM.</li>
          <li><strong>Mall Night Caps:</strong> Shopping malls in Orchard, Bugis, and CBD usually switch to a flat entry charge ($2.50 - $4.50) after 5:00 PM or 6:00 PM on weekdays.</li>
          <li><strong>HDB Overnight Cap:</strong> Overnight parking (10:30 PM to 7:00 AM) at standard HDB carparks is capped at $5.00 maximum.</li>
        </ul>
      </div>

    </div>
  );
};
