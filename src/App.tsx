import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { INITIAL_CARPARKS } from './data/singaporeCarparks';
import { Carpark, CarparkFilterState, VehicleType } from './types/carpark';
import { fetchLiveCarparkData, calculateDistanceKm } from './services/dataGovApi';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { CarparkCard } from './components/CarparkCard';
import { CarparkMap } from './components/CarparkMap';
import { CarparkDetailModal } from './components/CarparkDetailModal';
import { RatesCalculatorModal } from './components/RatesCalculatorModal';
import { EVStationsView } from './components/EVStationsView';
import { FavoritesView } from './components/FavoritesView';
import { 
  Map, 
  List, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  Car,
  Compass,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [carparks, setCarparks] = useState<Carpark[]>(INITIAL_CARPARKS);
  const [selectedCarpark, setSelectedCarpark] = useState<Carpark | null>(null);
  const [activeTab, setActiveTab] = useState<'map' | 'rates' | 'ev' | 'saved'>('map');
  const [mobileView, setMobileView] = useState<'split' | 'map' | 'list'>('split');
  
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Synchronization status
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toISOString());
  const [dataSource, setDataSource] = useState<string>('Data.gov.sg (Live LTA API)');
  const [liveCount, setLiveCount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User location
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sg_carpark_favorites');
      return saved ? JSON.parse(saved) : ['MALL-ION', 'HDB-ACB'];
    } catch {
      return ['MALL-ION', 'HDB-ACB'];
    }
  });

  // Filters state
  const [filters, setFilters] = useState<CarparkFilterState>({
    searchQuery: '',
    region: 'All',
    type: 'All',
    vehicleType: 'C',
    availability: 'all',
    evOnly: false,
    sundayFreeOnly: false,
    highClearanceOnly: false,
    sortBy: 'recommended'
  });

  // Theme synchronization with HTML class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem('sg_carpark_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync real-time data from Data.gov.sg
  const syncLiveData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetchLiveCarparkData(carparks);
      
      // Update distances if user location exists
      const updated = res.updatedCarparks.map(cp => {
        if (userLocation) {
          const dist = calculateDistanceKm(userLocation.lat, userLocation.lng, cp.lat, cp.lng);
          return { ...cp, distanceKm: dist };
        }
        return cp;
      });

      setCarparks(updated);
      setLastUpdated(res.lastUpdated);
      setDataSource(res.source);
      setLiveCount(res.liveCount);
      showToast(`Updated lots from ${res.source}`);
    } catch (err) {
      console.error('Sync failed:', err);
      showToast('Could not reach Data.gov.sg, using cached lots');
    } finally {
      setIsRefreshing(false);
    }
  }, [carparks, userLocation]);

  // Initial fetch and auto-refresh interval (every 60 seconds)
  useEffect(() => {
    syncLiveData();

    const interval = setInterval(() => {
      syncLiveData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Request user geolocation
  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser');
      return;
    }

    showToast('Locating your position in Singapore...');
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        const coords = { lat: latitude, lng: longitude };
        setUserLocation(coords);

        // Recalculate distances
        setCarparks(prev =>
          prev.map(cp => ({
            ...cp,
            distanceKm: calculateDistanceKm(latitude, longitude, cp.lat, cp.lng)
          }))
        );

        // Switch sort to distance
        setFilters(f => ({ ...f, sortBy: 'distance' }));
        showToast('Location updated! Sorted by closest distance');
      },
      err => {
        console.warn('Geolocation failed or permission denied:', err.message);
        // Fallback default: Orchard Road area
        const fallback = { lat: 1.3040, lng: 103.8318 };
        setUserLocation(fallback);
        setCarparks(prev =>
          prev.map(cp => ({
            ...cp,
            distanceKm: calculateDistanceKm(fallback.lat, fallback.lng, cp.lat, cp.lng)
          }))
        );
        showToast('Using Orchard Road center as reference location');
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  // Toggle favorite
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item !== id));
  };

  // Filtered & Sorted Carparks
  const filteredCarparks = useMemo(() => {
    return carparks
      .filter(cp => {
        // Search query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const match =
            cp.name.toLowerCase().includes(q) ||
            cp.address.toLowerCase().includes(q) ||
            cp.carparkNo.toLowerCase().includes(q) ||
            cp.postalCode.includes(q) ||
            cp.agency.toLowerCase().includes(q) ||
            (cp.notes && cp.notes.toLowerCase().includes(q));
          if (!match) return false;
        }

        // Region
        if (filters.region !== 'All' && cp.region !== filters.region) {
          return false;
        }

        // Carpark Type
        if (filters.type !== 'All' && cp.type !== filters.type) {
          return false;
        }

        // EV only
        if (filters.evOnly && (!cp.evChargers || cp.evChargers.count === 0)) {
          return false;
        }

        // Sunday free only
        if (filters.sundayFreeOnly && cp.freeParking !== 'SUN & PH ONLY') {
          return false;
        }

        // High clearance >= 2.0m
        if (filters.highClearanceOnly && cp.gantryHeight < 2.0) {
          return false;
        }

        // Vehicle availability check
        const lotInfo = filters.vehicleType === 'C'
          ? cp.vehicleLots.C
          : filters.vehicleType === 'Y'
          ? cp.vehicleLots.Y
          : cp.vehicleLots.H;

        if (!lotInfo) return false;

        if (filters.availability === 'available' && lotInfo.available <= 0) {
          return false;
        }
        if (filters.availability === 'high_availability' && lotInfo.available < 25) {
          return false;
        }
        if (filters.availability === 'critical' && lotInfo.available > 5) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'lots') {
          const lotsA = filters.vehicleType === 'C' ? a.vehicleLots.C.available : (a.vehicleLots.Y?.available || 0);
          const lotsB = filters.vehicleType === 'C' ? b.vehicleLots.C.available : (b.vehicleLots.Y?.available || 0);
          return lotsB - lotsA;
        }
        if (filters.sortBy === 'rate') {
          return a.rates.perHourEstimate - b.rates.perHourEstimate;
        }
        if (filters.sortBy === 'distance' && a.distanceKm !== undefined && b.distanceKm !== undefined) {
          return a.distanceKm - b.distanceKm;
        }
        // Recommended: sort by available lots descending with prominent sites
        return b.lotsAvailable - a.lotsAvailable;
      });
  }, [carparks, filters]);

  // Favorite Carparks full list
  const favoriteCarparksList = useMemo(() => {
    return carparks.filter(cp => favorites.includes(cp.id));
  }, [carparks, favorites]);

  // Aggregate stats
  const totalAvailableCars = useMemo(() => {
    return carparks.reduce((sum, cp) => sum + cp.vehicleLots.C.available, 0);
  }, [carparks]);

  const totalCapCars = useMemo(() => {
    return carparks.reduce((sum, cp) => sum + cp.vehicleLots.C.total, 0);
  }, [carparks]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2.5 rounded-xl shadow-lg text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLocateNearby={handleLocateUser}
        onRefresh={syncLiveData}
        isRefreshing={isRefreshing}
        lastUpdated={lastUpdated}
        source={dataSource}
        isDark={isDark}
        setIsDark={setIsDark}
        savedCount={favorites.length}
      />

      {/* Main Content Body */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'map' && (
          <>
            {/* Filter Bar */}
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              totalCount={carparks.length}
              filteredCount={filteredCarparks.length}
              hasUserLocation={userLocation !== null}
            />

            {/* Live City Availability Summary Strip */}
            <div className="bg-emerald-500/10 dark:bg-emerald-950/20 border-b border-emerald-500/20 py-2 px-4">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5" />
                    <span>Singapore Network:</span>
                  </span>
                  <span>
                    <strong className="font-mono tabular-nums text-neutral-900 dark:text-white">
                      {totalAvailableCars.toLocaleString()}
                    </strong> available car lots across {carparks.length} prime locations
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-neutral-500 dark:text-neutral-400">
                  <span>HDB Multi-Storey EPS</span>
                  <span aria-hidden="true">·</span>
                  <span>URA Central</span>
                  <span aria-hidden="true">·</span>
                  <span>Orchard & Suburban Malls</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Auto-refreshes 60s</span>
                </div>
              </div>
            </div>

            {/* Mobile View Toggle */}
            <div className="lg:hidden flex items-center justify-center p-2 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-1 p-1 bg-white dark:bg-neutral-800 rounded-lg shadow-xs text-xs font-medium">
                <button
                  onClick={() => setMobileView('split')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    mobileView === 'split' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  Split View
                </button>
                <button
                  onClick={() => setMobileView('map')}
                  className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1 ${
                    mobileView === 'map' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>Map</span>
                </button>
                <button
                  onClick={() => setMobileView('list')}
                  className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1 ${
                    mobileView === 'list' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List ({filteredCarparks.length})</span>
                </button>
              </div>
            </div>

            {/* Split Viewport Layout (Desktop 1440px Balance) */}
            <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
              
              {/* Left Column: Carpark Cards List */}
              <div className={`w-full lg:w-[480px] xl:w-[520px] flex flex-col gap-3 shrink-0 ${
                mobileView === 'map' ? 'hidden lg:flex' : 'flex'
              }`}>
                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                  <span>
                    Showing <strong className="font-mono text-neutral-900 dark:text-white">{filteredCarparks.length}</strong> carparks
                  </span>
                  {selectedCarpark && (
                    <button
                      onClick={() => setSelectedCarpark(null)}
                      className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                    >
                      Clear map focus
                    </button>
                  )}
                </div>

                {filteredCarparks.length === 0 ? (
                  <div className="p-8 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center space-y-3">
                    <AlertCircle className="w-8 h-8 mx-auto text-neutral-400" />
                    <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                      No carparks match your filter
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
                      Try clearing search keywords, switching regions, or turning off clearance/EV constraints.
                    </p>
                    <button
                      onClick={() => setFilters({
                        searchQuery: '',
                        region: 'All',
                        type: 'All',
                        vehicleType: 'C',
                        availability: 'all',
                        evOnly: false,
                        sundayFreeOnly: false,
                        highClearanceOnly: false,
                        sortBy: 'recommended'
                      })}
                      className="px-4 py-2 text-xs font-medium text-white bg-neutral-900 dark:bg-neutral-800 rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                    {filteredCarparks.map(cp => (
                      <CarparkCard
                        key={cp.id}
                        carpark={cp}
                        vehicleType={filters.vehicleType}
                        isSelected={selectedCarpark?.id === cp.id}
                        isFavorite={favorites.includes(cp.id)}
                        onSelect={setSelectedCarpark}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Interactive Leaflet Map */}
              <div className={`flex-1 min-h-[460px] lg:min-h-[600px] h-[calc(100vh-280px)] sticky top-24 ${
                mobileView === 'list' ? 'hidden lg:block' : 'block'
              }`}>
                <CarparkMap
                  carparks={filteredCarparks}
                  selectedCarpark={selectedCarpark}
                  onSelectCarpark={setSelectedCarpark}
                  vehicleType={filters.vehicleType}
                  userLocation={userLocation}
                  onLocateUser={handleLocateUser}
                />
              </div>

            </div>
          </>
        )}

        {/* Tab 2: Rates & Fee Calculator */}
        {activeTab === 'rates' && <RatesCalculatorModal />}

        {/* Tab 3: EV Charging Stations */}
        {activeTab === 'ev' && (
          <EVStationsView
            carparks={carparks}
            onSelectCarpark={setSelectedCarpark}
          />
        )}

        {/* Tab 4: Saved / Favorites */}
        {activeTab === 'saved' && (
          <FavoritesView
            favoriteCarparks={favoriteCarparksList}
            onSelectCarpark={setSelectedCarpark}
            onRemoveFavorite={handleRemoveFavorite}
            onExploreMap={() => setActiveTab('map')}
            vehicleType={filters.vehicleType}
          />
        )}
      </main>

      {/* Selected Carpark Detail Drawer / Modal */}
      <CarparkDetailModal
        carpark={selectedCarpark}
        onClose={() => setSelectedCarpark(null)}
        isFavorite={selectedCarpark ? favorites.includes(selectedCarpark.id) : false}
        onToggleFavorite={handleToggleFavorite}
        vehicleType={filters.vehicleType}
      />

      {/* Editorial Footer */}
      <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 py-6 transition-colors mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <div>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">SG ParkPulse</span>
            <span aria-hidden="true" className="mx-2">·</span>
            <span>Real-time carpark availability for Singapore motorists</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Data source: LTA DataMall & Data.gov.sg</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Back to Top
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
