import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    welcome_tourist: 'Welcome, Tourist',
    safety_score: 'Safety Score',
    location_accuracy: 'Location Accuracy',
    current_location: 'Current Location',
    safety_map: 'Safety Map',
    report_incident: 'Report Incident',
    recent_alerts: 'Recent Alerts',
    emergency_contacts: 'Emergency Contacts',
    settings: 'Settings',
    language: 'Language',
    privacy_settings: 'Privacy Settings',
    location_sharing: 'Location Sharing',
    family_tracking: 'Family Tracking',
    emergency_auto_call: 'Emergency Auto-Call',
    back: 'Back',
    tourist_app: 'Tourist Safety App',
    home: 'Home',
    map: 'Map'
  },
  hi: {
    welcome_tourist: 'स्वागत है, पर्यटक',
    safety_score: 'सुरक्षा स्कोर',
    location_accuracy: 'स्थान की सटीकता',
    current_location: 'वर्तमान स्थान',
    safety_map: 'सुरक्षा मानचित्र',
    report_incident: 'घटना की रिपोर्ट करें',
    recent_alerts: 'हाल की अलर्ट',
    emergency_contacts: 'आपातकालीन संपर्क',
    settings: 'सेटिंग्स',
    language: 'भाषा',
    privacy_settings: 'गोपनीयता सेटिंग्स',
    location_sharing: 'स्थान साझाकरण',
    family_tracking: 'पारिवारिक ट्रैकिंग',
    emergency_auto_call: 'आपातकालीन ऑटो-कॉल',
    back: 'वापस',
    tourist_app: 'पर्यटक सुरक्षा ऐप',
    home: 'होम',
    map: 'मानचित्र'
  },
  as: {
    welcome_tourist: 'স্বাগতম, পৰ্যটক',
    safety_score: 'সুৰক্ষা স্ক\'ৰ',
    location_accuracy: 'অৱস্থানৰ শুদ্ধতা',
    current_location: 'বৰ্তমান অৱস্থান',
    safety_map: 'সুৰক্ষা মানচিত্ৰ',
    report_incident: 'ঘটনা প্ৰতিবেদন কৰক',
    recent_alerts: 'শেহতীয়া সতৰ্কবাণী',
    emergency_contacts: 'জৰুৰীকালীন যোগাযোগ',
    settings: 'ছেটিংছ',
    language: 'ভাষা',
    privacy_settings: 'গোপনীয়তাৰ ছেটিংছ',
    location_sharing: 'অৱস্থান ভাগ-বতৰা',
    family_tracking: 'পৰিয়ালৰ ট্ৰেকিং',
    emergency_auto_call: 'জৰুৰীকালীন স্বয়ংক্ৰিয় কল',
    back: 'উভতি যাওক',
    tourist_app: 'পৰ্যটক সুৰক্ষা এপ',
    home: 'ঘৰ',
    map: 'মানচিত্ৰ'
  },
  bn: {
    welcome_tourist: 'স্বাগতম, পর্যটক',
    safety_score: 'নিরাপত্তা স্কোর',
    location_accuracy: 'অবস্থানের নির্ভুলতা',
    current_location: 'বর্তমান অবস্থান',
    safety_map: 'নিরাপত্তা মানচিত্র',
    report_incident: 'ঘটনা রিপোর্ট করুন',
    recent_alerts: 'সাম্প্রতিক সতর্কতা',
    emergency_contacts: 'জরুরি যোগাযোগ',
    settings: 'সেটিংস',
    language: 'ভাষা',
    privacy_settings: 'গোপনীয়তা সেটিংস',
    location_sharing: 'অবস্থান ভাগাভাগি',
    family_tracking: 'পারিবারিক ট্র্যাকিং',
    emergency_auto_call: 'জরুরি অটো-কল',
    back: 'ফিরে যান',
    tourist_app: 'পর্যটক নিরাপত্তা অ্যাপ',
    home: 'হোম',
    map: 'মানচিত্র'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    const translation = translations[currentLanguage as keyof typeof translations];
    return translation?.[key as keyof typeof translation] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};