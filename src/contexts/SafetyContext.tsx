import React, { createContext, useContext, useState } from 'react';

interface Location {
  lat: number;
  lng: number;
  accuracy: number;
}

interface SafetyContextType {
  safetyScore: number;
  currentLocation: Location;
  updateLocation: (location: Location) => void;
  updateSafetyScore: (score: number) => void;
}

const SafetyContext = createContext<SafetyContextType | undefined>(undefined);

export const SafetyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [safetyScore, setSafetyScore] = useState(85);
  const [currentLocation, setCurrentLocation] = useState<Location>({
    lat: 26.2006,
    lng: 92.9376,
    accuracy: 12
  });

  const updateLocation = (location: Location) => {
    setCurrentLocation(location);
    
    // Simulate safety score changes based on location
    const riskFactors = Math.random();
    if (riskFactors > 0.8) {
      setSafetyScore(Math.max(30, safetyScore - Math.floor(Math.random() * 20)));
    } else if (riskFactors > 0.6) {
      setSafetyScore(Math.min(100, safetyScore + Math.floor(Math.random() * 10)));
    }
  };

  const updateSafetyScore = (score: number) => {
    setSafetyScore(score);
  };

  return (
    <SafetyContext.Provider value={{
      safetyScore,
      currentLocation,
      updateLocation,
      updateSafetyScore
    }}>
      {children}
    </SafetyContext.Provider>
  );
};

export const useSafety = () => {
  const context = useContext(SafetyContext);
  if (context === undefined) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};