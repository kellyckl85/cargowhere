import React from 'react';
import { 
  Car, 
  MapPin, 
  RefreshCw, 
  Sun, 
  Moon, 
  Compass,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'map' | 'rates' | 'ev' | 'saved';
  setActiveTab: (tab: 'map' | 'rates' | 'ev' | 'saved') => void;
  onLocateNearby: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: string;
  source: string;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onLocateNearby,
  onRefresh,
  isRefreshing,
  lastUpdated,
  source,
  isDark,
  setIsDark,
  savedCount
}) => {
  const formatTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return 'Just now';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones (Brand wordmark, Nav links, 1 Primary Action) */}
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveTab('map')} 
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105">
                <Car className="w-5 h-5 text-emerald-400 dark:text-emerald-600" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white whitespace-nowrap">
                  SG ParkPulse
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs text-neutral-400 dark:text-neutral-500 font-medium">
                  Singapore Real-Time Lots
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => setActiveTab('map')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 ${
                activeTab === 'map'
                  ? 'text-neutral-900 dark:text-white border-b-2 border-emerald-500 font-semibold'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Live Map & List
            </button>
            <button
              onClick={() => setActiveTab('rates')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 ${
                activeTab === 'rates'
                  ? 'text-neutral-900 dark:text-white border-b-2 border-emerald-500 font-semibold'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              EPS Rates Calculator
            </button>
            <button
              onClick={() => setActiveTab('ev')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 ${
                activeTab === 'ev'
                  ? 'text-neutral-900 dark:text-white border-b-2 border-emerald-500 font-semibold'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              EV Charging Stations
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 flex items-center gap-1.5 ${
                activeTab === 'saved'
                  ? 'text-neutral-900 dark:text-white border-b-2 border-emerald-500 font-semibold'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Saved Lots
              {savedCount > 0 && (
                <span className="text-xs font-mono tabular-nums px-1.5 py-0.2 bg-neutral-200 dark:bg-neutral-800 rounded text-neutral-700 dark:text-neutral-300">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>

          {/* Zone 3: 1 primary action & utility controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Live refresh button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title={`Last synced: ${formatTime(lastUpdated)} (${source})`}
              className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-500' : ''}`} />
              <span className="hidden xl:inline text-neutral-500 dark:text-neutral-400">
                {formatTime(lastUpdated)}
              </span>
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Primary Action Button: Find Nearby */}
            <button
              onClick={onLocateNearby}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 active:scale-95"
            >
              <Compass className="w-4 h-4 text-emerald-400 dark:text-white" />
              <span>Find Nearby</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
          <button
            onClick={() => setActiveTab('map')}
            className={`py-1 px-2.5 rounded font-medium ${
              activeTab === 'map'
                ? 'text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            Live Map
          </button>
          <button
            onClick={() => setActiveTab('rates')}
            className={`py-1 px-2.5 rounded font-medium ${
              activeTab === 'rates'
                ? 'text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            Rate Calculator
          </button>
          <button
            onClick={() => setActiveTab('ev')}
            className={`py-1 px-2.5 rounded font-medium ${
              activeTab === 'ev'
                ? 'text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            EV Chargers
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`py-1 px-2.5 rounded font-medium ${
              activeTab === 'saved'
                ? 'text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            Saved ({savedCount})
          </button>
        </div>
      </div>
    </header>
  );
};
