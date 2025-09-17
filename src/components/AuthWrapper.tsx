import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import LoginForm from './LoginForm';
import { Shield, Loader2 } from 'lucide-react';

interface AuthWrapperProps {
  children: (user: User, userType: 'tourist' | 'authority') => React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'tourist' | 'authority' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        determineUserType(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await determineUserType(session.user.id);
        } else {
          setUserType(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const determineUserType = async (userId: string) => {
    try {
      // Check if user is a tourist
      const { data: touristData } = await supabase
        .from('tourist_profiles')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (touristData) {
        setUserType('tourist');
        setLoading(false);
        return;
      }

      // Check if user is an authority
      const { data: authorityData } = await supabase
        .from('authority_profiles')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (authorityData) {
        setUserType('authority');
        setLoading(false);
        return;
      }

      // New user - default to tourist for now
      setUserType('tourist');
      setLoading(false);
    } catch (error) {
      console.error('Error determining user type:', error);
      setUserType('tourist');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user || !userType) {
    return <LoginForm />;
  }

  return <>{children(user, userType)}</>;
};

export default AuthWrapper;