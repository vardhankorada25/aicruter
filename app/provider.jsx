"use client"
import React, { useEffect, useState, useContext } from 'react';
import { supabase } from '@/services/superbaseClient' 
import { UserDetailContext } from '@/context/userdetailcontext.jsx';

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createNewUser()
  }, [])

  const createNewUser = async () => {
    try {
      setLoading(true);

      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

      if (authError) {
        console.error('Auth error:', authError);
        setLoading(false);
        return;
      }

      if (!authUser) {
        console.log('No authenticated user');
        setLoading(false);
        return;
      }

      // Check if user exists in database
      const { data: users, error: fetchError } = await supabase
        .from('users')
        .select("*")
        .eq('email', authUser.email);

      if (fetchError) {
        console.error('Database fetch error:', fetchError);
        setLoading(false);
        return;
      }

      if (users?.length === 0) {
        // Create new user
        const { data, error: insertError } = await supabase
          .from('users')
          .insert([
            {
              email: authUser.email,
              name: authUser.user_metadata?.user_name || authUser.email.split('@')[0],
              picture: authUser.user_metadata?.picture || 'https://example.com/default-avatar.png',
            }
          ])
          .select();

        // --- Highlighted change: uncommented insertError check ---
        if (insertError) {
          console.error('Insert error:', insertError);
          setLoading(false);
          return;
        }

        // --- Highlighted change: check that data is not null and has length before accessing ---
        if (data && data.length > 0) {
          setUser(data[0]);
        } else {
          console.error('No user data returned after insert');
          setLoading(false);
          return;
        }
      } else {
        // User exists, use existing user
        setUser(users[0]);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserDetailContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserDetailContext.Provider>
  )
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  
  console.log('Context value:', context); // Debug log
  console.log('UserDetailContext:', UserDetailContext); // Debug log
  
  return context;
}
