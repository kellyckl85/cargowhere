import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Carpark, VehicleType } from '../types/carpark';
import { Locate, Layers, Navigation } from 'lucide-react';

interface CarparkMapProps {
  carparks: Carpark[];
  selectedCarpark: Carpark | null;
  onSelectCarpark: (carpark: Carpark) => void;
  vehicleType: VehicleType;
  userLocation: { lat: number; lng: number } | null;
  onLocateUser: () => void;
}

const SG_CENTER: [number, number] = [1.3521, 103.8198];

const QUICK_JUMPS = [
  { name: 'Orchard', lat: 1.3040, lng: 103.8318, zoom: 15 },
  { name: 'Marina Bay / CBD', lat: 1.2834, lng: 103.8560, zoom: 15 },
  { name: 'Jurong East', lat: 1.3332, lng: 103.7434, zoom: 15 },
  { name: 'Tampines', lat: 1.3533, lng: 103.9452, zoom: 15 },
  { name: 'Changi Airport', lat: 1.3602, lng: 103.9897, zoom: 14 },
  { name: 'Woodlands', lat: 1.4360, lng: 103.7865, zoom: 15 },
  { name: 'Punggol', lat: 1.4067, lng: 103.9022, zoom: 15 }
];

export const CarparkMap: React.FC<CarparkMapProps> = ({
  carparks,
  selectedCarpark,
  onSelectCarpark,
  vehicleType,
  userLocation,
  onLocateUser
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: SG_CENTER,
      zoom: 12,
      minZoom: 11,
      maxZoom: 18,
      zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // OpenStreetMap standard tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | LTA DataMall',
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;

    // Trigger map invalidation on window resize
    const handleResize = () => map.invalidateSize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update User Location Pin
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (userLocation) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
      } else {
        const userIcon = L.divIcon({
          className: 'user-loc-pin',
          html: `<div style="width: 16px; height: 16px; background: #0284c7; border: 3px solid #ffffff; border-radius: 50%; box-shadow: 0 0 0 6px rgba(2, 132, 199, 0.35);"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
          .addTo(map)
          .bindPopup('<b>Your Current Location</b>');
      }
    }
  }, [userLocation]);

  // Update Carpark Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    carparks.forEach(cp => {
      const lotInfo = vehicleType === 'C'
        ? cp.vehicleLots.C
        : vehicleType === 'Y'
        ? cp.vehicleLots.Y || { available: 0, total: 0 }
        : cp.vehicleLots.H || { available: 0, total: 0 };

      const available = lotInfo.available;
      const isFull = available <= 3;
      const isLow = available > 3 && available < 25;

      const bgColor = isFull ? '#ef4444' : isLow ? '#f59e0b' : '#10b981';
      const textColor = '#ffffff';

      const isSelected = selectedCarpark?.id === cp.id;
      const ringStyle = isSelected
        ? 'border: 3px solid #000000; box-shadow: 0 0 0 4px rgba(0,0,0,0.3); transform: scale(1.2);'
        : 'border: 2px solid #ffffff;';

      const icon = L.divIcon({
        className: 'custom-carpark-pin',
        html: `
          <div style="background-color: ${bgColor}; color: ${textColor}; ${ringStyle} min-width: 32px; height: 26px; border-radius: 13px; display: flex; align-items: center; justify-content: center; padding: 0 6px; font-weight: 700; font-size: 11px; box-shadow: 0 3px 8px rgba(0,0,0,0.3);">
            ${available}
          </div>
        `,
        iconSize: [34, 26],
        iconAnchor: [17, 13]
      });

      const marker = L.marker([cp.lat, cp.lng], { icon })
        .addTo(map)
        .on('click', () => {
          onSelectCarpark(cp);
        });

      // Bind detailed tooltip
      marker.bindTooltip(`
        <div style="font-family: inherit; font-size: 12px; line-height: 1.3;">
          <strong style="display:block; margin-bottom: 2px;">${cp.name}</strong>
          <span style="color: ${bgColor}; font-weight: 700;">${available} lots free</span> (${cp.type})<br/>
          <span>Rate: $${cp.rates.perHourEstimate.toFixed(2)}/hr</span>
        </div>
      `, { offset: [0, -10] });

      markersRef.current.push(marker);
    });
  }, [carparks, selectedCarpark, vehicleType, onSelectCarpark]);

  // Center on selected carpark
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedCarpark) return;

    map.flyTo([selectedCarpark.lat, selectedCarpark.lng], 16, {
      duration: 1.0,
      easeLinearity: 0.25
    });
  }, [selectedCarpark]);

  const jumpTo = (lat: number, lng: number, zoom: number) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], zoom, { duration: 1.2 });
    }
  };

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xs">
      
      {/* Map Viewport Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Quick Region Jumps Bar (Floating Top) */}
      <div className="absolute top-3 left-3 right-14 z-20 flex items-center gap-1.5 overflow-x-auto p-1.5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm scrollbar-none">
        <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider pl-1.5 shrink-0">
          Jump to:
        </span>
        {QUICK_JUMPS.map(q => (
          <button
            key={q.name}
            onClick={() => jumpTo(q.lat, q.lng, q.zoom)}
            className="px-2.5 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            {q.name}
          </button>
        ))}
      </div>

      {/* Locate Me Floating Button */}
      <div className="absolute bottom-6 left-3 z-20 flex flex-col gap-2">
        <button
          onClick={onLocateUser}
          title="Zoom to my location"
          className="p-2.5 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-md transition-transform active:scale-90 flex items-center gap-1.5 text-xs font-medium"
        >
          <Locate className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="hidden sm:inline">My Location</span>
        </button>
      </div>

      {/* Map Legend Overlay (Floating Bottom Left) */}
      <div className="absolute bottom-6 left-36 z-20 hidden md:flex items-center gap-3 px-3 py-1.5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-neutral-600 dark:text-neutral-400">&gt;25 Lots</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-neutral-600 dark:text-neutral-400">4-24 Lots</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span className="text-neutral-600 dark:text-neutral-400">&le;3 Lots</span>
        </div>
      </div>

    </div>
  );
};
