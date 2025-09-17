import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface TouristProfile {
  id: string;
  user_id: string;
  name: string;
  nationality: string;
  passport_number: string;
  digital_id: string;
  blockchain_hash?: string;
  emergency_contact: string;
  current_location?: {
    lat: number;
    lng: number;
    accuracy: number;
    timestamp: string;
  };
  safety_score: number;
  status: 'safe' | 'warning' | 'emergency';
  created_at: string;
  updated_at: string;
}

export interface AuthorityProfile {
  id: string;
  user_id: string;
  name: string;
  department: string;
  badge_number: string;
  jurisdiction: string;
  role: 'admin' | 'operator' | 'field_officer';
  created_at: string;
  updated_at: string;
}

export interface LocationUpdate {
  id: string;
  tourist_id: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
  zone_type: 'safe' | 'warning' | 'danger';
  safety_score: number;
}

export interface Incident {
  id: string;
  tourist_id: string;
  type: 'missing' | 'emergency' | 'medical' | 'crime';
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  status: 'open' | 'investigating' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  assigned_officer?: string;
  created_at: string;
  updated_at: string;
}