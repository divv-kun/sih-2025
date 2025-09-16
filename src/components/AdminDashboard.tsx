import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Users, MapPin, AlertTriangle, TrendingUp, 
  Clock, Shield, FileText, Search, Filter, Download
} from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

interface Tourist {
  id: string;
  name: string;
  nationality: string;
  safetyScore: number;
  status: 'safe' | 'warning' | 'emergency';
  location: string;
  lastSeen: string;
  digitalId: string;
}

interface Incident {
  id: string;
  type: 'missing' | 'emergency' | 'medical' | 'crime';
  tourist: string;
  location: string;
  timestamp: string;
  status: 'open' | 'investigating' | 'resolved';
  priority: 'high' | 'medium' | 'low';
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'tourists' | 'incidents' | 'analytics'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [tourists] = useState<Tourist[]>([
    {
      id: '1',
      name: 'John Smith',
      nationality: 'USA',
      safetyScore: 85,
      status: 'safe',
      location: 'Kaziranga National Park',
      lastSeen: '2 minutes ago',
      digitalId: 'TST-2025-001-USA'
    },
    {
      id: '2',
      name: 'Emma Johnson',
      nationality: 'UK',
      safetyScore: 45,
      status: 'warning',
      location: 'Manas Wildlife Sanctuary',
      lastSeen: '15 minutes ago',
      digitalId: 'TST-2025-002-GBR'
    },
    {
      id: '3',
      name: 'Raj Patel',
      nationality: 'India',
      safetyScore: 92,
      status: 'safe',
      location: 'Majuli Island',
      lastSeen: '1 minute ago',
      digitalId: 'TST-2025-003-IND'
    },
    {
      id: '4',
      name: 'Maria Garcia',
      nationality: 'Spain',
      safetyScore: 25,
      status: 'emergency',
      location: 'Dima Hasao Hills',
      lastSeen: '2 hours ago',
      digitalId: 'TST-2025-004-ESP'
    }
  ]);

  const [incidents] = useState<Incident[]>([
    {
      id: '1',
      type: 'emergency',
      tourist: 'Maria Garcia',
      location: 'Dima Hasao Hills',
      timestamp: '2025-01-22 14:30',
      status: 'investigating',
      priority: 'high'
    },
    {
      id: '2',
      type: 'missing',
      tourist: 'David Chen',
      location: 'Namdapha National Park',
      timestamp: '2025-01-22 12:15',
      status: 'open',
      priority: 'high'
    },
    {
      id: '3',
      type: 'medical',
      tourist: 'Sarah Williams',
      location: 'Cherrapunji',
      timestamp: '2025-01-22 09:45',
      status: 'resolved',
      priority: 'medium'
    }
  ]);

  const stats = {
    totalTourists: 2847,
    activeTourists: 2156,
    emergencyAlerts: 3,
    resolvedIncidents: 42,
    averageSafetyScore: 78
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tourists</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalTourists.toLocaleString()}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Now</p>
              <p className="text-3xl font-bold text-green-600">{stats.activeTourists.toLocaleString()}</p>
            </div>
            <MapPin className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Emergency Alerts</p>
              <p className="text-3xl font-bold text-red-600">{stats.emergencyAlerts}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-teal-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved Today</p>
              <p className="text-3xl font-bold text-teal-600">{stats.resolvedIncidents}</p>
            </div>
            <Shield className="h-8 w-8 text-teal-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Safety Score</p>
              <p className="text-3xl font-bold text-purple-600">{stats.averageSafetyScore}/100</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Real-time Map Placeholder */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Tourist Heat Map - Live Locations</h3>
        <div className="bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl h-96 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-teal-500 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Interactive Tourist Location Map</p>
            <p className="text-gray-500 text-sm">Real-time tracking of 2,156 active tourists</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {incidents.slice(0, 3).map((incident) => (
              <div key={incident.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                <div className={`w-3 h-3 rounded-full ${
                  incident.priority === 'high' ? 'bg-red-500' : 
                  incident.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{incident.tourist}</p>
                  <p className="text-sm text-gray-600">{incident.type} - {incident.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  incident.status === 'open' ? 'bg-red-100 text-red-800' :
                  incident.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {incident.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">High-Risk Zones</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
              <div>
                <p className="font-semibold text-red-900">Dima Hasao Hills</p>
                <p className="text-sm text-red-600">23 tourists in area</p>
              </div>
              <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">HIGH RISK</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
              <div>
                <p className="font-semibold text-yellow-900">Namdapha Border Area</p>
                <p className="text-sm text-yellow-600">8 tourists in area</p>
              </div>
              <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold">MEDIUM RISK</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
              <div>
                <p className="font-semibold text-orange-900">Remote Trekking Routes</p>
                <p className="text-sm text-orange-600">156 tourists in area</p>
              </div>
              <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-semibold">CAUTION</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTourists = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tourists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Status</option>
            <option value="safe">Safe</option>
            <option value="warning">Warning</option>
            <option value="emergency">Emergency</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Tourist List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tourist</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Digital ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Safety Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Seen</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tourists.map((tourist) => (
                <tr key={tourist.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{tourist.name}</p>
                      <p className="text-sm text-gray-600">{tourist.nationality}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">{tourist.digitalId}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`text-lg font-bold ${
                        tourist.safetyScore >= 80 ? 'text-green-600' : 
                        tourist.safetyScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {tourist.safetyScore}
                      </div>
                      <span className="text-gray-400 ml-1">/100</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                      tourist.status === 'safe' ? 'bg-green-100 text-green-800' :
                      tourist.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tourist.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{tourist.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{tourist.lastSeen}</td>
                  <td className="px-6 py-4">
                    <button className="text-teal-600 hover:text-teal-900 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button onClick={onBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-2xl font-bold text-gray-900">Tourism Authority Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Live Monitoring</span>
              </div>
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">{new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'tourists', label: 'Tourist Management', icon: Users },
              { id: 'incidents', label: 'Incident Reports', icon: AlertTriangle },
              { id: 'analytics', label: 'Analytics', icon: FileText }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCurrentView(id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  currentView === id 
                    ? 'border-teal-500 text-teal-600' 
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'tourists' && renderTourists()}
        {currentView === 'incidents' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Incident Management</h3>
            <p className="text-gray-600">Comprehensive incident tracking and response system.</p>
          </div>
        )}
        {currentView === 'analytics' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Analytics</h3>
            <p className="text-gray-600">Detailed reports and predictive insights for tourist safety.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;