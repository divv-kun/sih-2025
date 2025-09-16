import React, { useState } from 'react';
import { MapPin, AlertTriangle, Shield, Navigation, Zap, Eye } from 'lucide-react';

const SafetyMap: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const zones = [
    {
      id: 'safe-1',
      name: 'Kaziranga Visitor Center',
      type: 'safe',
      tourists: 45,
      description: 'Main visitor area with full security coverage'
    },
    {
      id: 'warning-1',
      name: 'Buffer Zone Area',
      type: 'warning',
      tourists: 12,
      description: 'Limited cell coverage, stay on marked trails'
    },
    {
      id: 'danger-1',
      name: 'Remote Forest Area',
      type: 'danger',
      tourists: 3,
      description: 'High-risk zone, emergency escort recommended'
    }
  ];

  const nearbyServices = [
    { name: 'Police Station', distance: '2.3 km', type: 'police', phone: '100' },
    { name: 'Medical Center', distance: '1.8 km', type: 'medical', phone: '108' },
    { name: 'Tourism Office', distance: '0.5 km', type: 'tourism', phone: '1363' },
    { name: 'Forest Ranger Post', distance: '3.2 km', type: 'ranger', phone: '9436123456' }
  ];

  return (
    <div className="space-y-6">
      {/* Map Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Safety Zone Map</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Real-time Updates</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm font-medium text-green-700">Safe Zones</span>
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="text-sm font-medium text-yellow-700">Caution Areas</span>
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-sm font-medium text-red-700">High-Risk Zones</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Area */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-br from-green-100 via-blue-50 to-teal-100 h-96 relative">
          {/* Map zones */}
          {zones.map((zone, index) => (
            <div
              key={zone.id}
              className={`absolute w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 ${
                zone.type === 'safe' ? 'bg-green-500/80 hover:bg-green-500' :
                zone.type === 'warning' ? 'bg-yellow-500/80 hover:bg-yellow-500' :
                'bg-red-500/80 hover:bg-red-500'
              }`}
              style={{
                left: `${20 + index * 25}%`,
                top: `${30 + index * 15}%`
              }}
              onClick={() => setSelectedZone(zone.id)}
            >
              {zone.type === 'safe' ? (
                <Shield className="h-8 w-8 text-white" />
              ) : zone.type === 'warning' ? (
                <Eye className="h-8 w-8 text-white" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-white" />
              )}
            </div>
          ))}

          {/* Current Location */}
          <div className="absolute w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center animate-pulse"
               style={{ left: '45%', top: '40%' }}>
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>

          {/* Zone Info Popup */}
          {selectedZone && (
            <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              {zones.find(z => z.id === selectedZone) && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {zones.find(z => z.id === selectedZone)?.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {zones.find(z => z.id === selectedZone)?.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {zones.find(z => z.id === selectedZone)?.tourists} tourists nearby
                    </span>
                    <button 
                      onClick={() => setSelectedZone(null)}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <h3 className="text-lg font-bold text-gray-900">Current Zone: Safe Area</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Safety Level</p>
            <p className="font-semibold text-green-600">High (85/100)</p>
          </div>
          <div>
            <p className="text-gray-600">Cell Coverage</p>
            <p className="font-semibold text-green-600">Excellent</p>
          </div>
        </div>
      </div>

      {/* Nearby Services */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Navigation className="h-5 w-5 text-purple-500 mr-2" />
          Emergency Services Nearby
        </h3>
        <div className="space-y-3">
          {nearbyServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  service.type === 'police' ? 'bg-blue-500' :
                  service.type === 'medical' ? 'bg-red-500' :
                  service.type === 'tourism' ? 'bg-green-500' :
                  'bg-orange-500'
                }`} />
                <div>
                  <p className="font-semibold text-gray-900">{service.name}</p>
                  <p className="text-sm text-gray-600">{service.distance}</p>
                </div>
              </div>
              <a 
                href={`tel:${service.phone}`}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
              >
                Call
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-teal-100 text-center hover:scale-105 transition-transform duration-200">
          <Zap className="h-8 w-8 text-teal-500 mx-auto mb-2" />
          <p className="font-semibold text-gray-900">Share Location</p>
          <p className="text-sm text-gray-600">With emergency contacts</p>
        </button>
        
        <button className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 text-center hover:scale-105 transition-transform duration-200">
          <Navigation className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <p className="font-semibold text-gray-900">Get Directions</p>
          <p className="text-sm text-gray-600">To nearest safe zone</p>
        </button>
      </div>
    </div>
  );
};

export default SafetyMap;