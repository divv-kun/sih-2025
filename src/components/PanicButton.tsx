import React, { useState } from 'react';
import { AlertTriangle, Phone, MapPin, Clock, Check } from 'lucide-react';

const PanicButton: React.FC = () => {
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [emergencyActive, setEmergencyActive] = useState(false);

  const handlePanicPress = () => {
    setIsPanicMode(true);
    let count = 5;
    
    const timer = setInterval(() => {
      count--;
      setCountdown(count);
      
      if (count === 0) {
        clearInterval(timer);
        activateEmergency();
      }
    }, 1000);

    // Allow user to cancel within 5 seconds
    setTimeout(() => {
      if (isPanicMode && !emergencyActive) {
        setIsPanicMode(false);
        setCountdown(5);
      }
    }, 5000);
  };

  const activateEmergency = () => {
    setEmergencyActive(true);
    setIsPanicMode(false);
    
    // Simulate emergency activation
    setTimeout(() => {
      setEmergencyActive(false);
      setCountdown(5);
    }, 10000);
  };

  const cancelPanic = () => {
    setIsPanicMode(false);
    setCountdown(5);
  };

  if (emergencyActive) {
    return (
      <div className="fixed inset-0 bg-red-600/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <AlertTriangle className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-red-600 mb-4">EMERGENCY ACTIVATED</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
              <span className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-green-800">Location shared with authorities</span>
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
              <span className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-green-800">Emergency contacts notified</span>
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
              <span className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-green-800">Nearest police unit alerted</span>
              </span>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mb-6">
            <div className="flex items-center space-x-2 text-blue-800">
              <MapPin className="h-5 w-5" />
              <span className="font-semibold">Current Location:</span>
            </div>
            <p className="text-blue-700 text-sm mt-1">Kaziranga National Park, Gate 2</p>
            <p className="text-blue-600 text-xs">Lat: 26.2006, Lng: 92.9376</p>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            Help is on the way. Stay calm and remain in a safe location if possible.
          </p>

          <button
            onClick={() => setEmergencyActive(false)}
            className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
          >
            I'm Safe - Cancel Emergency
          </button>
        </div>
      </div>
    );
  }

  if (isPanicMode) {
    return (
      <div className="fixed inset-0 bg-red-600/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-24 h-24 border-4 border-red-300 border-t-red-600 rounded-full animate-spin mx-auto mb-6"></div>
          
          <h2 className="text-3xl font-bold text-red-600 mb-2">EMERGENCY ALERT</h2>
          <p className="text-gray-600 mb-6">Activating in {countdown} seconds...</p>
          
          <div className="bg-red-50 p-4 rounded-xl border border-red-200 mb-6">
            <p className="text-red-800 text-sm">
              Emergency services will be contacted and your location will be shared with authorities.
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={cancelPanic}
              className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              CANCEL
            </button>
            <button
              onClick={activateEmergency}
              className="flex-1 bg-red-600 text-white py-4 rounded-xl font-semibold hover:bg-red-700 transition-colors"
            >
              ACTIVATE NOW
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handlePanicPress}
      className="flex flex-col items-center py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
    >
      <div className="relative">
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
          <AlertTriangle className="h-5 w-5 text-white" />
        </div>
        <div className="absolute inset-0 border-2 border-red-500 rounded-full animate-ping"></div>
      </div>
      <span className="text-xs mt-1 font-semibold">PANIC</span>
    </button>
  );
};

export default PanicButton;