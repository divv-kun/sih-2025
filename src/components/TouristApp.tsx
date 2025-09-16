import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Shield, MapPin, AlertTriangle, Phone, Heart, 
  Settings, Globe, Camera, Navigation, Battery, Wifi, SignalHigh
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSafety } from '../contexts/SafetyContext';
import PanicButton from './PanicButton';
import SafetyMap from './SafetyMap';

interface TouristAppProps {
  onBack: () => void;
}

const TouristApp: React.FC<TouristAppProps> = ({ onBack }) => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const { safetyScore, currentLocation, updateLocation } = useSafety();
  const [currentView, setCurrentView] = useState<'home' | 'map' | 'profile' | 'settings'>('home');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', message: 'Approaching high-risk zone - Kaziranga Buffer Area', time: '2 min ago' },
    { id: 2, type: 'info', message: 'Your safety score increased to 85/100', time: '1 hour ago' }
  ]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'as', name: 'অসমীয়া', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' }
  ];

  // Simulate real-time location updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateLocation({
        lat: 26.2006 + (Math.random() - 0.5) * 0.01,
        lng: 92.9376 + (Math.random() - 0.5) * 0.01,
        accuracy: Math.floor(Math.random() * 20) + 5
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [updateLocation]);

  const renderHomeView = () => (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-teal-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{t('welcome_tourist')}</h2>
          <div className="flex items-center space-x-2">
            <SignalHigh className="h-5 w-5 text-green-500" />
            <Wifi className="h-5 w-5 text-green-500" />
            <Battery className="h-5 w-5 text-green-500" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className={`text-3xl font-bold ${
              safetyScore >= 80 ? 'text-green-500' : 
              safetyScore >= 60 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {safetyScore}/100
            </div>
            <p className="text-sm text-gray-600">{t('safety_score')}</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500">
              {currentLocation.accuracy}m
            </div>
            <p className="text-sm text-gray-600">{t('location_accuracy')}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="h-5 w-5" />
            <span className="font-semibold">{t('current_location')}</span>
          </div>
          <p className="text-sm opacity-90">Kaziranga National Park Vicinity</p>
          <p className="text-xs opacity-75">Lat: {currentLocation.lat.toFixed(4)}, Lng: {currentLocation.lng.toFixed(4)}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setCurrentView('map')}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 hover:scale-105 transition-transform duration-200"
        >
          <Navigation className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <p className="font-semibold text-gray-900">{t('safety_map')}</p>
        </button>
        
        <button className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 hover:scale-105 transition-transform duration-200">
          <Camera className="h-8 w-8 text-purple-500 mx-auto mb-2" />
          <p className="font-semibold text-gray-900">{t('report_incident')}</p>
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
          {t('recent_alerts')}
        </h3>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className={`w-3 h-3 rounded-full mt-2 ${
                notification.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-red-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Phone className="h-5 w-5 text-red-500 mr-2" />
          {t('emergency_contacts')}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-red-500 text-white p-3 rounded-xl font-semibold hover:bg-red-600 transition-colors">
            Police: 100
          </button>
          <button className="bg-orange-500 text-white p-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors">
            Tourism: 1363
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettingsView = () => (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('settings')}</h2>
        
        {/* Language Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('language')}</h3>
          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  currentLanguage === lang.code 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 bg-white hover:border-teal-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('privacy_settings')}</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span>{t('location_sharing')}</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span>{t('family_tracking')}</span>
              <input type="checkbox" className="toggle" />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span>{t('emergency_auto_call')}</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center space-x-2 text-teal-600">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">{t('back')}</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-teal-600" />
              <h1 className="text-xl font-bold text-gray-900">{t('tourist_app')}</h1>
            </div>

            <button 
              onClick={() => setCurrentView('settings')}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6 pb-24">
        {currentView === 'home' && renderHomeView()}
        {currentView === 'map' && <SafetyMap />}
        {currentView === 'settings' && renderSettingsView()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200">
        <div className="grid grid-cols-4 py-2">
          <button
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center py-3 ${
              currentView === 'home' ? 'text-teal-600' : 'text-gray-400'
            }`}
          >
            <Shield className="h-5 w-5" />
            <span className="text-xs mt-1">{t('home')}</span>
          </button>
          
          <button
            onClick={() => setCurrentView('map')}
            className={`flex flex-col items-center py-3 ${
              currentView === 'map' ? 'text-teal-600' : 'text-gray-400'
            }`}
          >
            <MapPin className="h-5 w-5" />
            <span className="text-xs mt-1">{t('map')}</span>
          </button>

          <PanicButton />

          <button
            onClick={() => setCurrentView('settings')}
            className={`flex flex-col items-center py-3 ${
              currentView === 'settings' ? 'text-teal-600' : 'text-gray-400'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1">{t('settings')}</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default TouristApp;