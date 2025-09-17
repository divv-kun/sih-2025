import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Shield, Users, MapPin, Mail, Lock, User, Phone, Globe } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup' | 'authority-login'>('login');
  const [userType, setUserType] = useState<'tourist' | 'authority'>('tourist');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    nationality: '',
    passportNumber: '',
    emergencyContact: '',
    department: '',
    badgeNumber: '',
    jurisdiction: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // User will be redirected automatically by AuthWrapper
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      if (data.user) {
        // Create profile based on user type
        if (userType === 'tourist') {
          await createTouristProfile(data.user.id);
        } else {
          await createAuthorityProfile(data.user.id);
        }
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createTouristProfile = async (userId: string) => {
    const { error } = await supabase
      .from('tourist_profiles')
      .insert({
        user_id: userId,
        name: formData.name,
        nationality: formData.nationality,
        passport_number: formData.passportNumber,
        emergency_contact: formData.emergencyContact,
        digital_id: `TST-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${formData.nationality.slice(0, 3).toUpperCase()}`,
        safety_score: 100,
        status: 'safe'
      });

    if (error) throw error;
  };

  const createAuthorityProfile = async (userId: string) => {
    const { error } = await supabase
      .from('authority_profiles')
      .insert({
        user_id: userId,
        name: formData.name,
        department: formData.department,
        badge_number: formData.badgeNumber,
        jurisdiction: formData.jurisdiction,
        role: 'operator'
      });

    if (error) throw error;
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-teal-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50"
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={handleSignup} className="space-y-6">
      {/* User Type Selection */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          type="button"
          onClick={() => setUserType('tourist')}
          className={`p-4 rounded-xl border-2 transition-all ${
            userType === 'tourist' 
              ? 'border-teal-500 bg-teal-50' 
              : 'border-gray-200 bg-white hover:border-teal-300'
          }`}
        >
          <MapPin className="h-8 w-8 mx-auto mb-2 text-teal-500" />
          <span className="font-medium">Tourist</span>
        </button>
        <button
          type="button"
          onClick={() => setUserType('authority')}
          className={`p-4 rounded-xl border-2 transition-all ${
            userType === 'authority' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 bg-white hover:border-blue-300'
          }`}
        >
          <Shield className="h-8 w-8 mx-auto mb-2 text-blue-500" />
          <span className="font-medium">Authority</span>
        </button>
      </div>

      {/* Common Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Create a password"
            required
          />
        </div>
      </div>

      {/* Tourist-specific fields */}
      {userType === 'tourist' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nationality</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
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
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Passport Number</label>
              <input
                type="text"
                value={formData.passportNumber}
                onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter passport number"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter emergency contact number"
                required
              />
            </div>
          </div>
        </>
      )}

      {/* Authority-specific fields */}
      {userType === 'authority' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
              <select
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select department</option>
                <option value="Police">Police Department</option>
                <option value="Tourism">Tourism Board</option>
                <option value="Forest">Forest Department</option>
                <option value="Emergency">Emergency Services</option>
                <option value="Border">Border Security</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Badge Number</label>
              <input
                type="text"
                value={formData.badgeNumber}
                onChange={(e) => handleInputChange('badgeNumber', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter badge number"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Jurisdiction</label>
            <input
              type="text"
              value={formData.jurisdiction}
              onChange={(e) => handleInputChange('jurisdiction', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter jurisdiction area"
              required
            />
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-teal-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-teal-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Tourist Safety System
            </h1>
          </div>
          <p className="text-gray-600">
            {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        {/* Form */}
        {mode === 'login' ? renderLoginForm() : renderSignupForm()}

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-teal-600 hover:text-teal-800 font-medium"
          >
            {mode === 'login' 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;