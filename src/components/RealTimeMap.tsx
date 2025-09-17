import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapPin, AlertTriangle, Shield, Navigation, Users, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Set Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

interface RealTimeMapProps {
  userType: 'tourist' | 'authority';
  userId: string;
}

interface MapMarker {
  id: string;
  type: 'tourist' | 'authority' | 'incident' | 'safe_zone' | 'danger_zone';
  coordinates: [number, number];
  data: any;
}

const RealTimeMap: React.FC<RealTimeMapProps> = ({ userType, userId }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Default to Kaziranga National Park area
    const defaultCenter: [number, number] = [92.9376, 26.2006];

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: defaultCenter,
      zoom: 12,
      pitch: 45,
      bearing: 0
    });

    map.current.on('load', () => {
      setMapLoaded(true);
      initializeMapLayers();
      
      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords: [number, number] = [
              position.coords.longitude,
              position.coords.latitude
            ];
            setUserLocation(coords);
            map.current?.flyTo({ center: coords, zoom: 14 });
          },
          (error) => {
            console.warn('Geolocation error:', error);
            // Use default location
            setUserLocation(defaultCenter);
          }
        );
      } else {
        setUserLocation(defaultCenter);
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Initialize map layers and sources
  const initializeMapLayers = () => {
    if (!map.current) return;

    // Add safety zones layer
    map.current.addSource('safety-zones', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: { type: 'safe', name: 'Kaziranga Visitor Center' },
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [92.9300, 26.2050],
                [92.9400, 26.2050],
                [92.9400, 26.1950],
                [92.9300, 26.1950],
                [92.9300, 26.2050]
              ]]
            }
          },
          {
            type: 'Feature',
            properties: { type: 'warning', name: 'Buffer Zone' },
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [92.9200, 26.2100],
                [92.9500, 26.2100],
                [92.9500, 26.1900],
                [92.9200, 26.1900],
                [92.9200, 26.2100]
              ]]
            }
          },
          {
            type: 'Feature',
            properties: { type: 'danger', name: 'Remote Forest Area' },
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [92.9100, 26.2200],
                [92.9600, 26.2200],
                [92.9600, 26.1800],
                [92.9100, 26.1800],
                [92.9100, 26.2200]
              ]]
            }
          }
        ]
      }
    });

    // Add safety zones fill layer
    map.current.addLayer({
      id: 'safety-zones-fill',
      type: 'fill',
      source: 'safety-zones',
      paint: {
        'fill-color': [
          'match',
          ['get', 'type'],
          'safe', '#10b981',
          'warning', '#f59e0b',
          'danger', '#ef4444',
          '#6b7280'
        ],
        'fill-opacity': 0.2
      }
    });

    // Add safety zones outline layer
    map.current.addLayer({
      id: 'safety-zones-outline',
      type: 'line',
      source: 'safety-zones',
      paint: {
        'line-color': [
          'match',
          ['get', 'type'],
          'safe', '#10b981',
          'warning', '#f59e0b',
          'danger', '#ef4444',
          '#6b7280'
        ],
        'line-width': 2,
        'line-opacity': 0.8
      }
    });

    // Add click handler for zones
    map.current.on('click', 'safety-zones-fill', (e) => {
      if (e.features && e.features[0]) {
        const feature = e.features[0];
        const popup = new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`
            <div class="p-2">
              <h3 class="font-bold">${feature.properties?.name}</h3>
              <p class="text-sm text-gray-600">Zone Type: ${feature.properties?.type}</p>
            </div>
          `)
          .addTo(map.current!);
      }
    });
  };

  // Load real-time data
  useEffect(() => {
    if (!mapLoaded) return;

    const loadRealTimeData = async () => {
      try {
        if (userType === 'authority') {
          // Load all tourists for authorities
          const { data: tourists } = await supabase
            .from('tourist_profiles')
            .select('*')
            .not('current_location', 'is', null);

          if (tourists) {
            const touristMarkers: MapMarker[] = tourists.map(tourist => ({
              id: tourist.id,
              type: 'tourist',
              coordinates: [
                tourist.current_location.lng,
                tourist.current_location.lat
              ],
              data: tourist
            }));

            setMarkers(prev => [
              ...prev.filter(m => m.type !== 'tourist'),
              ...touristMarkers
            ]);

            // Add markers to map
            touristMarkers.forEach(marker => {
              addMarkerToMap(marker);
            });
          }

          // Load incidents
          const { data: incidents } = await supabase
            .from('incidents')
            .select('*')
            .eq('status', 'open');

          if (incidents) {
            const incidentMarkers: MapMarker[] = incidents.map(incident => ({
              id: incident.id,
              type: 'incident',
              coordinates: [incident.location.lng, incident.location.lat],
              data: incident
            }));

            setMarkers(prev => [
              ...prev.filter(m => m.type !== 'incident'),
              ...incidentMarkers
            ]);

            incidentMarkers.forEach(marker => {
              addMarkerToMap(marker);
            });
          }
        }
      } catch (error) {
        console.error('Error loading real-time data:', error);
      }
    };

    loadRealTimeData();

    // Set up real-time subscriptions
    const touristSubscription = supabase
      .channel('tourist_locations')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'location_updates' },
        (payload) => {
          console.log('Location update:', payload);
          // Handle real-time location updates
        }
      )
      .subscribe();

    const incidentSubscription = supabase
      .channel('incidents')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'incidents' },
        (payload) => {
          console.log('Incident update:', payload);
          // Handle real-time incident updates
        }
      )
      .subscribe();

    return () => {
      touristSubscription.unsubscribe();
      incidentSubscription.unsubscribe();
    };
  }, [mapLoaded, userType]);

  // Add marker to map
  const addMarkerToMap = (marker: MapMarker) => {
    if (!map.current) return;

    const el = document.createElement('div');
    el.className = 'marker';
    el.style.width = '30px';
    el.style.height = '30px';
    el.style.borderRadius = '50%';
    el.style.cursor = 'pointer';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';

    // Style based on marker type
    switch (marker.type) {
      case 'tourist':
        el.style.backgroundColor = marker.data.status === 'safe' ? '#10b981' : 
                                  marker.data.status === 'warning' ? '#f59e0b' : '#ef4444';
        el.innerHTML = '👤';
        break;
      case 'incident':
        el.style.backgroundColor = '#ef4444';
        el.innerHTML = '⚠️';
        break;
      case 'authority':
        el.style.backgroundColor = '#3b82f6';
        el.innerHTML = '🚔';
        break;
    }

    const mapboxMarker = new mapboxgl.Marker(el)
      .setLngLat(marker.coordinates)
      .addTo(map.current);

    // Add click handler
    el.addEventListener('click', () => {
      setSelectedMarker(marker);
      showMarkerPopup(marker);
    });
  };

  // Show marker popup
  const showMarkerPopup = (marker: MapMarker) => {
    if (!map.current) return;

    let popupContent = '';
    
    switch (marker.type) {
      case 'tourist':
        popupContent = `
          <div class="p-3">
            <h3 class="font-bold text-lg">${marker.data.name}</h3>
            <p class="text-sm text-gray-600">Digital ID: ${marker.data.digital_id}</p>
            <p class="text-sm">Safety Score: <span class="font-semibold ${
              marker.data.safety_score >= 80 ? 'text-green-600' : 
              marker.data.safety_score >= 60 ? 'text-yellow-600' : 'text-red-600'
            }">${marker.data.safety_score}/100</span></p>
            <p class="text-sm">Status: <span class="font-semibold capitalize ${
              marker.data.status === 'safe' ? 'text-green-600' : 
              marker.data.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
            }">${marker.data.status}</span></p>
          </div>
        `;
        break;
      case 'incident':
        popupContent = `
          <div class="p-3">
            <h3 class="font-bold text-lg text-red-600">Incident Alert</h3>
            <p class="text-sm">Type: ${marker.data.type}</p>
            <p class="text-sm">Priority: ${marker.data.priority}</p>
            <p class="text-sm">Status: ${marker.data.status}</p>
            <p class="text-xs text-gray-500 mt-2">${new Date(marker.data.created_at).toLocaleString()}</p>
          </div>
        `;
        break;
    }

    new mapboxgl.Popup()
      .setLngLat(marker.coordinates)
      .setHTML(popupContent)
      .addTo(map.current);
  };

  // Update user location
  const updateUserLocation = async () => {
    if (!navigator.geolocation || !userLocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newCoords: [number, number] = [
          position.coords.longitude,
          position.coords.latitude
        ];
        
        setUserLocation(newCoords);
        
        if (userType === 'tourist') {
          // Update location in database
          try {
            await supabase
              .from('location_updates')
              .insert({
                tourist_id: userId,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy || 0,
                timestamp: new Date().toISOString(),
                zone_type: 'safe', // This would be calculated based on current zones
                safety_score: 85 // This would be calculated based on various factors
              });

            // Update tourist profile
            await supabase
              .from('tourist_profiles')
              .update({
                current_location: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  accuracy: position.coords.accuracy || 0,
                  timestamp: new Date().toISOString()
                }
              })
              .eq('user_id', userId);
          } catch (error) {
            console.error('Error updating location:', error);
          }
        }

        // Center map on new location
        map.current?.flyTo({ center: newCoords, zoom: 14 });
      },
      (error) => {
        console.error('Geolocation error:', error);
      }
    );
  };

  return (
    <div className="relative h-full">
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-96 rounded-2xl overflow-hidden shadow-lg" />

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <button
          onClick={updateUserLocation}
          className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:bg-white transition-colors"
          title="Update Location"
        >
          <Navigation className="h-5 w-5 text-teal-600" />
        </button>

        {userType === 'authority' && (
          <button
            className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:bg-white transition-colors"
            title="View All Tourists"
          >
            <Users className="h-5 w-5 text-blue-600" />
          </button>
        )}
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <h4 className="font-semibold text-gray-900 mb-2">Map Legend</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Safe Zones</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Caution Areas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>High-Risk Zones</span>
          </div>
          {userType === 'authority' && (
            <>
              <div className="flex items-center space-x-2">
                <span>👤</span>
                <span>Tourists</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⚠️</span>
                <span>Incidents</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Loading Overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gray-100 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeMap;