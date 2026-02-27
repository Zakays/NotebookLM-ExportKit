/*
 * Copyright (C) 2026 kristol07
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { useState, useEffect } from 'react';
import './App.css';
import { isSupabaseConfigured, supabase } from '../../utils/supabase';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { I18nProvider } from './i18n/i18n';

function App() {
  const [session, setSession] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!supabase) {
      return;
    }
    const supabaseClient = supabase;
    let isMounted = true;
    const loadSession = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (!isMounted) {
        return;
      }
      setSession(session);
      if (session) {
        const { data: { session: refreshed } } = await supabaseClient.auth.refreshSession();
        if (!isMounted) {
          return;
        }
        setSession(refreshed ?? session);
      }
    };
    loadSession();

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setShowLogin(false);
      return;
    }
    if (session) {
      setShowLogin(false);
    }
  }, [session]);

  return (
    <I18nProvider>
      {showLogin ? (
        <Login onClose={() => setShowLogin(false)} />
      ) : (
        <Dashboard session={session} onRequestLogin={() => setShowLogin(true)} />
      )}
    </I18nProvider>
  );
}

export default App;
