import React, { useState } from 'react';
import { ArrowLeft, Shield, QrCode, Download, Check, Upload, Camera } from 'lucide-react';

interface DigitalIDGeneratorProps {
  onBack: () => void;
}

interface TouristData {
  name: string;
  nationality: string;
  passportNumber: string;
  aadhaarNumber: string;
  dateOfBirth: string;
  emergencyContact: string;
  visitDuration: string;
  plannedLocations: string[];
  accommodationType: string;
}

const DigitalIDGenerator: React.FC<DigitalIDGeneratorProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [touristData, setTouristData] = useState<TouristData>({
    name: '',
    nationality: '',
    passportNumber: '',
    aadhaarNumber: '',
    dateOfBirth: '',
    emergencyContact: '',
    visitDuration: '',
    plannedLocations: [],
    accommodationType: ''
  });
  const [generatedID, setGeneratedID] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field: keyof TouristData, value: string | string[]) => {
    setTouristData(prev => ({ ...prev, [field]: value }));
  };

  const generateDigitalID = async () => {
    setIsProcessing(true);
    
    // Simulate blockchain-based ID generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const countryCode = touristData.nationality.slice(0, 3).toUpperCase();
    const year = new Date().getFullYear();
    const randomId = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
    const digitalID = `TST-${year}-${randomId}-${countryCode}`;
    setGeneratedID(digitalID);
    setIsProcessing(false);
    setStep(4);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            step >= stepNum 
              ? 'bg-teal-500 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {step > stepNum ? <Check className="h-5 w-5" /> : stepNum}
          </div>
          {stepNum < 4 && (
            <div className={`w-12 h-1 mx-2 ${
              step > stepNum ? 'bg-teal-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Personal Information</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            value={touristData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter your full name as per passport"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nationality *</label>
            <select
              value={touristData.nationality}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select nationality</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
              <option value="Australia">Australia</option>
              <option value="Canada">Canada</option>
              <option value="India">India</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
            <input
              type="date"
              value={touristData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Passport Number *</label>
            <input
              type="text"
              value={touristData.passportNumber}
              onChange={(e) => handleInputChange('passportNumber', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter passport number"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhaar Number (if applicable)</label>
            <input
              type="text"
              value={touristData.aadhaarNumber}
              onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter Aadhaar number"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact *</label>
          <input
            type="tel"
            value={touristData.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter emergency contact number"
          />
        </div>

        <button
          onClick={() => setStep(2)}
          disabled={!touristData.name || !touristData.nationality || !touristData.passportNumber || !touristData.emergencyContact}
          className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-teal-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Travel Details
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Travel Information</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Visit Duration *</label>
          <select
            value={touristData.visitDuration}
            onChange={(e) => handleInputChange('visitDuration', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">Select duration</option>
            <option value="1-3 days">1-3 days</option>
            <option value="4-7 days">4-7 days</option>
            <option value="1-2 weeks">1-2 weeks</option>
            <option value="2-4 weeks">2-4 weeks</option>
            <option value="1-3 months">1-3 months</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Accommodation Type *</label>
          <select
            value={touristData.accommodationType}
            onChange={(e) => handleInputChange('accommodationType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">Select accommodation</option>
            <option value="hotel">Hotel/Resort</option>
            <option value="guesthouse">Guesthouse</option>
            <option value="homestay">Homestay</option>
            <option value="camping">Camping</option>
            <option value="backpacker">Backpacker Hostel</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Planned Locations *</label>
          <div className="space-y-2">
            {[
              'Kaziranga National Park',
              'Majuli Island',
              'Cherrapunji',
              'Manas Wildlife Sanctuary',
              'Shillong',
              'Tawang Monastery',
              'Namdapha National Park',
              'Ziro Valley'
            ].map((location) => (
              <label key={location} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={touristData.plannedLocations.includes(location)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleInputChange('plannedLocations', [...touristData.plannedLocations, location]);
                    } else {
                      handleInputChange('plannedLocations', touristData.plannedLocations.filter(l => l !== location));
                    }
                  }}
                  className="form-checkbox h-5 w-5 text-teal-500 rounded focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-gray-900">{location}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setStep(1)}
            className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => setStep(3)}
            disabled={!touristData.visitDuration || !touristData.accommodationType || touristData.plannedLocations.length === 0}
            className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-teal-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Verification
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Document Verification</h2>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Required Documents</h3>
          <ul className="text-blue-800 space-y-2">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Valid Passport</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Visa (if required)</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Recent Photograph</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-400 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-2">Upload Passport Copy</p>
            <p className="text-sm text-gray-500">Drag and drop or click to select</p>
            <input type="file" className="hidden" accept="image/*,application/pdf" />
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-400 transition-colors cursor-pointer">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-2">Upload Recent Photograph</p>
            <p className="text-sm text-gray-500">Clear face photo for ID verification</p>
            <input type="file" className="hidden" accept="image/*" />
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">Privacy & Data Protection</h3>
          <div className="space-y-2 text-amber-800">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 form-checkbox h-5 w-5 text-teal-500 rounded" required />
              <span className="text-sm">I consent to the processing of my personal data for tourist safety purposes.</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 form-checkbox h-5 w-5 text-teal-500 rounded" required />
              <span className="text-sm">I understand that my location data will be used for safety monitoring during my visit.</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 form-checkbox h-5 w-5 text-teal-500 rounded" />
              <span className="text-sm">I agree to optional real-time tracking for enhanced safety (can be disabled anytime).</span>
            </label>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setStep(2)}
            className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
          <button
            onClick={generateDigitalID}
            className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-teal-600 hover:to-blue-600 transition-all duration-200"
          >
            Generate Digital ID
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Digital ID Generated Successfully!</h2>
        <p className="text-gray-600">Your secure blockchain-based tourist ID is ready</p>
      </div>

      {/* Digital ID Card */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-6 text-white mb-6 shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm opacity-90">DIGITAL TOURIST ID</p>
            <p className="text-2xl font-bold">{generatedID}</p>
          </div>
          <Shield className="h-8 w-8 opacity-90" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs opacity-75">Name</p>
            <p className="font-semibold">{touristData.name}</p>
          </div>
          <div>
            <p className="text-xs opacity-75">Nationality</p>
            <p className="font-semibold">{touristData.nationality}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs opacity-75">Valid Until</p>
            <p className="font-semibold">{new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <QrCode className="h-16 w-16 ml-auto opacity-90" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <h3 className="font-semibold text-green-900 mb-2">✅ Blockchain Verified</h3>
          <p className="text-sm text-green-800">Your digital ID has been securely recorded on the blockchain and is tamper-proof.</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">📱 Mobile App Ready</h3>
          <p className="text-sm text-blue-800">Download the Tourist Safety App and use your Digital ID for seamless access to all services.</p>
        </div>

        <div className="flex space-x-4">
          <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
            <Download className="h-5 w-5" />
            <span>Download ID</span>
          </button>
          <button 
            onClick={onBack}
            className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-teal-600 hover:to-blue-600 transition-all duration-200"
          >
            Continue to App
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button onClick={onBack} className="flex items-center space-x-2 text-teal-600 hover:text-teal-800">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-teal-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Digital Tourist ID Generator
              </h1>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Secure & Blockchain-Protected</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 px-4">
        {renderStepIndicator()}
        
        {isProcessing ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-lg max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Generating Your Digital ID</h3>
            <p className="text-gray-600 mb-2">Processing your information through blockchain verification...</p>
            <div className="text-sm text-gray-500">
              <p>🔒 Encrypting personal data</p>
              <p>⛓️ Creating blockchain record</p>
              <p>🛡️ Generating secure hash</p>
            </div>
          </div>
        ) : (
          <>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </>
        )}
      </main>
    </div>
  );
};

export default DigitalIDGenerator;