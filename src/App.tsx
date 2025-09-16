import React, { useState } from 'react';
import { Shield, Users, MapPin, AlertTriangle, Globe, Settings } from 'lucide-react';
import TouristApp from './components/TouristApp';
import AdminDashboard from './components/AdminDashboard';
import DigitalIDGenerator from './components/DigitalIDGenerator';
import { LanguageProvider } from './contexts/LanguageContext';
import { SafetyProvider } from './contexts/SafetyContext';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'tourist' | 'admin' | 'id-generator'>('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'tourist':
        return <TouristApp onBack={() => setCurrentView('home')} />;
      case 'admin':
        return <AdminDashboard onBack={() => setCurrentView('home')} />;
      case 'id-generator':
        return <DigitalIDGenerator onBack={() => setCurrentView('home')} />;
      default:
        return <HomePage setCurrentView={setCurrentView} />;
    }
  };

  return (
    <LanguageProvider>
      <SafetyProvider>
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
          {renderCurrentView()}
        </div>
      </SafetyProvider>
    </LanguageProvider>
  );
}

const HomePage: React.FC<{ setCurrentView: (view: string) => void }> = ({ setCurrentView }) => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-teal-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Smart Tourist Safety System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Globe className="h-5 w-5 text-teal-600" />
              <span className="text-sm text-gray-600">Multi-Language Support</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Ensuring Tourist Safety with
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"> AI & Blockchain</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            A comprehensive digital ecosystem for real-time tourist monitoring, incident response, 
            and secure identity management across high-risk and remote areas.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div 
              onClick={() => setCurrentView('tourist')}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
            >
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tourist Mobile App</h3>
              <p className="text-gray-600 mb-6">
                Real-time safety monitoring, geo-fencing alerts, panic button, and personalized safety scoring.
              </p>
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-2 rounded-full font-semibold">
                Launch App →
              </div>
            </div>

            <div 
              onClick={() => setCurrentView('admin')}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Authority Dashboard</h3>
              <p className="text-gray-600 mb-6">
                Real-time monitoring, heat maps, incident management, and automated alert systems for authorities.
              </p>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold">
                Access Dashboard →
              </div>
            </div>

            <div 
              onClick={() => setCurrentView('id-generator')}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Digital ID Generator</h3>
              <p className="text-gray-600 mb-6">
                Blockchain-based secure digital identity generation for tourists at entry points.
              </p>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold">
                Generate ID →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Comprehensive Safety Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">AI Anomaly Detection</h4>
              <p className="text-sm text-gray-600">Detect unusual patterns and behaviors automatically</p>
            </div>
            <div className="text-center p-6">
              <MapPin className="h-12 w-12 text-teal-500 mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">Geo-Fencing</h4>
              <p className="text-sm text-gray-600">Alerts when entering high-risk or restricted zones</p>
            </div>
            <div className="text-center p-6">
              <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">Blockchain Security</h4>
              <p className="text-sm text-gray-600">Tamper-proof identity and travel records</p>
            </div>
            <div className="text-center p-6">
              <Globe className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">Multi-Language</h4>
              <p className="text-sm text-gray-600">Support for 10+ Indian languages and English</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Shield className="h-8 w-8 text-teal-400" />
            <h3 className="text-2xl font-bold">Smart Tourist Safety System</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Powered by AI, Blockchain, and IoT technologies for comprehensive tourist safety.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <span>Privacy Protected</span>
            <span>End-to-End Encrypted</span>
            <span>Real-Time Monitoring</span>
            <span>24/7 Emergency Response</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;